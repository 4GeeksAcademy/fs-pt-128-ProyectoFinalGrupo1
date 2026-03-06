import React, { useState } from "react";
import "./Admission.css"
import { createAdmission } from "../../APIServices/BACKENDservices";
import { useNavigate } from "react-router-dom";

export const Admission = () => {
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const prioBtn = document.querySelectorAll(".selected_button")
    const navigate = useNavigate()
    const [showSuccess, setShowSuccess] = useState(false)
    const [admission, setAdmission] = useState({
        "dni": "",
        "birthdate": "",
        "firstname": "",
        "lastname": "",
        "allergies": [],
        "visitreason": "",
        "priority": ""
    })
    const [newAlergie, setNewAlergie] = useState("")

    // region:handleChange
    const handleChange = (e) => {
        if (e.target.name == "allergies") {
            setNewAlergie(e.target.value)
            return
        }
        setAdmission({
            ...admission,
            [e.target.name]: e.target.value
        })
    }
    // region:handleSubmit
    const handleSubmit = async (e) => {
        setError(null)
        console.log(admission);
        e.preventDefault()
        if (!admission.dni || !admission.firstname || !admission.lastname || !admission.birthdate || !admission.visitreason) {
            setError("Todos los campos son obligatorios")
            return
        }
        setLoading(true)
        const response = await createAdmission(admission, navigate)
        if (response.ok) {
            setLoading(false)
            setShowSuccess(true)
            setAdmission({
                "dni": "",
                "birthdate": "",
                "firstname": "",
                "lastname": "",
                "allergies": [],
                "visitreason": "",
                "priority": ""
            })
            setTimeout(() => {
                setShowSuccess(false)
            }, 3000);
        }
    }

    // region:handlePrio
    const handlePrio = (e) => {
        e.preventDefault()
        const currentPrio = e.target.name
        prioBtn.forEach(btn => { btn.classList.remove("selected_button") })
        e.target.classList.add("selected_button")
        setAdmission({
            ...admission,
            priority: Number(currentPrio.slice(4))
        });

    }

    // region:handleKeyDown
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (newAlergie.trim() === "") return;

            setAdmission({
                ...admission,
                allergies: [...admission.allergies, newAlergie.trim()]
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
                    {showSuccess && <div class="alert alert-success" role="alert">
                        Se ha guardado el paciente correctamente
                    </div>}
                    {error && <div className="alert alert-danger" role="alert">
                        {error}
                    </div>}
                    <div className="row">
                        <div className="mb-3 d-flex align-items-center col-5">
                            <label htmlFor="InputDNI" className="form-label mb-0">DNI</label>
                            <input name="dni" value={admission.dni} onChange={handleChange} maxLength={9} type="text" className="form-control rounded-pill ms-2" dni="InputDNI" />
                        </div>
                        <div className="mb-3 d-flex align-items-center col-7">
                            <label htmlFor="InputBirthday" className="form-label mb-0 text-nowrap">Fecha Nacimiento</label>
                            <input name="birthdate" value={admission.birthdate} onChange={handleChange} type="date" className="form-control rounded-pill ms-2" dni="InputBirthday" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="mb-3 d-flex align-items-center col-4">
                            <label htmlFor="InputName" className="form-label mb-0">Nombre</label>
                            <input name="firstname" value={admission.firstname} onChange={handleChange} type="text" className="form-control rounded-pill ms-2" dni="InputName" />
                        </div>
                        <div className="mb-3 d-flex align-items-center col-8">
                            <label htmlFor="InputLastName" className="form-label mb-0">Apellidos</label>
                            <input name="lastname" value={admission.lastname} onChange={handleChange} type="text" className="form-control rounded-pill ms-2" dni="InputLastName" />

                        </div>
                    </div>
                    <div className="mb-3 d-flex align-items-center col-12">
                        <label htmlFor="InputAlergies" className="form-label mb-0">Alergias</label>
                        <input name="allergies" value={newAlergie} onChange={handleChange} type="text" onKeyDown={handleKeyDown} className="form-control rounded-pill ms-2" dni="InputAlergies" />

                    </div>
                    <div className="d-flex flex-wrap gap-2 my-3">
                        {admission.allergies.map((alergie, index) => (
                            <span
                                key={index}
                                className="badge bg-white border border-1 border-primary text-dark d-flex align-items-center"
                            >
                                {alergie}
                                <button type="button" className="btn-close btn-close-dark ms-2" onClick={() => {
                                    const updatedAlergies = admission.allergies.filter(
                                        (_, i) => i !== index
                                    );
                                    setAdmission({
                                        ...admission,
                                        allergies: updatedAlergies,
                                    });
                                }} />
                            </span>
                        ))}
                    </div>
                    <div className="mb-3 d-flex flex-column align-items-start gap-2 col-12 ">
                        <label htmlFor="InputLastName" className="form-label mb-1">Motivo de la consulta</label>
                        <textarea name="visitreason" value={admission.visitreason} onChange={handleChange} type="text" rows={8} className="form-control rounded-4" dni="InputVisitReason" />
                    </div>
                    <div className="text-center  mt-4 col-12">
                        <button name="prio5" onClick={handlePrio} className="col-2 crit5 rounded-start-pill">No es urgente</button>
                        <button name="prio4" onClick={handlePrio} className="col-2 crit4">Poco urgente</button>
                        <button name="prio3" onClick={handlePrio} className="col-2 crit3">Urgente</button>
                        <button name="prio2" onClick={handlePrio} className="col-2 crit2">Muy Urgente</button>
                        <button name="prio1" onClick={handlePrio} className="col-2 crit1 rounded-end-pill">Emergencia</button>
                    </div>
                    <div className="text-center my-3">
                        {!loading ?
                            <button type="submit" className="btn btn-primary rounded-pill col-4 align-self-center mt-4">Registrar Paciente</button>
                            : (
                                <button className="btn btn-primary" type="button" disabled>
                                    <span role="status">Registrando paciente...</span>
                                    <span className="spinner-border spinner-border-sm ms-3" aria-hidden="true"></span>
                                </button>
                            )}
                    </div>
                </form>
            </div>
        </div>
    )
}