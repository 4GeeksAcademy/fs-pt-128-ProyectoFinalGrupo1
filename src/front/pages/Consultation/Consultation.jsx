import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { addDiagnosis, getIncome } from "../../APIServices/BACKENDservices"
import useGlobalReducer from "../../hooks/useGlobalReducer"
import { SpinnerLoad } from "../../components/Spinner/SpinnerLoad"
import { SpinnerButton } from "../../components/Spinner/SpinnerButton"
import './Consultation.css'
import { PatientCard } from "../../components/PacientCard/PacientCard"
import { VisitReasonCard } from "../../components/VisitReasonCard/VisitReassonCard"
import { TriageCard } from "../../components/TriageCard/TriajeCard"
import { AnaliticOrder } from "../../components/AnaliticOrder/AnaliticOrder"

export const Consultation = () => {
    const { store, dispatch } = useGlobalReducer()
    const { id } = useParams()
    const navigate = useNavigate()
    const [consultation, setConsultation] = useState({
        "diagnosis": "",
        "treament": ""
    })
    const [updateOrders, setUpdateOrders] = useState(false)
    const reloadData = () => setUpdateOrders(!updateOrders);

    const [isLoading, setIsLoading] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const loadData = async () => {
        setIsLoading(true)
        const response = await getIncome(dispatch, id)

        if (response) {
            setIsLoading(false)
            return
        }
        setIsLoading(false)
    }

    const handlerChange = (e) => {
        setConsultation({
            ...consultation,
            [e.target.name]: e.target.value
        })
    }
    const handlerSubmit = async (e) => {
        e.preventDefault()
        if (!consultation.diagnosis || !consultation.treament) {
            setError("Es necesaria el diagnostico y su tratamiento")
            setLoading(false)
            setInterval(() => {
                setError('')
            }, 2500)
            return
        }
        setLoading(true)
        const response = await addDiagnosis(consultation, store.income.id)
        if (response.error) {
            setError(response.error)
            return
        }
        setError("")
        setLoading(false)
        navigate('/consultation')
        return
    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <div className="container-max-height">
            {isLoading ?
                (<div className="d-flex justify-content-center align-items-center flex-column" style={{ minHeight: "100vh" }}>
                    <h2>Cagando datos de los paciente...</h2>
                    <SpinnerLoad />
                </div>)
                : (<div>
                    <div>
                        <div className="border-bottom mt-2 d-flex align-items-center" style={{ height: '53px' }} >
                            <h2 className="title w-100 text-start fs-6">Panel de control triaje</h2>
                        </div>
                        <div className="d-flex flex-column container-fluid mt-2 ">
                            <h2 className="title w-100 text-start fs-3">Panel de control triaje</h2>
                            <p>Gestión del triaje</p>
                        </div>
                        <div className="d-flex flex-column container">
                            <div className="container d-flex">
                                <PatientCard width={'w-50'}
                                    patient_dni={store.income.patient_dni}
                                    patient_firstname={store.income.patient_firstname}
                                    patient_lastname={store.income.patient_lastname}
                                    patient_birthdate={store.income.patient_birthdate}
                                    patient_allergies={store.income.patient_allergies}
                                    patient_gender={store.income.patient_gender} />
                                <VisitReasonCard
                                    visitreason={store.income.visitreason}
                                    nurse={store.income.nurse}
                                    width={'w-50'} />
                            </div>
                            <TriageCard valoration_triage={store.income.valoration_triage} />
                            <AnaliticOrder id={store.income.id} orders={store.income.orders} />
                            <form className="container " onSubmit={handlerSubmit}>
                                <div className="border border-secondary rounded mt-2 position-relative container w-100 consultation-container">
                                    <h2 className="mt-1 mt-1 fs-5 fw-semibold">Diagnostico</h2>
                                    {error && <div className="alert alert-danger mx-2 mt-1 position-absolute top-0 start-0 end-0 " role="alert">
                                        {error}
                                    </div>}
                                    <textarea
                                        className="form-control rounded-1 mb-2 p-3 shadow bg-body-tertiary rounded"
                                        name="diagnosis"
                                        value={consultation.diagnosis}
                                        onChange={handlerChange}
                                        id="razonDeConsulta"
                                        rows="4"
                                    ></textarea>
                                </div>
                                <div className="border border-secondary rounded mt-2 container w-100 consultation-container">
                                    <h2 className="mt-1 mt-1 fs-5 fw-semibold">Tratamiento</h2>
                                    <textarea
                                        className="form-control rounded-1 mb-2 p-3 shadow bg-body-tertiary rounded"
                                        name="treament"
                                        value={consultation.treament}
                                        onChange={handlerChange}
                                        id="razonDeConsulta"
                                        rows="4"
                                    ></textarea>
                                </div>
                                <div className="d-flex justify-content-center mt-2">
                                    <button className="btn btn-dark text-center">{loading ?
                                        (<SpinnerButton />)
                                        : 'Dar alta al paciente'}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                )
            }
        </div >

    )
}