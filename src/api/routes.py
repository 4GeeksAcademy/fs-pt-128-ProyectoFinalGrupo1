"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, current_app
from sqlalchemy import select, func
from api.models import db, User, Income, Patient, Order
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import get_jwt_identity, jwt_required, create_access_token
import os
import json
from flask_mail import Message
import cloudinary.uploader

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

# region: /hello


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

# region: /users - GET


@api.route('/users', methods=['GET'])
def get_user():
    users = User.query.all()
    response = [user.serialize() for user in users]
    return jsonify(response), 200

# region: /patients - GET


@api.route('/patients', methods=['GET'])
def get_patients():
    patients = Patient.query.all()
    response = [patient.serialize() for patient in patients]
    return jsonify(response), 200

# region: /patient/id - GET


@api.route('/patient/<id>', methods=['GET'])
def get_patient(id):
    patient = Patient.query.get(id)
    if not patient:
        return jsonify({"error": "Patient not found"}), 404
    response = patient.serialize()
    return jsonify(response), 200

# region: /register/user - POST


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

    mail = current_app.extensions['mail']

    additional_claims = {"type": "email_validation"}
    validation_token = create_access_token(
        identity=str(new_user.id), additional_claims=additional_claims)

    url = f"{os.getenv('VITE_FRONTEND_URL')}/activate?token={validation_token}"
    msg = Message(
        subject="Confirma tu registro",
        sender=("Soporte Medicina", "soporte@medicina.com"),
        recipients=[new_user.email]
    )
    msg.html = f"""<!DOCTYPE html>
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
    mail.send(msg)

    return jsonify({'token': validation_token,
                    'msg': 'Email send successfully'}), 201

# region: /activate - PATCH


@api.route('/activate', methods=['PATCH'])
@jwt_required()
def activate():
    data = request.get_json()
    user_id = get_jwt_identity()
    user = db.session.execute(select(User).where(
        User.id == user_id)).scalar_one_or_none()
    if not user:
        return jsonify({'error': 'User not found'}), 404
    if user.is_active:
        return jsonify({'error': 'This count already activate'}), 409
    password = data.get("password")
    if not password:
        return jsonify({'error': 'Password is required'}), 400
    user.generate_hash(password)
    user.is_active = True
    db.session.commit()

    return jsonify({'msg': 'ok'}), 201

# region: /register - POST


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

# region: /delete/user_id - DELETE


@api.route('/delete/<int:user_id>', methods=['DELETE'])
def delete(user_id):
    user = User.query.get(user_id)

    if user is None:
        return jsonify({'error': 'User not found'}), 404
    db.session.delete(user)
    db.session.commit()
    return jsonify({'msg': 'User deleted successfully'}), 200

# region: /login - POST


@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    if not email or not password:
        return jsonify({'Error': 'Todos los campos son obligatorios'}), 400
    user = db.session.execute(select(User).where(
        User.email == email)).scalar_one_or_none()
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

# region: /admission - POST


@api.route('/admission', methods=['POST'])
def admission():
    adm_required = ["dni", "firstname", "lastname", "birthdate"]
    income_required = ["visitreason", "priority"]
    data = request.get_json()
    data_admission = data["admission"]
    data_income = data["income"]

    if not data:
        return jsonify({"error": "No se enviaron datos"}), 400
    missing = [req for req in adm_required if not data_admission.get(
        req) + req for req in income_required if not data_income.get(req)]
    if missing:
        return jsonify({'Error': f'Todos los campos son obligatorios, faltan {", ".join(missing)}'}), 400
    user = db.session.execute(select(Patient).where(
        Patient.dni == data["admission"]["dni"])).scalar_one_or_none()
    if not user:
        new_admission = Patient(
            dni=data_admission.get("dni"),
            firstname=data_admission.get("firstname"),
            lastname=data_admission.get("lastname"),
            birthdate=data_admission.get("birthdate"),
            allergies=data_admission.get("allergies")
        )
        db.session.add(new_admission)
    priority = data_income.get('priority')
    new_position = db.session.query(func.min(Income.position)).filter(
        Income.triage_priority > priority).scalar()

    if new_position is not None:
        db.session.query(Income).filter(Income.position >= new_position).update(
            {Income.position: Income.position + 1}
        )
    else:
        max_position = db.session.query(func.max(Income.position)).scalar()
        if max_position is None:
            new_position = 0
        else:
            new_position = max_position + 1
    patient_to_link = user if user else new_admission
    new_income = Income(
        patient=patient_to_link,
        visitreason=data_income.get("visitreason"),
        triage_priority=data_income.get("priority"),
        state="En espera de triaje",
        position=new_position)
    db.session.add(new_income)
    db.session.commit()

    return jsonify({'msg': 'La admision ha sido registrada correctamente'}), 200

# region: /incomes - GET


@api.route('/incomes', methods=['GET'])
def get_incomes():
    incomes = Income.query.order_by(Income.position.asc()).all()
    response = [income.serialize_patient_data() for income in incomes]
    return jsonify(response), 200


@api.route('/income/<int:id>')
def get_income(id):
    income = Income.query.get(id)
    if not income:
        return jsonify({"error": "Income not found"}), 404
    response = income.serialize_patient_data()
    return jsonify(response), 200

# region: /incomes-triage/income_id - PUT


@api.route('/incomes-triage/<int:income_id>', methods=['PUT'])
def put_incomes_triage(income_id):
    data = request.get_json()
    actual_income = Income.query.get(income_id)

    if not actual_income:
        return jsonify({'error': 'Income not found'}), 404

    valoration_triage = data.get('valoration_triage')
    new_triage_priority = data.get('triage_priority')

    required_fields = ['valoration_triage']

    missing = [
        field for field in required_fields
        if field not in data or data[field] in (None, "")
    ]
    if missing:
        return jsonify({"Error": f"Rellenar los siguientes campos: {missing}", }), 400

    actual_income.valoration_triage = valoration_triage
    actual_income.triage_priority = new_triage_priority if new_triage_priority else actual_income.triage_priority
    actual_income.state = "Esperando consulta"
    db.session.add(actual_income)
    db.session.commit()

    return jsonify({"Info": "admisión correcta",
                    "Ingreso": f"{actual_income.serialize()}"})

# region: /incomes-consult - PUT


@api.route('/incomes-consult/<int:income_id>', methods=['PUT'])
def put_incomes_consult(income_id):
    data = request.get_json()
    actual_income = Income.query.get(income_id)

    if not actual_income:
        return jsonify({'error': 'Income not found'}), 404

    diagnosis = data.get('diagnosis')

    if not diagnosis:
        return jsonify({'error': 'Diagnosis are required'}), 409

    actual_income.diagnosis = diagnosis
    actual_income.state = "Alta"

    db.session.add(actual_income)
    db.session.commit()

    return jsonify({'msg': 'Consult succesfully'}), 200

# region: /reorder_incomes - PATCH


@api.route('/reorder-incomes', methods=['PATCH'])
def reorder_income():
    data = request.get_json()

    ordered_ids = data.get("ordered_ids")

    if not ordered_ids:
        return jsonify({'error': 'Do not send new order'}), 409

    for index, id in enumerate(ordered_ids):
        income = db.session.get(Income, id)

        if income:
            income.position = index

    db.session.commit()
    return jsonify({'msg': 'Order updated successfully'}), 201

# region: Order-POST


@api.route('/orders', methods=['POST'])
def post_order():
    data = request.get_json()
    id_income = db.session.execute(
        select(Income).where(Income.id == data.get('id'))).scalar_one_or_none()
    if not id_income:
        return jsonify({'error': 'Income not found'}), 404
    for order in data.get('orders'):
        new_order = Order(
            id_income=data.get('id'),
            order_type=order,
            status='Solicitada'
        )

        db.session.add(new_order)
    db.session.commit()
    return jsonify({'msg': 'Register orders succesfully'}), 201

# region: Order-PATCH


@api.route('/orders/<int:order_id>', methods=['PATCH'])
def patch_order(order_id):
    data = request.get_json()
    id_order = db.session.execute(
        select(Order).where(Order.id == order_id)).scalar_one_or_none()
    if not id_order:
        return jsonify({'error': 'Income not found'}), 404
    id_order.status = data.get('status')
    db.session.commit()
    return jsonify({'msg': 'Register orders succesfully'}), 201

# region:  Panel-test -GET


@api.route('/order-panel', methods=['GET'])
def get_order_panel():
    incomes = Income.query.order_by(Income.position.asc()).all()
    response = []
    for income in incomes:
        for order in income.orders:
            response.append({
                "id": order.id,
                "income_id": income.id,
                "patient_dni": income.patient.dni,
                "patient_name": income.patient.firstname,
                "patient_last": income.patient.lastname,
                "urgency": income.triage_priority,
                "order_type": order.order_type,
                "status": order.status,
                "created_at": order.created_at,
                "results": order.results
            })
    return jsonify(response), 200

# region:Cloudinary


@api.route('/order/<int:order_id>/result', methods=['POST'])
def upload_result(order_id):
    data = request.files['file']
    if not data:
        return jsonify({'error': 'The file are required'}), 400
    upload = cloudinary.uploader.upload(data, resource_type='auto')
    source_url = upload.get('secure_url')
    order = Order.query.get(order_id)
    if order:
        order.results = source_url
        db.session.commit()
        return jsonify({'msg': 'File upload successfully'}), 201
    return ({'error': 'Test not found'}), 404


@api.route('/order/<int:order_id>/result', methods=['PATCH'])
def reload_result(order_id):
    data = request.files['file']
    if not data:
        return jsonify({'error': 'The file are required'}), 400
    upload = cloudinary.uploader.upload(data, resource_type='auto')
    source_url = upload.get('secure_url')
    order = Order.query.get(order_id)
    if order:
        order.results = source_url
        db.session.commit()
        return jsonify({'msg': 'File upload successfully'}), 201
    return ({'error': 'Test not found'}), 404
