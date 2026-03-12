import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { addDiagnosis, getIncome } from "../../APIServices/BACKENDservices"
import useGlobalReducer from "../../hooks/useGlobalReducer"
import { calculateAge } from "../../utils/calculateAge"
import { Spinner } from "../../components/Spinner/Spinner"

export const Consultation = () => {
    const { store, dispatch } = useGlobalReducer()
    const { id } = useParams()
    const [consultation, setConsultation] = useState({
        "diagnosis": ""
    })
    const [isLoading, setIsLoading] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const loadData = async () => {
        setIsLoading(true)
        const response = await getIncome(dispatch, id)

        if (response) {
            return
        }
        setIsLoading(false)
    }

    const handlerChange = (e) => {
        e.preventDefault()

        setConsultation({
            ...consultation,
            [e.target.name]: e.target.defaultValue
        })
    }

    const handlerSubmit = async (e) => {
        e.preventDefault()
        if (!consultation.diagnosis) {
            setError("Es necesaria el diagnostico y su tratamiento")
            setLoading(false)
            return
        }
        setLoading(true)
        const response = await addDiagnosis(consultation)
        if (response.error) {
            setError(response.error)
            return
        }
        setError("")
        setLoading(false)
        return
    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <div>
            {isLoading ?
                (<div className="d-flex justify-content-center align-items-center flex-column" style={{ minHeight: "100vh" }}>
                    <h2>Cagando datos del paciente...</h2>
                    <Spinner />

                </div>)
                : (<div>
                    <div>
                        <Link to={'/consultation'}>
                            <i className="fa-solid fa-arrow-left"></i>
                            Volver atrás
                        </Link>
                    </div>
                    <h1 className="fs-2 text-center mt-3">Consulta</h1>
                    <div className="container mt-4">
                        <form onSubmit={handlerSubmit}>
                            <fieldset className="mb-2 mt-2">
                                <legend> Datos del paciente</legend>
                            </fieldset>
                            <div className="row">
                                <div className="col-12 col-md-2 mb-3">
                                    <label htmlFor="dni" className="form-label">DNI</label>
                                    <input type="text"
                                        defaultValue={store.income.patient_dni}
                                        className="form-control rounded-pill bg-light"
                                        id="dni"
                                        disabled />
                                </div>
                                <div className="col-12 col-md-4 mb-3" >
                                    <label htmlFor="nombre" className="form-label"> Nombre</label>
                                    <input type="text"
                                        defaultValue={store.income.patient_firstname}
                                        className="form-control rounded-pill bg-light"
                                        id="nombre"
                                        disabled />
                                </div>
                                <div className="col-12 col-md-4 mb-3" >
                                    <label htmlFor="apellidos" className="form-label">Apellidos</label>
                                    <input type="text"
                                        defaultValue={store.income.patient_lastname}
                                        className="form-control rounded-pill bg-light"
                                        id="apellidos"
                                        disabled />
                                </div>
                                <div className="col-12 col-md-2 mb-3" >
                                    <label htmlFor="edad" className="form-label">Edad</label>
                                    <input type="text" className="form-control rounded-pill bg-light" id="edad" defaultValue={store.income.patient_birthdate ? calculateAge(store.income?.patient_birthdate) : 'Calculando..'} />
                                </div>
                                <div className="col-12 mb-3" >
                                    <label htmlFor="edad" className="form-label">Alergias</label>
                                    <input type="text" className="form-control rounded-pill" id="alergias" defaultValue={store.income?.patient_allergies?.replace("{", "").replace("}", "")} />
                                </div>
                            </div>
                            <fieldset className="mb-2 mt-2">
                                <legend>Motivo consulta</legend>
                            </fieldset>
                            <div className="bg-light rounded-pill">
                                <p className="m-0 p-2 ">{store.income.visitreason}</p>
                            </div>
                            <fieldset className="mb-2 mt-2">
                                <legend className="fs-4">
                                    Valoracion de triaje realizada por: {store.income.nurse}
                                </legend>
                            </fieldset>
                            <div className="bg-light rounded-pill">
                                <p className="m-0 p-2 ">{store.income.valoration_triage == null ? 'No paso aun por triaje' : store.income.valoration_triage}</p>
                            </div>
                            <fieldset className="mb-2 mt-2">
                                <legend className="fs-4">Diagnostico y tratamiento</legend>
                            </fieldset>
                            <div className="mb-4">
                                <textarea
                                    className="form-control rounded-4 p-3"
                                    name="diagnosis"
                                    defaultValue={consultation.diagnosis}
                                    onChange={handlerChange}
                                    id="razonDeConsulta"
                                    rows="4"
                                ></textarea>
                            </div>
                            <div className="d-flex">
                                <button type="submit" className="btn btn-primary">
                                    {loading ? <Spinner /> : "Dar alta"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>)}
        </div>

    )
}