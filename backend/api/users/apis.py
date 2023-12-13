from flask import Blueprint, request, jsonify
from werkzeug.security import check_password_hash, generate_password_hash
from .models import UserSchema
from infrastructure.nosqldb import nosqldb
from bson import ObjectId
from marshmallow import ValidationError
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity


import bcrypt

users_bp = Blueprint('users', __name__)

import bcrypt

@users_bp.route('/users/me', methods=['GET'])
@jwt_required()
def get_current_user():
    user_id = get_jwt_identity()

    user = nosqldb.users.find_one({"_id": ObjectId(user_id)})
    if not user:
        return jsonify({"message": "User not found"}), 404

    user.pop('password', None)
    user['_id'] = str(user['_id'])

    return jsonify(user)

@users_bp.route("/users/register", methods=['POST'])
def register_user():
    try:
        data = request.get_json()
    except:
        return jsonify({"error": "Invalid JSON"}), 400

    user_schema = UserSchema()

    try:
        data = user_schema.load(data)
    except ValidationError as e:
        return jsonify({"error": str(e)}), 400

    existing_user = nosqldb.users.find_one({"email": data['email']})
    if existing_user:
        return jsonify({"message": "User with this email already exists"}), 400

    hashed_password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())

    data['password'] = hashed_password.decode('utf-8')

    result = nosqldb.users.insert_one(data)

    return jsonify({"message": "User registered successfully"}), 201


@users_bp.route("/users/update_password", methods=["PUT"])
def update_user_password():
    try:
        data = request.get_json()
    except:
        return jsonify({"error": "Invalid JSON"}), 400

    user_schema = UserSchema(only=("email", "password"))

    try:
        data = user_schema.load(data)
    except ValidationError as e:
        return jsonify({"error": str(e)}), 400

    user = nosqldb.users.find_one({"email": data['email']})

    if not user:
        return jsonify({"message": "User not found"}), 404

    hashed_password = generate_password_hash(data['password'], method='sha256')

    nosqldb.users.update_one({"_id": ObjectId(user['_id'])}, {"$set": {"password": hashed_password}})

    return jsonify({"message": "User password updated successfully"})

@users_bp.route('/users', methods=['GET'])
def get_users():
    try:
        # Use the nosqldb object to access the users collection and perform the find operation
        user_documents = nosqldb.users.find()
        users_list = []
        for user in user_documents:
            # Remove sensitive data before sending it to the client
            user.pop('password', None)
            # Convert ObjectId to string because ObjectId is not JSON serializable
            user['_id'] = str(user['_id'])
            users_list.append(user)
        return jsonify(users_list)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@users_bp.route("/users/login", methods=["POST"])
def login_user():
    try:
        data = request.get_json()
    except:
        return jsonify({"error": "Invalid JSON"}), 400

    user_schema = UserSchema(only=("email", "password"))

    try:
        data = user_schema.load(data)
    except ValidationError as e:
        return jsonify({"error": str(e)}), 400

    user = nosqldb.users.find_one({"email": data['email']})

    if not user or not bcrypt.checkpw(data['password'].encode('utf-8'), user['password'].encode('utf-8')):
        return jsonify({"message": "Invalid credentials"}), 401

    access_token = create_access_token(identity=str(user['_id']))

    return jsonify({"token": access_token, "message": "Logged in successfully"})