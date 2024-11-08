"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def signup():
    body = request.json
    email = body.get("email", None)
    password = body.get("password", None)

    if email == None:
        return jsonify({"msg": "Missing email"}), 401
    if password == None:
        return jsonify({"msg": "Missing password"}), 401
    
    user = User.query.filter_by(email=email).first()

    if user!= None:
        return jsonify({"msg" : "User has been already created!"}), 401
    
    new_user = User(email=email, password=password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"user": new_user.serialize(),
                    }),200