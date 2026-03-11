import { useEffect, useState } from "react"
import useGlobalReducer from "../../hooks/useGlobalReducer"
import { getPatient, getUser } from "../../APIServices/BACKENDservices"
import { useParams } from "react-router-dom"
import "./IncomeForm.css";


export const IncomeForm = () => {

    const { store, dispatch } = useGlobalReducer()
    const { dni, id } = useParams()
    const prioBtn = document.querySelectorAll(".selected_button")
    
    const [incomeForm, setIncomeForm] = useState({
        id_patient: dni,
        patient_name: "",
        patient_lastname: "",
        id_nurse: "",
        valoration_triage: "",
        triage_priority: "",
        priority: "",

    })






    const handleChange = (e) => {
        setIncomeForm({
            ...incomeForm,
            [e.target.name]: e.target.value
        })
    }

    const handlePrio = (e) =>{
        e.preventDefault()
        prioBtn.forEach(btn => { btn.classList.remove("selected_button") })
        e.target.classList.add("selected_button")
        setIncomeForm({
            ...incomeForm,
            priority : Number(e.target.name)
    })
    }


    console.log(incomeForm)
    console.log(store.patient.income.visitreason);
    




    useEffect(() => {
        getUser(dispatch)
        getPatient(dispatch, id)
    }, [])

    useEffect(() => {
        if (store.patient?.firstname) {
            setIncomeForm({
                ...incomeForm,
                patient_name: store.patient.firstname,
                patient_lastname: store.patient.lastname,
                reason_consultation: store.patient.visitreason
            })
        }
    }, [store.patient])

    return (
        <>
            <div className="container mt-5">
                <form>
                    <div className="d-flex flex-column flex-md-row gap-3 mb-3">
                        <div className="flex-fill">
                            <label htmlFor="patient" className="form-label">Paciente</label>
                            <input
                                type="text"
                                placeholder={`${incomeForm.patient_name} ${incomeForm.patient_lastname}`}
                                className="form-control rounded-pill"
                                id="patient"
                                
                            />
                        </div>

                        

                        <div className="flex-fill">
                            <label htmlFor="nurse" className="form-label">Enfermero</label>
                            <input
                                type="text"
                                placeholder={incomeForm.id_nurse}
                                className="form-control rounded-pill"
                                id="nurse"
                                disabled
                            />
                        </div>
                    </div>

                    <div className="mb-4 mt-4">
                        <label htmlFor="Consult" className="form-label">
                            Motivo de consulta
                        </label>
                        <textarea
                            className="form-control rounded-4 p-3"
                            value={IncomeForm.valoration_triage}
                            name="consult"
                            id="Consult"
                            rows="4"
                        >{IncomeForm.reason_consultation}</textarea>
                    </div>


                    <div className="mb-4">
                        <label htmlFor="valorationTriage" className="form-label">
                            Valoración de triaje
                        </label>
                        <textarea
                            className="form-control rounded-4 p-3"
                            value={IncomeForm.valoration_triage}
                            name="valoration_triage"
                            onChange={handleChange}
                            id="valorationTriage"
                            rows="5"
                        ></textarea>
                    </div>
                    <div className="piorityContainer text-dark mb-3">
                        <div>
                            <button onClick={handlePrio} className="rounded-start-pill text-dark prio-5" name="5">Baja</button>
                        </div>
                        <div>
                            <button onClick={handlePrio} className="rounded-0 text-dark prio-4" name="4">Media</button>
                        </div>
                        <div>
                            <button onClick={handlePrio} className="rounded-0 prio-3" name="3">Alta</button>
                        </div>
                        <div>
                            <button onClick={handlePrio} className="prio-2 rounded-0 text-dark" name="2">Urgente</button>
                        </div>
                        <div>
                            <button onClick={handlePrio} className="rounded-end-pill text-dark prio-1" name="1">Muy urgente</button>
                        </div>
                    </div>

                    <div className="priorityResponsive mb-3">
                        <select className="form-select" aria-label="Default select example">
                            <option defaultValue>Prioridad</option>
                            <option value="1">Baja 🟦</option>
                            <option value="2">Media 🟩</option>
                            <option value="3">Alta 🟨</option>
                            <option value="4">Urgente 🟧</option>
                            <option value="5">Muy Urgente 🟥</option>
                        </select>

                    </div>

                    <div>
                        <button type="submit" className="btn btn-primary px-4">
                            Actualizar triaje
                        </button>
                    </div>

                </form>
            </div>
        </>
    )
}