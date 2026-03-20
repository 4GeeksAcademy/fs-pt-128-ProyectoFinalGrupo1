import { useNavigate, useParams } from "react-router-dom"
import useGlobalReducer from "../hooks/useGlobalReducer"
import { useEffect } from "react"
import { getIncome, getOrder } from "../APIServices/BACKENDservices"

export const orderResult = () => {
    const navigate = useNavigate()
    const { income_id, id } = useParams()
    const { store, dispatch } = useGlobalReducer()



    useEffect(() => {
        getIncome(dispatch, income_id)
        getOrder(dispatch, id)
    })

    return (
        <div className="container">
            <PatientCardW width={'w-100'}
                patient_dni={store.income.patient_dni}
                patient_firstname={store.income.patient_firstname}
                patient_lastname={store.income.patient_lastname}
                patient_birthdate={store.income.patient_birthdate}
                patient_hgender={store.income.patient_gender}
                patient_allergies={store.income.patient_allergies} />
            <div className='border border-secondary rounded me-1 mt-2 container consultation-container w-100'>
                <h2 className="title fs-3 mt-3">Tipo de analitica realizada</h2>
                <p className="title fs-5">{store.order?.order_type}</p>
            </div>
            <div className='border border-secondary rounded me-1 mt-2 container consultation-container w-100'>
                <h2 className="title fs-4 mt-3">Observaciones anotadas durante la prueba:</h2>
                <div className="bg-white rounded shadow px-2">
                    <p className="title fs-5">{store.order.observations}</p>
                </div>

                <h2 className="title fs-4 mt-3">Incidencias transcurridas en la prueba</h2>
                <div className="bg-white rounded shadow px-2">
                    <p className="title fs-5">{store.order.incidents}</p>
                </div>
            </div>
            <div className="d-flex container justify-content-center mt-4">
                <a href={store.order.results} target="_blank" rel="noopener noreferrer" className="btn btn-dark me-2">Ver resultados</a>
                <button className="btn btn-secondary ms-2" onClick={() => navigate('/orders/task/next')}>Terminar</button>
            </div>
        </div >
    )
}