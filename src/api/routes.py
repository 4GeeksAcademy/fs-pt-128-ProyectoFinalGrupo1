"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from sqlalchemy import select
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
import os
import resend

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/register_user', methods=['POST'])
def register_user():
    data = request.get_json()

    if not data.get("email") or not data.get("role"):
        return jsonify({'error': 'All fields are required'}), 409

    user_exist = db.session.execute(
        select(User).where(data.get("email") == User.email))

    if user_exist:
        return jsonify({'error': 'Error processing registration. Please verify the information.'}), 409

    new_user = User(
        firstname=data.get("firstname"),
        lastname=data.get("lastname"),
        rol=data.get("rol"),
        email=data.get("email"),
    )
    db.session.add(new_user)
    db.session.commit()
