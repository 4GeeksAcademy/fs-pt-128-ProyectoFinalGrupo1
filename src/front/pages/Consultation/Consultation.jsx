import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getIncome } from "../../APIServices/BACKENDservices"
import useGlobalReducer from "../../hooks/useGlobalReducer"


export const Consultation = () => {
    const { store, dispatch } = useGlobalReducer()
    const { id } = useParams()
    const [consultation, setConsultation] = useState({
        "diagnosis": ""
    })
    const [isLoading, setIsLoading] = useState(false)

    const calculateAge = () => {
        const birthdate = store.income?.patient_birthdate;
        if (!birthdate) return "Cargando...";

        const [birthYear, birthMonth, birthDay] = birthdate.split("-").map(Number);
        const today = new Date();

        const actualYear = today.getFullYear();
        const actualMonth = today.getMonth() + 1;
        const actualDay = today.getDate();

        let age = actualYear - birthYear;
        if (actualMonth < birthMonth || (actualMonth === birthMonth && actualDay < birthDay)) {
            age--;
        }
        if (age === 0) {
            let months = actualMonth - birthMonth;
            if (actualDay < birthDay) months--;

            if (months < 0) months += 12;

            return `${months} meses`;
        }
        return `${age} años`;
    };
    const mountData = async () => {
        setIsLoading(true)
        const response = await getIncome(dispatch, id)

        if (response) {
            return response
        }
        setIsLoading(false)
    }

    const handlerChange = (e) => {
        e.preventDefault()

        setConsultation({
            ...consultation,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        mountData()
    }, [])

    return (
        <div>
            {isLoading ?
                (<div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>)
                : (<div>
                    <div>
                        <Link to={'/consultation'}>
                            <i class="fa-solid fa-arrow-left"></i>
                            Volver atrás
                        </Link>
                    </div>
                    <h1 className="fs-2 text-center mt-3">Consulta</h1>
                    <div className="container mt-4">
                        <form>
                            <fieldset className="mb-2 mt-2">
                                <legend> Datos del paciente</legend>
                            </fieldset>
                            <div className="row">
                                <div className="col-12 col-md-2 mb-3">
                                    <label htmlFor="dni" className="form-label">DNI</label>
                                    <input type="text"
                                        value={store.income.patient_dni}
                                        className="form-control rounded-pill bg-light"
                                        id="dni"
                                        disabled />
                                </div>
                                <div className="col-12 col-md-4 mb-3" >
                                    <label htmlFor="nombre" className="form-label"> Nombre</label>
                                    <input type="text"
                                        value={store.income.patient_firstname}
                                        className="form-control rounded-pill bg-light"
                                        id="nombre"
                                        disabled />
                                </div>
                                <div className="col-12 col-md-4 mb-3" >
                                    <label htmlFor="apellidos" className="form-label">Apellidos</label>
                                    <input type="text"
                                        value={store.income.patient_lastname}
                                        className="form-control rounded-pill bg-light"
                                        id="apellidos"
                                        disabled />
                                </div>
                                <div className="col-12 col-md-2 mb-3" >
                                    <label htmlFor="edad" className="form-label">Edad</label>
                                    <input type="text" className="form-control rounded-pill bg-light" id="edad" value={store.income.patient_birthdate ? calculateAge() : 'Calculando..'} />
                                </div>
                                <div className="col-12 mb-3" >
                                    <label htmlFor="edad" className="form-label">Alergias</label>
                                    <input type="text" className="form-control rounded-pill" id="edad" />
                                </div>
                            </div>
                            <fieldset className="mb-2 mt-2">
                                <legend>Motivo consulta</legend>
                            </fieldset>
                            <div className="bg-light rounded-pill">
                                <p className="m-0 p-2 ">{store.income.visitreason}</p>
                            </div>
                            <fieldset className="mb-2 mt-2">
                                <legend>
                                    Valoracion de triaje realizada por: Enfermero
                                </legend>
                            </fieldset>
                            <div className="bg-light rounded-pill">
                                <p className="m-0 p-2 ">{store.income.valoration_triage == null ? 'No paso aun por triaje' : store.income.valoration_triage}</p>
                            </div>
                            <fieldset className="mb-2 mt-2">
                                <legend>Diagnostico</legend>
                            </fieldset>
                            <div className="mb-4">
                                <label htmlFor="razonDeConsulta" className="form-label">Diagnostico y tratamiento </label>
                                <textarea
                                    className="form-control rounded-4 p-3"
                                    name="diagnosis"
                                    value={consultation.diagnosis}
                                    onChange={handlerChange}
                                    id="razonDeConsulta"
                                    rows="4"
                                ></textarea>
                            </div>
                        </form>
                    </div>
                </div>)}
        </div>

    )
}