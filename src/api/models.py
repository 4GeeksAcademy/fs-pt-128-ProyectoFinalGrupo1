from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, ForeignKey, Text, Date, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship
from flask_bcrypt import generate_password_hash, check_password_hash
from datetime import date

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
    index: Mapped[int] = mapped_column(Integer, default=0, nullable=True)
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
        String(600), nullable=False, unique=False)
    triage_priority: Mapped[int] = mapped_column(nullable=True)
    diagnosis: Mapped[str] = mapped_column(Text, nullable=True, unique=False)
    state: Mapped[str] = mapped_column(
        String(120), nullable=False, unique=False)

    def serialize(self):
        return {
            "reason_consultation": self.reason_consultation,
            "triage_priority": self.triage_priority,
            "diagnosis": self.diagnosis,
            "state": self.state,
            "doctor": self.doctor.firstname if self.doctor else None,
            "nurse": self.nurse.firstname if self.nurse else None
        }

    def serialize_patient_data(self):
        return {
            "patient_dni": self.patient.dni,
            "patient_firstname": self.patient.firstname,
            "patient_lastname": self.patient.lastname,
            "patient_birthdate": self.patient.birthdate.isoformat(),
            "patient_allergies": self.patient.allergies,
            "visitreason":self.visitreason,
            "valoration_tiage": self.valoration_triage,
            "reason_consultation": self.reason_consultation,
            "triage_priority": self.triage_priority,
            "diagnosis": self.diagnosis,
            "state": self.state
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
            "birthdate": self.birthdate.isoformat(),
            "allergies": self.allergies,
            "income": [i.serialize() for i in self.income]
        }
