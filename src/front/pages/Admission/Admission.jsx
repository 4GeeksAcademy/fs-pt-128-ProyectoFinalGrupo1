import React, { Profiler, useState } from "react";
import "./Admission.css"
import { createAdmission, getPatient } from "../../APIServices/BACKENDservices";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import { postPreTriaje } from "../../APIServices/GroqAI";
import { alignPropType } from "react-bootstrap/esm/types";

export const Admission = () => {
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const prioBtn = document.querySelectorAll(".selected_button")
    const navigate = useNavigate()
    const [userExist, setUserExist] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const [ia, setIA] = useState('')
    const { dispatch } = useGlobalReducer()
    const [newAlergie, setNewAlergie] = useState("")
    const [admission, setAdmission] = useState({
        "dni": "",
        "birthdate": "",
        "firstname": "",
        "gender": "",
        "lastname": "",
        "allergies": []
    })
    const [income, setIncome] = useState({
        "visitreason": "",
        "priority": ""
    })

    // region:handleChange
    const handleChange = (e) => {
        if (e.target.name === "dni") {
            setUserExist(false)
        }
        if (e.target.name == "allergies") {
            setNewAlergie(e.target.value)
            return
        }
        if (Object.keys(admission).includes(e.target.name)) {
            setAdmission({
                ...admission,
                [e.target.name]: e.target.value
            })
        } else {
            setIncome({
                ...income,
                [e.target.name]: e.target.value
            })

        }
    }
    const hadlerAI = async () => {
        const response = await postPreTriaje(income.visitreason)
        const parsed = JSON.parse(response.ia_response)
        setIA(parsed)
    }
    // region:handleSubmit
    const handleSubmit = async (e) => {
        setError(null)
        console.log(admission);
        e.preventDefault()
        if (!admission.dni || !admission.firstname || !admission.lastname || !admission.birthdate || !income.visitreason || !income.priority || !admission.gender) {
            setError("Todos los campos son obligatorios")
            return
        }
        setLoading(true)
        setAdmission({ ...admission, "dni": admission["dni"].toUpperCase() })
        const admission_data = { admission, income }
        const response = await createAdmission(admission_data, navigate)
        if (response.ok) {
            setLoading(false)
            setUserExist(false)
            setShowSuccess(true)
            prioBtn.forEach(btn => { btn.classList.remove("selected_button") })
            setAdmission({
                "dni": "",
                "birthdate": "",
                "firstname": "",
                "lastname": "",
                "gender": "",
                "allergies": []
            })
            setIncome({
                "visitreason": "",
                "priority": ""
            })
            setTimeout(() => {
                setShowSuccess(false)
            }, 3000);
        }
    }
    console.log(admission)
    // region:handlePrio
    const handlePrio = (e) => {
        e.preventDefault()
        const currentPrio = e.target.name
        prioBtn.forEach(btn => { btn.classList.remove("selected_button") })
        e.target.classList.add("selected_button")
        setIncome({
            ...income,
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
    }

    // region: searchPatient
    const searchPatient = async () => {
        if (admission.dni.length === 9) {
            const patient = await getPatient(dispatch, admission.dni.toUpperCase());

            if (!patient.error) {
                setUserExist(true)
                const allergiesArray = patient.allergies.slice(1, -1).split(",").map(item => item.trim());
                setAdmission({
                    "dni": patient.dni,
                    "birthdate": patient.birthdate,
                    "firstname": patient.firstname,
                    "lastname": patient.lastname,
                    "gender": patient.gender,
                    "allergies": allergiesArray
                })
                return
            }
        }
        setUserExist(false)
        setAdmission({
            ...admission,
            "birthdate": "",
            "firstname": "",
            "lastname": "",
            "gender": '',
            "allergies": []
        })
        setIncome({
            "visitreason": "",
            "priority": ""
        })
        prioBtn.forEach(btn => { btn.classList.remove("selected_button") })

    };

    // region: RETURN
    return (
        <div>
            <div className="border-bottom mt-2 d-flex align-items-center" style={{ height: '53px' }} >
                <h2 className="title w-100 text-start fs-6">Formulario de admisión</h2>
            </div>
            <div className="container-fluid d-flex flex-column justify-content-center mt-2 w-100 ">
                <h2 className="title text-start">Admisión</h2>
                <p>Registro de paciente con pre-triage</p>
                <div className="d-flex justify-content-start align-items-start w-100 mb-4">

                    {/* <div className="align-items-center d-flex">
                        <h4>Nombre usuario</h4>
                        <i className=" ms-3 fs-4 fa-solid fa-user-nurse bg-info rounded-circle p-3" />
                    </div> */}
                </div>
                <div>

                    <form onSubmit={handleSubmit}>

                        <div className="border border-secondary rounded mt-2 container w-100 consultation-container p-2">
                            {showSuccess && <div className="alert alert-success" role="alert">
                                Se ha guardado el {userExist ? "ingreso" : "paciente"} correctamente
                            </div>}
                            {error && <div className="alert alert-danger" role="alert">
                                {error}
                            </div>}
                            <div className="row">
                                <div className="mb-3 align-items-center col-2">
                                    <label htmlFor="InputDNI" className="form-label mb-0">DNI</label>
                                    <input name="dni" value={admission.dni} onChange={handleChange} maxLength={9} onBlur={searchPatient} type="text" className="form-control rounded-3 mt-2 shadow bg-body-tertiary border border-1" id="InputDNI" />
                                </div>
                                <div className="mb-3 align-items-center col-2">
                                    <label htmlFor="InputLastName" className="form-label mb-0">Genero</label>
                                    <select className="form-select rounded-3 mt-2 shadow bg-body-tertiary border border-1"
                                        aria-label="Default select example"
                                        name="gender"
                                        value={admission.gender}
                                        onChange={handleChange}>
                                        <option defaultValue>Seleccione género</option>
                                        <option value="Masculino">Masculino</option>
                                        <option value="Femenino">Femenino</option>
                                    </select>
                                </div>
                                <div className="mb-3 align-items-center col-2">
                                    <label htmlFor="InputBirthday" className="form-label mb-0 text-nowrap">Fecha Nacimiento</label>
                                    <input name="birthdate" disabled={userExist} value={admission.birthdate} onChange={handleChange} type="date" className="form-control rounded-3 mt-2 shadow bg-body-tertiary border border-1" id="InputBirthday" />
                                </div>
                                <div className="mb-3 align-items-center col-3">
                                    <label htmlFor="InputName" className="form-label mb-0">Nombre</label>
                                    <input name="firstname" disabled={userExist} value={admission.firstname} onChange={handleChange} type="text" className="form-control rounded-3 mt-2 shadow bg-body-tertiary border border-1" id="InputName" />
                                </div>
                                <div className="mb-3 align-items-center col-3">
                                    <label htmlFor="InputLastName" className="form-label mb-0">Apellidos</label>
                                    <input name="lastname" disabled={userExist} value={admission.lastname} onChange={handleChange} type="text" className="form-control rounded-3 mt-2 shadow bg-body-tertiary border border-1" id="InputLastName" />
                                </div>
                            </div>
                            <div className="mb-3 align-items-center col-12">
                                <label htmlFor="InputAlergies" className="form-label mb-0">Alergias <span className="fst-italic">(Escribe la alergia de una en una y pulsa enter para registrarla)</span></label>
                                <input name="allergies" disabled={userExist} value={newAlergie} onChange={handleChange} type="text" onKeyDown={handleKeyDown} className="form-control rounded-3 mt-2 shadow bg-body-tertiary border border-1" id="InputAlergies" />
                            </div>
                            <div className="d-flex flex-wrap gap-2 my-3">
                                {admission.allergies.map((alergie, index) => (
                                    <span
                                        key={index}
                                        className="badge bg-white border border-1 border-primary text-dark d-flex align-items-center"
                                    >
                                        {alergie}
                                        <button type="button" disabled={userExist} className="btn-close btn-close-dark" onClick={() => {
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
                        </div>
                        <div className="border border-secondary rounded mt-2 container w-100 consultation-container p-2">
                            <label htmlFor="InputLastName" className="form-label mb-1">Motivo de la consulta</label>
                            <textarea name="visitreason" value={income.visitreason} onChange={handleChange} type="text" rows={5} className="form-control rounded-1 mb-2 p-3 shadow bg-body-tertiary rounded border border-1" id="InputVisitReason" />
                            <div className="d-flex justify-content-center mt-2 mb-2">
                                <button type="button" onClick={hadlerAI} className="btn btn-dark title btn-iacustom" disabled={ia}>Pre tr<span>IA</span>je</button>
                            </div>
                            {ia && (
                                <div className="bg-white p-3 rounded shadow-sm">
                                    <h3 className="title fs-5">Valoracion pretriage recomendada por IA</h3>
                                    <p>Prioridad: {ia.prioridad_sugerida}</p>
                                    <p>Confianza: {ia.nivel_confianza}</p>
                                    <p>Justificación: {ia.justificacion}</p>
                                    <ul>
                                        {ia.factores_clave?.map((factor, index) => (
                                            <li key={index}>{factor}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                        </div>
                        <div className="text-center mt-4">
                            <button name="prio5" onClick={handlePrio} className="col-2 crit5 rounded-start-pill">No urgente</button>
                            <button name="prio4" onClick={handlePrio} className="col-2 crit4">Poco urgente</button>
                            <button name="prio3" onClick={handlePrio} className="col-2 crit3">Urgente</button>
                            <button name="prio2" onClick={handlePrio} className="col-2 crit2">Muy Urgente</button>
                            <button name="prio1" onClick={handlePrio} className="col-2 crit1 rounded-end-pill">Emergencia</button>
                        </div>
                        <div className="text-center my-3">
                            {!loading ?
                                <button type="submit" className="btn btn-dark col-2 align-self-center mt-4">{userExist ? "Registrar ingreso" : "Registrar Paciente"}</button>
                                : (
                                    <button className="btn btn-dark" type="button" disabled>
                                        <span role="status">Registrando solicitud...</span>
                                        <span className="spinner-border spinner-border-sm ms-3" aria-hidden="true"></span>
                                    </button>
                                )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}