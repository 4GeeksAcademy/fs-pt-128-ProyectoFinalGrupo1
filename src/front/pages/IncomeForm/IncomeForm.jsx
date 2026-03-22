import { useEffect, useState } from "react"
import useGlobalReducer from "../../hooks/useGlobalReducer"
import { getIncome, getUser, updateIncome } from "../../APIServices/BACKENDservices"
import { useNavigate, useParams } from "react-router-dom"
import "./IncomeForm.css";
import { PatientCard } from "../../components/PacientCard/PacientCard";
import { VisitReasonCard } from "../../components/VisitReasonCard/VisitReassonCard";
import { calculateWaitingTime } from "../../utils/calculateWaitingTime";
import { SpinnerButton } from "../../components/Spinner/SpinnerButton";


export const IncomeForm = () => {

    const { store, dispatch } = useGlobalReducer()
    const { id } = useParams()
    const prioBtn = document.querySelectorAll(".selected_button")
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [incomeForm, setIncomeForm] = useState({
        id_nurse: "",
        nurse: "",
        valoration_triage: "",
        triage_priority: "",
    })


    console.log(store.income)
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
        const triageTime = calculateWaitingTime(store.income.created_at)
        console.log('triageTime:', triageTime)
        console.log(store.incomes.map(i => ({ id: i.id, state: i.state })))
        if (!incomeForm.valoration_triage) {
            setError("Describa la valoración del triaje")
            setLoading(false)
            return
        }
        setLoading(true)
        const response = await updateIncome(id, incomeForm, triageTime, navigate)
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
                dni: store.income.patient_dni,
                patient_name: store.income.patient_firstname,
                patient_lastname: store.income.patient_lastname,
                reason_consultation: store.income.visitreason,
                patient_gender: store.income.patient_gender,
                birth_date: store.income.patient_birthdate,
                allergies: store.income.patient_allergies,
                nurse: store.income.nurse
            })
        }
    }, [store.income])

    return (
        <div>
            <div className="border-bottom mt-2 d-flex align-items-center" style={{ height: '53px' }} >
                <h2 className="title w-100 text-start fs-6">Control de triaje</h2>
            </div>
            <div className="container-fluid mt-2">
                <h2 className="title w-100 text-start">Triaje</h2>
                <p className="mb-4">Formulario de triaje con reasignamiento de prioridad</p>

                {
                    error && (
                        <div className="alert alert-danger d-flex align-items-center justify-content-center fade-alert" role="alert">
                            {error} <i className="fa-solid fa-triangle-exclamation ms-4"></i>
                        </div>
                    )
                }
                <form onSubmit={handleSubmit} className="container mt-2">
                    <div className=" d-flex">
                        <PatientCard width={'w-50'}
                            patient_dni={incomeForm.dni}
                            patient_firstname={incomeForm.patient_name}
                            patient_lastname={incomeForm.patient_lastname}
                            patient_birthdate={incomeForm.birth_date}
                            patient_gender={incomeForm.patient_gender}
                            patient_allergies={incomeForm.allergies} />
                        <VisitReasonCard
                            visitreason={incomeForm.reason_consultation}
                            nurse={incomeForm.nurse}
                            width={'w-50'} />
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


                    <div className="border border-secondary rounded mt-2 mb-5 container consultation-container">
                        <h2 className="mt-1 mt-1 fs-5 fw-semibold">Valoración</h2>

                        <textarea
                            className="form-control rounded-1 mb-2 p-3 shadow bg-body-tertiary rounded"
                            name="valoration_triage"
                            value={incomeForm.valoration_triage}
                            onChange={handleChange}
                            id="razonDeConsulta"
                            rows="4"
                        ></textarea>
                    </div>
                    <div className="piorityContainer text-dark mb-3">
                        <div>
                            <button type="button" onClick={handlePrio} className="rounded-start-pill text-dark prio-5" name="5">No urgente</button>
                        </div>
                        <div>
                            <button type="button" onClick={handlePrio} className="rounded-0 text-dark prio-4" name="4">Poco urgente</button>
                        </div>
                        <div>
                            <button type="button" onClick={handlePrio} className="rounded-0 prio-3" name="3">Urgente</button>
                        </div>
                        <div>
                            <button type="button" onClick={handlePrio} className="prio-2 rounded-0 text-dark" name="2">Muy urgente</button>
                        </div>
                        <div>
                            <button type="button" onClick={handlePrio} className="rounded-end-pill text-dark prio-1" name="1">Emergencia</button>
                        </div>
                    </div>

                    <div className="d-flex justify-content-center">

                        <button
                            type="submit"
                            className="btn btn-dark mt-3 mb-3 triageButton" >
                            {loading ? (
                                <SpinnerButton text={'Guardando datos..'} />
                            ) : (
                                'Pasar a consulta'
                            )}
                        </button>
                    </div>
                </form >
            </div >
        </div>
    )
}