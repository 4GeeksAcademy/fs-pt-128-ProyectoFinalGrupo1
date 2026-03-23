import { useNavigate, useParams } from "react-router-dom"
import useGlobalReducer from "../hooks/useGlobalReducer"
import { useEffect } from "react"
import { getIncome, getIncomeTest } from "../APIServices/BACKENDservices"
import { PatientCardW } from "../components/PatientCardW/PatientCardW"

export const TestResult = () => {
    const navigate = useNavigate()
    const { id_income, id } = useParams()
    const { store, dispatch } = useGlobalReducer()



    useEffect(() => {
        getIncome(dispatch, id_income)
        getIncomeTest(dispatch)
    }, [])

    return (
        <div>

            <div className="border-bottom mt-2 d-flex align-items-center" style={{ height: '53px' }} >
                <h2 className="title w-100 text-start fs-6">Resultados de la prueba</h2>
            </div>
            <div className="container-fluid mt-3 container-table" style={{ maxHeight: "80vh", overflowX: "hidden", overflowY: "auto", maxWidht: '100%' }} >
                <h1 className="title w-100 text-start fs-3 mt-1 d-flex">Resultados de la prueba</h1>
                <p>Resultado de la prueba realizada al paciente</p>
            </div>
            <div className="container">
                <PatientCardW width={'w-100'}
                    patient_dni={store.income.patient_dni}
                    patient_firstname={store.income.patient_firstname}
                    patient_lastname={store.income.patient_lastname}
                    patient_birthdate={store.income.patient_birthdate}
                    patient_gender={store.income.patient_gender}
                    patient_allergies={store.income.patient_allergies} />
                {
                    store.test
                        .filter(test => { if (test.income_id === store.income.id) return true })
                        .map(order =>
                            <>

                                <div key={order.id}>

                                    <div className='border border-secondary rounded me-1 mt-2 container consultation-container w-100'>
                                        <h2 className="title fs-3 mt-3">Tipo de analitica realizada</h2>
                                        <p className="title fs-5">{order.order_type}</p>
                                    </div>
                                    <div className='border border-secondary rounded me-1 mt-2 container consultation-container w-100'>
                                        <h2 className="title fs-4 mt-3">Observaciones anotadas durante la prueba:</h2>
                                        <div className="bg-white rounded shadow px-2">
                                            <p className="title fs-5">{order.observations}</p>
                                        </div>

                                        <h2 className="title fs-4 mt-3">Incidencias transcurridas en la prueba:</h2>
                                        <div className="bg-white rounded shadow px-2">
                                            <p className="title fs-5">{order.incidents}</p>
                                        </div>
                                        <div className="d-flex container justify-content-center mt-2 mb-2">
                                            <a href={order.results} target="_blank" rel="noopener noreferrer" className="btn btn-dark">Ver resultados</a>
                                        </div>
                                    </div>

                                </div>
                            </>
                        )
                }

            </div>
        </div>
    )
}