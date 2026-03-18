import { useParams } from "react-router-dom";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import { useEffect, useState } from "react";
import { getIncomeAlta, getPatient } from "../../APIServices/BACKENDservices";
import { PatientCardW } from "../../components/PatientCardW/PatientCardW";
import "./PatientHistoryDetail.css";
import { TriageCard } from "../../components/TriageCard/TriajeCard";


export const PatientsHistoryDetail = () => {

    const { id } = useParams()
    const { store, dispatch } = useGlobalReducer()
    const [incomes, setIncomes] = useState([])

    const Income = async () => {
        const data = await getIncomeAlta(id)

        if (data) {
            setIncomes(data)
        } else {
            return data
        }
        console.log(incomes);

    }

    useEffect(() => {
        getPatient(dispatch, id)
        Income()
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
                {incomes.map(income => {
                    return (
                        <div key={income.id} className="container border border-secondary rounded mt-2 mb-5 containerIncome">
                            <div className="row mx-auto">
                                <div className="col-12 col-md-2 mb-3">
                                    <p className="p-0 m-0 me-2 label-custom fw-semibold">Fecha y hora de ingreso:</p>
                                    <p className="p-0 m-0">{income.created_at}</p>
                                </div>
                                <TriageCard valoration_triage={income.valoration_triage} />
                                <div className="container mt-3">
                                    {
                                        income.orders.map(order => {
                                            return (
                                                <div  key={order.id} className="border border-secondary rounded mb-2 container w-100 consultation-container">
                                                    <h2 className=" fs-5 fw-semibold">Pruebas:</h2>
                                                    <p className="p-0 m-0">{order.order_type}</p>
                                                </div>

                                            )
                                        })
                                    }
                                </div>
                                <div className="container">
                                    <div className="border border-secondary rounded mt-2 mb-2 container w-100 consultation-container">
                                        <h2 className="mt-1 fs-5 fw-semibold">Diagnóstico dado por: {income.doctor} </h2>
                                        <p className="p-0 mb-1 label-custom">{income.diagnosis == null ? 'No ha recibido un diagnóstico' : income.diagnosis}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )

                })}


            </div>
        </>
    );
}