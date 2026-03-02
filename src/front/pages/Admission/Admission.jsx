import React, { useState } from "react";
import "./Admission.css"

export const Admission = () => {
    const [error, setError] = useState("")
    const [admission, setAdmission] = useState({
        "Id": "",
        "Birthday": "",
        "Name": "",
        "LastName": "",
        "Alergies": [],
        "VisitReason": ""
    })
    const [newAlergie, setNewAlergie] = useState("")

    const handleChange = (e) => {
        setAdmission({
            ...admission,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        setError(null)
        console.log(admission);
        e.preventDefault()
        if (!admission.Id || !admission.Name || !admission.LastName || !admission.Birthday || !admission.VisitReason) {
            setError("Todos los campos son obligatorios" + { error })
            return
        }
        alert("Aqui hay que colocar el navigate!!!");
    }
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (newAlergie.trim() === "") return;
            setAdmission({
                ...admission,
                Alergies: [...admission.Alergies, newAlergie.trim()]
            });
            setNewAlergie("");
        }
    };

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
                <form onSubmit={handleSubmit}>
                    {error && <div className="alert alert-danger" role="alert">
                        {error}
                    </div>}
                    <div className="row">
                        <div className="mb-3 d-flex align-items-center col-5">
                            <label htmlFor="InputDNI" className="form-label mb-0">DNI</label>
                            <input name="Id" value={admission.Id} onChange={handleChange} maxLength={9} type="text" className="form-control rounded-pill ms-2" id="InputDNI" />
                        </div>
                        <div className="mb-3 d-flex align-items-center col-7">
                            <label htmlFor="InputBirthday" className="form-label mb-0 text-nowrap">Fecha Nacimiento</label>
                            <input name="Birthday" value={admission.Birthday} onChange={handleChange} type="date" className="form-control rounded-pill ms-2" id="InputBirthday" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="mb-3 d-flex align-items-center col-4">
                            <label htmlFor="InputName" className="form-label mb-0">Nombre</label>
                            <input name="Name" value={admission.Name} onChange={handleChange} type="text" className="form-control rounded-pill ms-2" id="InputName" />
                        </div>
                        <div className="mb-3 d-flex align-items-center col-8">
                            <label htmlFor="InputLastName" className="form-label mb-0">Apellidos</label>
                            <input name="LastName" value={admission.LastName} onChange={handleChange} type="text" className="form-control rounded-pill ms-2" id="InputLastName" />
                        </div>
                    </div>
                    <div className="mb-3 d-flex align-items-center col-12">
                        <label htmlFor="InputAlergies" className="form-label mb-0">Alergias</label>
                        <input name="Alergies" value={newAlergie} onChange={setNewAlergie} type="text" onKeyDown={handleKeyDown} className="form-control rounded-pill ms-2" id="InputAlergies" />
                    </div>
                    <div className="mb-3 d-flex flex-column align-items-start gap-2 col-12 ">
                        <label htmlFor="InputLastName" className="form-label mb-1">Motivo de la consulta</label>
                        <textarea name="VisitReason" value={admission.VisitReason} onChange={handleChange} type="text" rows={8} className="form-control rounded-4" id="InputVisitReason" />
                    </div>
                    <div className="text-center my-3">
                        <button type="submit" className="btn btn-primary rounded-pill col-4 align-self-center mt-4">Registrar Paciente</button>
                    </div>
                </form>
            </div>
        </div>
    )
}