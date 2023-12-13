from flask import Flask, json, request, jsonify
import collections
from datetime import datetime
from bson import ObjectId
from flask_cors import CORS
from bson import json_util
from infrastructure.nosqldb import nosqldb
from werkzeug.exceptions import BadRequest, NotFound
from marshmallow import Schema, fields, validate
from api.tasks.apis import tasks_bp
from api.users.apis import users_bp
import os
from flask_jwt_extended import JWTManager
import requests
import json

app = Flask(__name__)
CORS(app, origins="*")
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
jwt = JWTManager(app)

app.register_blueprint(tasks_bp)
app.register_blueprint(users_bp)

@app.route('/place-details', methods=['GET'])
def get_place_details():
    place_id = request.args.get('placeId')
    response = requests.get(f'https://maps.googleapis.com/maps/api/place/details/json?placeid={place_id}&key={yourAPIKey}')
    data = json.loads(response.text)
    return data
    
if __name__ == '__main__':
    app.run(debug=True)
