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
    treatment: Mapped[str] = mapped_column(Text, nullable=True, unique=False)
    state: Mapped[str] = mapped_column(
        String(120), nullable=False, unique=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now())
    checkpoint_triage: Mapped[int] = mapped_column(
        Integer, nullable=True, unique=False)
    checkpoint_consult: Mapped[int] = mapped_column(
        Integer, nullable=True, unique=False)
    orders: Mapped[list["Order"]] = relationship(
        back_populates="income_order")

    def serialize(self):
        return {
            "visitreason": self.visitreason,
            "valoration_triage": self.valoration_triage,
            "triage_priority": self.triage_priority,
            "diagnosis": self.diagnosis,
            "treatment": self.treatment,
            "state": self.state,
            "position": self.position,
            "created_at": self.created_at,
            "checkpoint_triage": self.checkpoint_triage,
            "checkpoint_consult": self.checkpoint_triage,
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
            "patient_gender": self.patient.gender,
            "patient_allergies": self.patient.allergies,
            "visitreason": self.visitreason,
            "valoration_triage": self.valoration_triage,
            "triage_priority": self.triage_priority,
            "diagnosis": self.diagnosis,
            "treatment": self.treatment,
            "state": self.state,
            "position": self.position,
            "created_at": self.created_at,
            "checkpoint_triage": self.checkpoint_triage,
            "checkpoint_consult": self.checkpoint_consult,
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
    gender: Mapped[str] = mapped_column(
        String(20), nullable=False, unique=False)
    allergies: Mapped[list[str]] = mapped_column(String(600), nullable=False)
    income: Mapped[list["Income"]] = relationship(back_populates="patient")

    def serialize(self):
        return {
            "dni": self.dni,
            "firstname": self.firstname,
            "lastname": self.lastname,
            "birthdate": self.birthdate,
            "gender": self.gender,
            "allergies": self.allergies,
            "income": [i.serialize() for i in self.income]
        }


# region: Orders
class Order(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    order_type: Mapped[str] = mapped_column(
        String(60), nullable=True, unique=False)
    status: Mapped[str] = mapped_column(
        String(60), nullable=True, unique=False, default="Solicitado")
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now())
    finalize_test: Mapped[int] = mapped_column(
        Integer, nullable=True, unique=False)
    observations: Mapped[str] = mapped_column(
        Text, nullable=True, unique=False)
    incidents: Mapped[str] = mapped_column(
        Text, nullable=True, unique=False)
    results: Mapped[str] = mapped_column(String(600), nullable=True)
    id_income: Mapped[int] = mapped_column(
        Integer, ForeignKey("income.id"), nullable=True)
    income_order: Mapped["Income"] = relationship(
        back_populates="orders", foreign_keys=[id_income])

    def serialize(self):
        return {
            "id": self.id,
            "id_income": self.id_income,
            "order_type": self.order_type,
            "status": self.status,
            "created_at": self.created_at,
            "finalize_test": self.finalize_test,
            "observations": self.observations,
            "incidents": self.incidents,
            "results": self.results
        }
