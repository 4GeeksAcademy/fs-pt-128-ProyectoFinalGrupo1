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
    url = f"https://orange-eureka-x5vw9xv6p5rg2p5gx-3000.app.github.dev/activate/{validation_token}"

    params: resend.Emails.SendParams = {
        "from": "Soporte <onboarding@resend.dev>",
        "to": [new_user.email],
        "subject": "Confirma tu registro",
        "html": f"""<!DOCTYPE html>
                    <html lang="es">
                    <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Activación de Cuenta - Medicina</title>
                    </head>
                    <body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f4f4;">
                        <tr>
                        <td align="center">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                            <tr>
                                <td style="padding: 40px 30px; color: #000000; font-size: 16px; line-height: 1.6;">
                                <h1 style="margin-top: 0; color: #2b6cb0; font-size: 24px;">¡Bienvenido/a a Medicina!</h1>
                                <p style="margin-bottom: 25px;">Gracias por registrarte en nuestra plataforma médica. Para empezar a utilizar tu cuenta y acceder a todos nuestros servicios, necesitamos que confirmes tu dirección de correo electrónico.</p>
                                <p style="margin-bottom: 30px;">Por favor, haz clic en el botón de abajo para activar tu cuenta. Este enlace caducará en 24 horas.</p>
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                    <td align="center">
                                        <table border="0" cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td align="center" style="border-radius: 4px; background-color: #2b6cb0;">
                                            <a href={url} target="_blank" style="display: inline-block; padding: 15px 25px; font-size: 16px; font-weight: bold; color: #ffffff; text-decoration: none; border-radius: 4px; border: 1px solid #2b6cb0;">
                                                Activar Mi Cuenta
                                            </a>
                                            </td>
                                        </tr>
                                        </table>
                                    </td>
                                    </tr>
                                </table>
                                <p style="margin-top: 30px; margin-bottom: 0;">Si tienes alguna pregunta, no dudes en ponerte en contacto con nuestro equipo de soporte.</p>
                                <p style="margin-top: 10px; margin-bottom: 0;">Atentamente,<br>El equipo de Medicina</p>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 20px 30px; background-color: #f9f9f9; color: #888888; font-size: 12px; text-align: center;">
                                <p style="margin: 0 0 10px 0;">Este correo electrónico fue enviado a {new_user.email}. Si no te registraste en Medicina, puedes ignorar este mensaje.</p>
                                <p style="margin: 0;">© 2026 Medicina. Todos los derechos reservados.</p>
                                </td>
                            </tr>
                            </table>
                            </td>
                        </tr>
                    </table>
                    </body>
                    </html>"""
    }
    resend.Emails.send(params)

    return jsonify({'token': validation_token,
                    'msg': 'Email send successfully'}), 201


@api.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data.get("email") or not data.get("password"):
        return jsonify({"Error": "All fields are required"}), 409
    if User.query.count() >= 1:
        return jsonify({"Error": "Forbidden: Admin already exist"}), 403

    new_user = User(
        firstname="Admin",
        email=data.get("email"),
        rol="admin",
        is_active=True
    )

    new_user.generate_hash(data.get("password"))

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"user": new_user.serialize()})



@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    if not email or not password:
        return jsonify({'Error': 'Todos los campos son obligatorios'}), 400
    user = db.session.execute(select(User).where(User.email == email)).scalar_one_or_none()
    if user is None:
        return jsonify({'Error': 'Datos incorrectos'}), 400
    
    if user.check_hash(password):
        acces_token = create_access_token(identity=str(user.id))
        return jsonify({
            'Info': 'Inicio de sesión correcto',
            'token': acces_token
        }), 200
    else:
        return jsonify({'Error': 'Datos incorrectos'}), 400
