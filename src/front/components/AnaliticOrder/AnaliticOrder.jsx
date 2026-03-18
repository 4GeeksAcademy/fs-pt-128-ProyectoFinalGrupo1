import { useState } from 'react'
import { OffCanvas } from '../OffCanvas/OffCanvas'
import useGlobalReducer from '../../hooks/useGlobalReducer'
import { getIncome, postOrders } from '../../APIServices/BACKENDservices'
import { SpinnerButton } from '../Spinner/SpinnerButton'



export const AnaliticOrder = ({ orders, id }) => {

    const { store, dispatch } = useGlobalReducer()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [confirm, setConfirm] = useState('')

    const handlerChangeOrders = (e) => {
        if (!store.orders.includes(e.target.name)) {
            dispatch({ type: "add_order", payload: e.target.name })
        } else {
            dispatch({ type: "remove_order", payload: e.target.name })
        }
    }
    const handlerSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        if (!store.orders || store.orders?.length === 0) {
            setLoading(false)
            setError('Seleccione la/s pruebas/s a realizar')
            setInterval(() => {
                setError('')
            }, 1500)
            return
        }
        const response = await postOrders(store.income.id, store.orders)
        if (response.error) {
            setLoading(false)
            setError(response.error)
            return
        }
        await getIncome(dispatch, id)
        setConfirm('Pruebas solicitadas correctamente')
        setLoading(false)
        setInterval(() => {
            setConfirm('')
        }, 2000)
        return
    }
    return (
        <div className="container">
            <div className="border border-secondary rounded mt-2 container w-100 consultation-container position-relative">
                <h2 className="mt-1 mt-1 fs-5 fw-semibold">Petición de pruebas</h2>
                {confirm && <div className="alert alert-success mx-2 mt-1 position-absolute top-0 start-0 end-0" role="alert">
                    {confirm}
                </div>}
                {
                    error && (
                        <div className="alert alert-danger justify-content-around fade-alert mx-2 mt-1 position-absolute top-0 start-0 end-0" role="alert">
                            {error} <i className="fa-solid fa-triangle-exclamation"></i>
                        </div>
                    )
                }
                <form onSubmit={handlerSubmit} className=''>

                    <div className="d-flex align-items-center justify-content-center mb-1">
                        <div className="d-flex justify-content-center align-items-center mx-2">
                            <input type="checkbox"
                                name="Analítica básica"
                                id="hemoglobina"
                                onChange={handlerChangeOrders}
                                checked={Array.isArray(orders) && orders.some(o => o.order_type === "Analítica básica") || store.orders.includes("Analítica básica")}
                                disabled={Array.isArray(orders) && orders.some(o => o.order_type === "Analítica básica")} />
                            <label htmlFor="hemoglobina" className="mx-1">Analítica básica</label>
                        </div>
                        <div className="d-flex justify-content-center align-items-center mx-2">
                            <input type="checkbox" name="Electrocardiograma"
                                id="ecg"
                                onChange={handlerChangeOrders}
                                checked={Array.isArray(orders) && orders.some(o => o.order_type === "Electrocardiograma") || store.orders.includes("Electrocardiograma")}
                                disabled={Array.isArray(orders) && orders.some(o => o.order_type === "Electrocardiograma")} />
                            <label htmlFor="ecg" className="mx-1">Electrocardiograma</label>
                        </div>
                        <div className="d-flex  justify-content-center align-items-center mx-2">
                            <input type="checkbox"
                                name="Radiografía" id="rx"
                                onChange={handlerChangeOrders}
                                checked={Array.isArray(orders) && orders.some(o => o.order_type === "Radiografía") || store.orders.includes("Radiografía")}
                                disabled={Array.isArray(orders) && orders.some(o => o.order_type === "Radiografía")} />
                            <label htmlFor="radigrafía" className="mx-1">Radiografía</label>
                        </div>
                        <div className="d-flex justify-content-center align-items-center mx-2">
                            <input type="checkbox"
                                name="Analisís de orina"
                                id="orina"
                                onChange={handlerChangeOrders}
                                checked={Array.isArray(orders) && orders.some(o => o.order_type === "Analisís de orina") || store.orders.includes("Analisís de orina")}
                                disabled={Array.isArray(orders) && orders.some(o => o.order_type === "Analisís de orina")} />
                            <label htmlFor="orina" className="mx-1">Analisís de orina</label>
                        </div>
                        <div className="d-flex justify-content-center align-items-center mx-2">
                            <input type="checkbox"
                                name="Re-evaluación de constantes"
                                id="constantes"
                                onChange={handlerChangeOrders}
                                checked={Array.isArray(orders) && orders.some(o => o.order_type === "Re-evaluación de constantes") || store.orders.includes("Re-evaluación de constantes")}
                                disabled={Array.isArray(orders) && orders.some(o => o.order_type === "Re-evaluación de constantes")} />
                            <label htmlFor="constantes" className="mx-1">Re-evaluación de constantes</label>
                        </div>
                        <div className="d-flex justify-content-center align-items-center mx-2">
                            <OffCanvas orders={orders} handlerChangeOrders={handlerChangeOrders} />
                        </div>
                    </div>
                    <div className="d-flex justify-content-center mt-2">
                        <button className="btn btn-dark text-center mb-2">
                            {loading ? <SpinnerButton text={'Solicitando...'} /> : 'Solicitar pruebas'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}