import { useParams } from "react-router-dom";
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
    const [visibleOrderId, setVisibleOrderId] = useState(null);
    const [loading, setLoading] = useState(true);



    const Income = async () => {
        const data = await getIncomeAlta(id)
        setLoading(true)

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




    return (
        <>
            <div className="container mt-5">
                <h1 className="title w-100 mb-3 text-center">Historial</h1>
                <PatientCardW
                    patient_dni={store.patient.dni}
                    patient_firstname={store.patient.firstname}
                    patient_lastname={store.patient.lastname}
                    patient_birthdate={store.patient.birthdate}
                    patient_allergies={store.patient.allergies}
                ></PatientCardW>


                <h3 className="title w-100 mt-5 mb-3 text-center">Ingresos</h3>
                
                     
                {
                   (incomes.length > 0 ) ?
                (incomes.map(income => {
                    return (
                        <div key={income.id} className="container border border-secondary rounded mt-2 mb-5 containerIncome">
                            <div className="row mx-auto">
                                <div className="col-12 mt-2 mb-3 d-flex">
                                    <p className="p-0 m-0 me-2 label-custom fw-semibold">Fecha y hora de ingreso:</p>
                                    <p className="p-0 m-0"> {new Date(income.created_at).toLocaleString('es-ES')}</p>
                                </div>
                                <TriageCard valoration_triage={income.valoration_triage} nurse={income.nurse} />
                                <div className="container mt-3">
                                    <h2 className=" fs-5 fw-semibold">Pruebas:</h2>
                                    {
                                        income.orders.map(order => {
                                            return (
                                                <div key={order.id} className="border border-secondary rounded mb-2 container consultation-container">
                                                    <button className="btn btn-dark mb-2 mt-2"
                                                        onClick={() => setVisibleOrderId(visibleOrderId === order.id ? null : order.id)}
                                                    >
                                                        {visibleOrderId === order.id ? "Ocultar resultado" : "Ver resultado"}
                                                    </button>
                                                    {
                                                        visibleOrderId === order.id && (
                                                            order.results?.endsWith('.pdf')
                                                                ? <iframe src={order.results} className="w-100" style={{ height: '60vh', border: 'none' }} />
                                                                : <img src={order.results} alt="" className="w-100" />
                                                        )
                                                    }


                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className="container">
                                    <div className="border border-secondary rounded mt-2 mb-2 container w-100 consultation-container">
                                        <h2 className="mt-1 fs-5 fw-semibold">Diagnóstico dado por: {income.user} </h2>
                                        <p className="p-0 mb-1 label-custom">{income.diagnosis == null ? 'No ha recibido un diagnóstico' : income.diagnosis}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                    })) : (
                        <div className="border border-secondary rounded p-2 mt-2 mb-2 container w-100 consultation-container text-center">
                            {
                                loading ? (<SpinnerLoad></SpinnerLoad>):(<h3 className="p-3">Aún no ha recibido altas</h3>)
                            }
                            
                        </div>
                    )
                }
                




            </div>
        </>
    );
}
