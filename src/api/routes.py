"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from sqlalchemy import select
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import get_jwt, jwt_required, create_access_token
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


@api.route('/register/user', methods=['POST'])
def register_user():
    data = request.get_json()

    if not data.get("email") or not data.get("rol"):
        return jsonify({'error': 'All fields are required'}), 409

    user_exist = db.session.execute(
        select(User).where(data.get("email") == User.email)).scalar_one_or_none()

    if user_exist:
        return jsonify({'error': 'Error processing registration. Please verify the information.'}), 409

    new_user = User(
        firstname=data.get("firstname"),
        lastname=data.get("lastname"),
        rol=data.get("rol"),
        email=data.get("email"),
        is_active=False
    )
    db.session.add(new_user)
    db.session.commit()

    additional_claims = {"type": "email_validation"}
    validation_token = create_access_token(
        identity=str(new_user.id), additional_claims=additional_claims)
    resend.api_key = os.environ["RESEND_API_KEY"]

    params: resend.Emails.SendParams = {
        "from": "Acme <onboarding@resend.dev>",
        "to": [new_user.email],
        "subject": "hello world",
        "html": f"<strong>{validation_token}</strong>",
    }
    resend.Emails.send(params)

    return jsonify({'token': validation_token,
                    'msg': 'Email send successfully'}), 201
