import { useEffect, useState } from "react"
import useGlobalReducer from "../../hooks/useGlobalReducer"
import { getIncome, getUser, updateIncome } from "../../APIServices/BACKENDservices"
import { useNavigate, useParams } from "react-router-dom"
import "./IncomeForm.css";


export const IncomeForm = () => {

    const { store, dispatch } = useGlobalReducer()
    const { id } = useParams()
    const prioBtn = document.querySelectorAll(".selected_button")
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [incomeForm, setIncomeForm] = useState({
        patient_name: "",
        patient_lastname: "",
        id_nurse: "",
        valoration_triage: "",
        triage_priority: "",
        reason_consultation: ""

    })



    const handleChange = (e) => {
        setIncomeForm({
            ...incomeForm,
            [e.target.name]: e.target.value
        })
        setError("")
    }

    const handlePrio = (e) => {
        e.preventDefault()
        prioBtn.forEach(btn => { btn.classList.remove("selected_button") })
        e.target.classList.add("selected_button")
        setIncomeForm({
            ...incomeForm,
            triage_priority: Number(e.target.name)
        })
    }

    const handleSelect = (e) => {
        e.preventDefault()
        setIncomeForm({
            ...incomeForm,
            triage_priority: Number(e.target.value)
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!incomeForm.valoration_triage) {
            setError("Describa la valoración del triaje")
            setLoading(false)
            return
        }
        setLoading(true)
        const response = await updateIncome(id, incomeForm, navigate)
        setError(response.Error)
        setLoading(false)
    }


    //  console.log(incomeForm)
    // console.log(store.patient.income);





    useEffect(() => {
        getUser(dispatch)
        getIncome(dispatch, id);

    }, [])

    useEffect(() => {
        if (store.income) {
            setIncomeForm({
                ...incomeForm,
                patient_name: store.income.patient_firstname,
                patient_lastname: store.income.patient_lastname,
                reason_consultation: store.income.visitreason
            })
        }
    }, [store.income])

    return (
        <>
            <div className="container mt-5">
                <div className="container ">
                    <h1 className="title w-100 text-center mb-4">Triaje</h1>
                </div>
                {
                    error && (
                        <div className="alert alert-danger d-flex align-items-center justify-content-center fade-alert" role="alert">
                            {error} <i className="fa-solid fa-triangle-exclamation ms-4"></i>
                        </div>
                    )
                }
                <form onSubmit={handleSubmit}>
                    <div className="d-flex flex-column flex-md-row gap-3 mb-3 container border border-secondary rounded me-1 mt-2 consultation-container">
                        <div className="flex-fill">
                            <label htmlFor="patient" className="form-label">Nombre</label>
                            <input
                                type="text"
                                placeholder={incomeForm.patient_name}
                                className="form-control rounded mb-2 shadow bg-body-tertiary rounded"
                                id="patient"

                            />
                        </div>
                        <div className="flex-fill">
                            <label htmlFor="patient" className="form-label">Apellidos</label>
                            <input
                                type="text"
                                placeholder={incomeForm.patient_lastname}
                                className="form-control rounded mb-2 shadow bg-body-tertiary rounded"
                                id="patient"

                            />
                        </div>



                        <div className="flex-fill">
                            <label htmlFor="nurse" className="form-label">Enfermero</label>
                            <input
                                type="text"
                                placeholder={incomeForm.id_nurse}
                                className="form-control rounded mb-2 shadow bg-body-tertiary rounded"
                                id="nurse"
                                disabled
                            />
                        </div>
                    </div>

                    <div className="container border border-secondary rounded me-1 mt-2 consultation-container">
                        <label htmlFor="Consult" className="form-label">
                            <h2 className="mt-1 fs-5 fw-semibold">Motivo de consulta</h2>
                        </label>
                        <textarea
                            className="form-control mb-2 p-3 shadow bg-body-tertiary rounded"
                            name="consult"
                            id="Consult"
                            value={incomeForm.reason_consultation}
                            readOnly
                            rows="4"
                        ></textarea>
                    </div>

                    <div className="priorityResponsive mb-3">
                        <select className="form-select" onChange={handleSelect} aria-label="Default select example">
                            <option defaultValue>Prioridad</option>
                            <option value="5">No urgente 🟦</option>
                            <option value="4">Poco urgente 🟩</option>
                            <option value="3">Urgente 🟨</option>
                            <option value="2">Muy urgente 🟧</option>
                            <option value="1">Emergencia 🟥</option>
                        </select>

                    </div>

                    <div className="container border border-secondary rounded me-1 mb-3 mt-2 consultation-container">
                        <label htmlFor="valorationTriage" className="form-label">
                           <h2 className="mt-1 fs-5 fw-semibold">Valoración</h2>
                        </label>
                        <textarea
                            className="form-control mb-2 p-3 shadow bg-body-tertiary rounded"
                            value={incomeForm.valoration_triage}
                            name="valoration_triage"
                            onChange={handleChange}
                            id="valorationTriage"
                            rows="5"
                        ></textarea>
                    </div>
                    <div className="piorityContainer text-dark mb-3">
                        <div>
                            <button onClick={handlePrio} className="rounded-start-pill text-dark prio-5" name="5">No urgente</button>
                        </div>
                        <div>
                            <button onClick={handlePrio} className="rounded-0 text-dark prio-4" name="4">Poco urgente</button>
                        </div>
                        <div>
                            <button onClick={handlePrio} className="rounded-0 prio-3" name="3">Urgente</button>
                        </div>
                        <div>
                            <button onClick={handlePrio} className="prio-2 rounded-0 text-dark" name="2">Muy urgente</button>
                        </div>
                        <div>
                            <button onClick={handlePrio} className="rounded-end-pill text-dark prio-1" name="1">Emergencia</button>
                        </div>
                    </div>

                    <div className="d-flex justify-content-center">
                        {loading ? (
                            <button
                                type="submit"
                                className="btn btn-primary mt-2 mb-2 triageButton"
                                disabled
                            ><div className="spinner-border" role="status"></div>
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="btn btn-primary mt-3 mb-3 triageButton"

                            >Pasar a consulta
                            </button>
                        )}
                    </div>

                </form>
            </div>
        </>
    )
}