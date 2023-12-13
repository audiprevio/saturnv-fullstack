from flask import Blueprint, request, jsonify
from .models import TaskSchema
from infrastructure.nosqldb import nosqldb
from werkzeug.exceptions import BadRequest, NotFound
from bson import ObjectId, json_util
from datetime import datetime
from bson import ObjectId
from flask import json, request, jsonify, g
from pymongo.errors import PyMongoError
from bson import json_util
from infrastructure.nosqldb import nosqldb
from werkzeug.exceptions import BadRequest, NotFound
from werkzeug.datastructures import MultiDict
from marshmallow import ValidationError
from flask_jwt_extended import jwt_required, get_jwt_identity

tasks_bp = Blueprint('tasks', __name__)

@tasks_bp.route("/tasks/<task_id>", methods=["GET"])
@jwt_required()
def get_task(task_id):
    task = nosqldb.tasks.find_one({"_id": ObjectId(task_id)})
    if task is None:
        return jsonify({"message": "Task not found."}), 404
    task["_id"] = str(task["_id"])
    return jsonify(task)

@tasks_bp.route("/tasks/", methods=["POST"])
@jwt_required()
def create_task():
    try:
        data = request.get_json()
    except BadRequest:
        return jsonify({"error": "Invalid JSON"}), 400

    task_schema = TaskSchema()

    try:
        data = task_schema.load(data)
    except ValidationError as e:
        return jsonify({"error": str(e)}), 400
    
    data['createdAt'] = datetime.combine(data['createdAt'], datetime.min.time())
    data['deadline'] = datetime.combine(data['deadline'], datetime.min.time())

    # Check if the task is overdue
    if data['deadline'] < datetime.now():
        data['taskStatus'] = 'Overdue'

    try:
        result = nosqldb.tasks.insert_one(data)
    except PyMongoError as e:
        return jsonify({"error": str(e)}), 500

    new_task = nosqldb.tasks.find_one({"_id": result.inserted_id})

    new_task_json = json.loads(json_util.dumps(new_task))
    
    return jsonify(new_task_json), 201


@tasks_bp.route("/tasks/<task_id>", methods=["PUT"])
@jwt_required()
def update_task(task_id):
    try:
        data = request.get_json()
    except BadRequest:
        return jsonify({"error": "Invalid JSON"}), 400

    # Create a TaskSchema instance
    task_schema = TaskSchema(partial=True)

    # Validate the data
    try:
        data = task_schema.load(data)
    except ValidationError as e:
        return jsonify({"error": str(e)}), 400

    # Update the task in the database
    try:
        result = nosqldb.tasks.find_one_and_update(
            {"_id": ObjectId(task_id)},
            {"$set": data},
            return_document=True
        )
    except PyMongoError as e:
        return jsonify({"error": str(e)}), 500

    if result is None:
        raise NotFound('Task not found')

    # Convert the result to a proper JSON object
    result["_id"] = str(result["_id"])
    return jsonify(result)

    

@tasks_bp.route("/tasks/softdelete/<task_id>", methods=["PUT"])
@jwt_required()
def soft_delete_task(task_id):
    try:
        # Update the isDeleted field of the task in the database
        result = nosqldb.tasks.find_one_and_update(
            {"_id": ObjectId(task_id)},
            {"$set": {"isDeleted": True}},
            return_document=True
        )

        if result is None:
            return jsonify({"message": "Task not found."}), 404

        # Convert the result to a proper JSON object
        result["_id"] = str(result["_id"])
        return jsonify(result)

    except PyMongoError as e:
        return jsonify({"message": "An error occurred while soft-deleting the task."}), 500

@tasks_bp.route("/tasks/<task_id>/change_status", methods=["PUT"])
@jwt_required()
def change_task_status(task_id):
    try:
        data = request.get_json()
    except BadRequest:
        return jsonify({"error": "Invalid JSON"}), 400

    task_schema = TaskSchema(only=("taskStatus",), partial=True)

    # Validate the data
    try:
        data = task_schema.load(data)
    except ValidationError as e:
        return jsonify({"error": str(e)}), 400

    # Check if taskStatus is in data
    if 'taskStatus' not in data:
        return jsonify({"error": "Invalid task status"}),

    # Find the task in the database
    task = nosqldb.tasks.find_one({"_id": ObjectId(task_id)})
    if task is None:
        return jsonify({"message": "Task not found."}), 404

    # Check if the status is 'Done' and the current date is past the deadline
    if data['taskStatus'] == 'Done' and datetime.now() > task['deadline']:
        return jsonify({"message": "Cannot change status to Done as the current date is past the deadline."}), 400

    # Update the taskStatus field of the task in the database
    try:
        result = nosqldb.tasks.find_one_and_update(
            {"_id": ObjectId(task_id)},
            {"$set": {"taskStatus": data['taskStatus']}},
            return_document=True
        )
    except PyMongoError as e:
        return jsonify({"message": "An error occurred while changing the task status."}), 500

    # Convert the result to a proper JSON object
    result["_id"] = str(result["_id"])
    return jsonify(result)

@tasks_bp.route("/tasks/", methods=["GET"])
@jwt_required()
def get_all_tasks():
    try:
        # Assume get_jwt_identity() returns the ObjectId of the logged-in user
        user_id = get_jwt_identity()
        user = nosqldb.users.find_one({"_id": ObjectId(user_id)})

        # Store the user object in Flask's g object
        g.user = user

        if user and user.get('role') == 'staff':
            # If the user is a staff member, get tasks where their email is in the personInChargeEmail list
            tasks = list(nosqldb.tasks.find({"personInChargeEmail": {"$in": [user['email']]}}))
        else:
            # If the user is an admin, get all tasks
            tasks = list(nosqldb.tasks.find())

        for task in tasks:
            task["_id"] = str(task["_id"])

            # Check if the task is overdue
            if task['deadline'] < datetime.now():
                task['taskStatus'] = 'Overdue'
                # Update the task status in the database
                try:
                    nosqldb.tasks.find_one_and_update(
                        {"_id": ObjectId(task["_id"])},
                        {"$set": {"taskStatus": 'Overdue'}}
                    )
                except PyMongoError as e:
                    return jsonify({"error": str(e)}), 500

        return jsonify(tasks)
    except Exception as e:
        return jsonify({"message": str(e)}), 500
