from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, ForeignKey, Text, DateTime, Integer, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from flask_bcrypt import generate_password_hash, check_password_hash
from datetime import datetime

db = SQLAlchemy()

# region:User


class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    firstname: Mapped[str] = mapped_column(
        String(120), unique=False, nullable=True)
    lastname: Mapped[str] = mapped_column(
        String(120), unique=False, nullable=True)
    rol: Mapped[str] = mapped_column(String(55), unique=False, nullable=True)
    email: Mapped[str] = mapped_column(
        String(120), unique=True, nullable=False)
    income_doctor: Mapped[list["Income"]] = relationship(
        back_populates="doctor", foreign_keys="Income.id_doctor")
    income_nurse: Mapped[list["Income"]] = relationship(
        back_populates="nurse", foreign_keys="Income.id_nurse")
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False)
    password_hash: Mapped[str] = mapped_column(nullable=True)

    def generate_hash(self, password):
        self.password_hash = generate_password_hash(password).decode("utf-8")

    def check_hash(self, password):
        return check_password_hash(self.password_hash, password)

    def serialize(self):
        return {
            "id": self.id,
            "firstname": self.firstname,
            "lastname": self.lastname,
            "rol": self.rol,
            "is_active": self.is_active,
            "email": self.email,
        }

# region:Income


class Income(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    position: Mapped[int] = mapped_column(Integer, default=0, nullable=True)
    id_patient: Mapped[str] = mapped_column(
        ForeignKey("patient.dni"), nullable=True)
    patient: Mapped["Patient"] = relationship(back_populates="income")
    id_doctor: Mapped[int] = mapped_column(
        Integer, ForeignKey("user.id"), nullable=True)
    doctor: Mapped["User"] = relationship(
        back_populates="income_doctor", foreign_keys=[id_doctor])
    id_nurse: Mapped[int] = mapped_column(
        Integer, ForeignKey("user.id"), nullable=True)
    nurse: Mapped["User"] = relationship(
        back_populates="income_nurse", foreign_keys=[id_nurse])
    visitreason: Mapped[str] = mapped_column(String(600), nullable=False)
    valoration_triage: Mapped[str] = mapped_column(
        String(600), nullable=True, unique=False)
    triage_priority: Mapped[int] = mapped_column(nullable=True)
    diagnosis: Mapped[str] = mapped_column(Text, nullable=True, unique=False)
    state: Mapped[str] = mapped_column(
        String(120), nullable=False, unique=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now())
    id_order: Mapped[int] = mapped_column(
        Integer, ForeignKey("order.id"), nullable=True)
    orders: Mapped["Order"] = relationship(
        back_populates="income_order", foreign_keys=[id_order])

    def serialize(self):
        return {
            "visitreason": self.visitreason,
            "valoration_tiage": self.valoration_triage,
            "triage_priority": self.triage_priority,
            "diagnosis": self.diagnosis,
            "state": self.state,
            "position": self.position,
            "created_at": self.created_at,
            "doctor": self.doctor.firstname if self.doctor else None,
            "nurse": self.nurse.firstname if self.nurse else None
        }

    def serialize_patient_data(self):
        return {
            "id": self.id,
            "patient_dni": self.patient.dni,
            "patient_firstname": self.patient.firstname,
            "patient_lastname": self.patient.lastname,
            "patient_birthdate": self.patient.birthdate,
            "patient_allergies": self.patient.allergies,
            "visitreason": self.visitreason,
            "valoration_triage": self.valoration_triage,
            "triage_priority": self.triage_priority,
            "diagnosis": self.diagnosis,
            "state": self.state,
            "position": self.position,
            "created_at": self.created_at,
            "doctor": self.doctor.firstname if self.doctor else None,
            "nurse": self.nurse.firstname if self.nurse else None,
            "orders": [order.serialize() for order in self.orders] if self.orders else []
        }

# region:Patient


class Patient(db.Model):
    # ID del paciente para evitar que se repita
    dni: Mapped[str] = mapped_column(primary_key=True)
    firstname: Mapped[str] = mapped_column(
        String(120), nullable=False, unique=False)
    lastname: Mapped[str] = mapped_column(
        String(120), nullable=False, unique=False)
    birthdate: Mapped[str] = mapped_column(
        String(10), nullable=False, unique=False)
    allergies: Mapped[list[str]] = mapped_column(String(600), nullable=False)
    income: Mapped[list["Income"]] = relationship(back_populates="patient")

    def serialize(self):
        return {
            "dni": self.dni,
            "firstname": self.firstname,
            "lastname": self.lastname,
            "birthdate": self.birthdate,
            "allergies": self.allergies,
            "income": [i.serialize() for i in self.income]
        }


# region: Orders
class Order(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    order_type: Mapped[str] = mapped_column(
        String(60), nullable=False, unique=False)
    status: Mapped[str] = mapped_column(
        String(60), nullable=False, unique=False, default="Solicitado")
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now())
    results: Mapped[str] = mapped_column(String(600), nullable=False)
    income_order: Mapped[list["Income"]] = relationship(
        back_populates="orders")

    def serialize(self):
        return {
            "id": self.id,
            "order_type": self.order_type,
            "status": self.status,
            "created_at": self.created_at,
            "results": self.results
        }
