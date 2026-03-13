import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { addDiagnosis, getIncome } from "../../APIServices/BACKENDservices"
import useGlobalReducer from "../../hooks/useGlobalReducer"
import { calculateAge } from "../../utils/calculateAge"
import { SpinnerLoad } from "../../components/Spinner/SpinnerLoad"
import { SpinnerButton } from "../../components/Spinner/SpinnerButton"
import { OffCanvas } from "../../components/OffCanvas/OffCanvas"
import './Consultation.css'

export const Consultation = () => {
    const { store, dispatch } = useGlobalReducer()
    const { id } = useParams()
    const navigate = useNavigate()
    const [consultation, setConsultation] = useState({
        "diagnosis": "",
        "tratamiento": ""
    })
    const [orders, setOrders] = useState([])
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

    const handlerChangeOrders = (e) => {
        if (!orders.includes(e.target.name)) {
            setOrders([
                ...orders,
                e.target.name
            ])
        } else {
            setOrders([
                orders.filter(order => order !== e.target.name)
            ])
        }

    }
    console.log(orders)
    const handlerSubmit = async (e) => {
        e.preventDefault()
        if (!consultation.diagnosis) {
            setError("Es necesaria el diagnostico y su tratamiento")
            setLoading(false)
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
                    <h2>Cagando datos del paciente...</h2>
                    <SpinnerLoad />
                </div>)
                : (<div>
                    <div>
                        <Link to={'/consultation'}>
                            <i className="fa-solid fa-arrow-left"></i>
                            Volver atrás
                        </Link>
                        <div className="d-flex flex-column container mt-2 ">
                            <div className="container ">
                                <h1 className="title w-100 text-center">Consulta</h1>
                            </div>

                            <div className="container d-flex">
                                <div className="border border-secondary rounded me-1 mt-2 container w-50 consultation-container ">
                                    <h2 className="mt-1 fs-5 fw-semibold">Datos del paciente</h2>
                                    <div className="row mx-auto">
                                        <div className="col-12 col-md-4 mb-3 d-flex">
                                            <p className="p-0 m-0 me-2 label-custom fw-semibold">D.N.I:</p>
                                            <p className="p-0 m-0 text-uppercase">{store.income.patient_dni}</p>
                                        </div>
                                        <div className="col-12 col-md-8 mb-3 d-flex">
                                            <p className="p-0 m-0 me-2 label-custom fw-semibold">Nombre y apellidos: </p>
                                            <p className="p-0 m-0">{store.income.patient_firstname} {store.income.patient_lastname}</p>
                                        </div>
                                        <div className="col-12 col-md-4 mb-3 d-flex">
                                            <p className="p-0 m-0 me-2 label-custom fw-semibold">Sexo:</p>
                                            <p className="p-0 m-0">Varón</p>
                                        </div>
                                        <div className="col-12 col-md-8 mb-3 d-flex">
                                            <p className="p-0 m-0 me-2 label-custom fw-semibold">Edad:</p>
                                            <p className="p-0 m-0">{store.income.patient_birthdate ? calculateAge(store.income?.patient_birthdate) : 'Calculando..'}</p>
                                        </div>
                                        {
                                            (store.income?.patient_allergies?.replace(/[{ }]/g, "").length > 0) ?
                                                <div className="col-12  mb-3 d-flex">
                                                    <p className='text-danger p-0 m-0 me-2 label-custom fw-semibold'>Alergias:</p>
                                                    <p className="p-0 m-0">{store.income?.patient_allergies?.replace(/[{ }]/g, "")}</p>
                                                </div>
                                                : ''
                                        }
                                    </div>
                                </div>
                                <div className="border border-secondary rounded ms-1 mt-2 container w-50 consultation-container ">
                                    <h2 className="mt-1 mt-1 fs-5 fw-semibold">Motivo de la consulta</h2>
                                    <p className="p-0">{store.income.visitreason}</p>
                                </div>
                            </div>
                            <div className="container">
                                <div className="border border-secondary rounded mt-2 container w-100 consultation-container">
                                    <h2 className="mt-1 mt-1 fs-5 fw-semibold">Valoración de triaje realizada por: {store.income.nurse}</h2>
                                    <p className="p-0 mb-1 label-custom">{store.income.valoration_triage == null ? 'No paso aun por triaje' : store.income.valoration_triage}</p>
                                </div>
                            </div>
                            <div className="container">
                                <div className="border border-secondary rounded mt-2 container w-100 consultation-container">
                                    <h2 className="mt-1 mt-1 fs-5 fw-semibold">Petición de pruebas</h2>
                                    <form>
                                        <div className="d-flex align-items-center justify-content-center mb-1">
                                            <div className="d-flex align-items-center mx-2">
                                                <input type="checkbox" name="hemoglobina" id="hemoglobina" onChange={handlerChangeOrders} />
                                                <label htmlFor="hemoglobina" className="mx-1">Analítica básica</label>
                                            </div>
                                            <div className="d-flex align-items-center mx-2">
                                                <input type="checkbox" name="ecg" id="ecg" onChange={handlerChangeOrders} />
                                                <label htmlFor="ecg" className="mx-1">Electrocardiograma</label>
                                            </div>
                                            <div className="d-flex align-items-center mx-2">
                                                <input type="checkbox" name="rx" id="radiografia" onChange={handlerChangeOrders} />
                                                <label htmlFor="radigrafía" className="mx-1">Radiografía</label>
                                            </div>
                                            <div className="d-flex align-items-center mx-2">
                                                <input type="checkbox" name="orina" id="orina" onChange={handlerChangeOrders} />
                                                <label htmlFor="orina" className="mx-1">Analisís de orina</label>
                                            </div>
                                            <div className="d-flex align-items-center mx-2">
                                                <input type="checkbox" name="constantes" id="constantes" onChange={handlerChangeOrders} />
                                                <label htmlFor="constantes" className="mx-1">Re-evaluación de constantes</label>
                                            </div>
                                            <div className="d-flex align-items-center text-end mx-2">
                                                <OffCanvas />
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-center mt-2">
                                            <button className="btn btn-dark text-center mb-2"
                                                disabled={loading}>
                                                {loading ?
                                                    (<SpinnerButton />)
                                                    : 'Solicitar pruebas'}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <form className="container">
                                <div className="border border-secondary rounded mt-2 container w-100 consultation-container">
                                    <h2 className="mt-1 mt-1 fs-5 fw-semibold">Diagnostico</h2>
                                    {error && <div className="alert alert-danger" role="alert">
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
                                    {error && <div className="alert alert-danger" role="alert">
                                        {error}
                                    </div>}
                                    <textarea
                                        className="form-control rounded-1 mb-2 p-3 shadow bg-body-tertiary rounded"
                                        name="diagnosis"
                                        value={consultation.tratamiento}
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