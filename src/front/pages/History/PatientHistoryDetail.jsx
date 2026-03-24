import { Link, useParams } from "react-router-dom";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import { useEffect, useState } from "react";
import "./PatientHistoryDetail.css";
import { getIncomeAlta, getIncomeTest, getPatient } from "../../APIServices/BACKENDservices";
import { PatientCardW } from "../../components/PatientCardW/PatientCardW";
import { TriageCard } from "../../components/TriageCard/TriajeCard";
import { SpinnerLoad } from "../../components/Spinner/SpinnerLoad";




export const PatientsHistoryDetail = () => {

    const { id } = useParams()
    const { store, dispatch } = useGlobalReducer()
    const [incomes, setIncomes] = useState([])
    const [loading, setLoading] = useState(true);

    const Income = async () => {
        const data = await getIncomeAlta(id)
        setLoading(true)
        console.log(data)
        if (data) {
            setIncomes(data)
            setLoading(false)
        } else {
            setLoading(false)
            return data
        }

    }


    useEffect(() => {
        getPatient(dispatch, id)
        Income()
        getIncomeTest(dispatch)
    }, [])

    console.log(incomes)

    return (
        <>
            <div className="border-bottom mt-2 d-flex align-items-center" style={{ height: '53px' }} >
                <h2 className="title w-100 text-start fs-6">Control de historial de ingreso</h2>
            </div>
            <div className="d-flex justify-content-between container-fluid mt-2 ">
                <div className="d-flex flex-flex">
                    <h2 className="title w-100 text-start fs-3">Historial</h2>
                    <p>Historiales de ingreso del paciente</p>
                </div>
                <div>
                    <Link to={'/patientsHistory'}>
                        <button className="btn btn-dark">
                            <i className="fa-solid fa-arrow-left me-2"></i> Volver
                        </button>
                    </Link>
                </div>
            </div>
            <div className="container mt-5">
                <PatientCardW
                    patient_dni={store.patient.dni}
                    patient_firstname={store.patient.firstname}
                    patient_lastname={store.patient.lastname}
                    patient_birthdate={store.patient.birthdate}
                    patient_allergies={store.patient.allergies}
                    patient_gender={store.patient.gender} />


                <h3 className="title w-100 mt-3 mb-3 text-center">Ingresos</h3>
                {
                    (incomes.length > 0) ?
                        (incomes.map(income => {
                            return (
                                <div key={income.id} className="container border border-secondary rounded mt-2 mb-5 containerIncome">
                                    <div className="row mx-auto">
                                        <div className="col-12 mt-2 mb-3 d-flex">
                                            <p className="p-0 m-0 me-2 label-custom fw-semibold title">Fecha y hora de ingreso:</p>
                                            <p className="p-0 m-0"> {new Date(income.created_at).toLocaleString('es-ES')}</p>
                                        </div>
                                        <div className="container">
                                            <div className="mt-2 container w-100 ">
                                                <h2 className="mt-1 mt-1 fs-5 fw-semibold">Valoración de triaje: </h2>
                                                <p className=" rounded mt-2 mb-2 d-flex container">{income.valoration_triage == null ? 'No paso aun por triaje' : income.valoration_triage}</p>
                                            </div>
                                        </div>
                                        <div className="container">
                                            <div className="mt-2 mb-2 container w-100 ">
                                                <h2 className=" mt-1 fs-5 fw-semibold title">Pruebas:</h2>
                                                <div className="mt-2 mb-2 d-flex container">
                                                    <p className="mb-0 me-2">Pruebas realizadas</p>
                                                    <Link to={`/test-result/${income.id}`} className='link-underline-dark text-dark fw-semibold'>Ver resultados</Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="container">
                                            <div className="mt-2 mb-2 d-flex flex-column container">
                                                <h2 className="mt-1 fs-5 fw-semibold">Diagnóstico:  </h2>
                                                <p className="mt-2 mb-2 d-flex container">{income.diagnosis == null ? 'No ha recibido un diagnóstico' : income.diagnosis}</p>
                                                <h2 className="mt-1 fs-5 fw-semibold">Tratamiento a seguir:  </h2>
                                                <p className="mt-2 mb-2 d-flex container">{income.treatment == null ? 'No ha recibido un diagnóstico' : income.treatment}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })) : (
                            <div className="border border-secondary rounded p-2 mt-2 mb-2 container w-100 consultation-container text-center">
                                {
                                    loading ? (<SpinnerLoad></SpinnerLoad>) : (<h3 className="p-3">Aún no ha recibido altas</h3>)
                                }

                            </div>
                        )
                }
            </div>
        </>
    );
}
