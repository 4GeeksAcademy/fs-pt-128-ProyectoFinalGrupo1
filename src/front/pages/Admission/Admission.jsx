import React from "react";
import "./Admission.css"

export const Admission = () => {
    return (
        <div className="container px-4">
            <div className="d-flex justify-content-between align-items-start m-4 mb-5">
                <h1>Admisión</h1>
                <div className="align-items-center d-flex">
                    <h4>Nombre usuario</h4>
                    <i className=" ms-3 fs-1 fa-solid fa-user-nurse bg-info rounded-circle p-3" />
                </div>
            </div>
            <div>
                <form>
                    <div className="row">
                        <div className="mb-3 d-flex align-items-center col-5">
                            <label for="InputDNI" className="form-label mb-0">DNI</label>
                            <input name="DNI" maxLength={9} type="text" className="form-control rounded-pill ms-2" id="InputDNI" />
                        </div>
                        <div className="mb-3 d-flex align-items-center col-7">
                            <label for="InputBirthday" className="form-label mb-0 text-nowrap">Fecha Nacimiento</label>
                            <input name="dateBirthday" type="date" className="form-control rounded-pill ms-2" id="InputBirthday" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="mb-3 d-flex align-items-center col-4">
                            <label for="InputName" className="form-label mb-0">Nombre</label>
                            <input name="Name" type="text" className="form-control rounded-pill ms-2" id="InputName" />
                        </div>
                        <div className="mb-3 d-flex align-items-center col-8">
                            <label for="InputLastName" className="form-label mb-0">Apellidos</label>
                            <input name="LastName" type="text" className="form-control rounded-pill ms-2" id="InputLastName" />
                        </div>
                    </div>
                    <div className="mb-3 d-flex align-items-center col-12">
                        <label for="InputAlergies" className="form-label mb-0">Alergias</label>
                        <input name="Alergies" type="text" className="form-control rounded-pill ms-2" id="InputAlergies" />
                    </div>
                    <div className="mb-3 d-flex flex-column align-items-start gap-2 col-12 ">
                        <label for="InputLastName" className="form-label mb-1">Motivo de la consulta</label>
                        <textarea name="LastName" type="text" className="form-control rounded-4" id="InputLastName" style={{ height: "200px" }} />
                    </div>
                    <div className="text-center my-3">
                        <button type="submit" className="btn btn-primary rounded-pill col-4 align-self-center mt-4">Registrar Paciente</button>
                    </div>
                </form>
            </div>
        </div>
    )
}