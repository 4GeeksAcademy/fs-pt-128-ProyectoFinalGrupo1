import { useState } from 'react'
import { OffCanvas } from '../OffCanvas/OffCanvas'
import useGlobalReducer from '../../hooks/useGlobalReducer'


export const AnaliticOrder = (orders) => {

    const { store, dispatch } = useGlobalReducer()

    const handlerChangeOrders = (e) => {
        if (!store.orders.includes(e.target.name)) {
            dispatch({ type: "add_order", payload: e.target.name })
        } else {
            dispatch({ type: "remove_order", payload: e.target.name })
        }
    }

    return (
        <div className="container">
            <div className="border border-secondary rounded mt-2 container w-100 consultation-container">
                <h2 className="mt-1 mt-1 fs-5 fw-semibold">Petición de pruebas</h2>
                <form>
                    <div className="d-flex align-items-center justify-content-center mb-1">
                        <div className="d-flex justify-content-center align-items-center mx-2">
                            <input type="checkbox" name="hemoglobina" id="hemoglobina" onChange={handlerChangeOrders} />
                            <label htmlFor="hemoglobina" className="mx-1">Analítica básica</label>
                        </div>
                        <div className="d-flex justify-content-center align-items-center mx-2">
                            <input type="checkbox" name="ecg" id="ecg" onChange={handlerChangeOrders} />
                            <label htmlFor="ecg" className="mx-1">Electrocardiograma</label>
                        </div>
                        <div className="d-flex  justify-content-center align-items-center mx-2">
                            <input type="checkbox" name="rx" id="radiografia" onChange={handlerChangeOrders} />
                            <label htmlFor="radigrafía" className="mx-1">Radiografía</label>
                        </div>
                        <div className="d-flex justify-content-center align-items-center mx-2">
                            <input type="checkbox" name="orina" id="orina" onChange={handlerChangeOrders} />
                            <label htmlFor="orina" className="mx-1">Analisís de orina</label>
                        </div>
                        <div className="d-flex justify-content-center align-items-center mx-2">
                            <input type="checkbox" name="constantes" id="constantes" onChange={handlerChangeOrders} />
                            <label htmlFor="constantes" className="mx-1">Re-evaluación de constantes</label>
                        </div>
                        <div className="d-flex justify-content-center align-items-center mx-2">
                            <OffCanvas orders={orders} handlerChangeOrders={handlerChangeOrders} />
                        </div>
                    </div>
                    <div className="d-flex justify-content-center mt-2">
                        <button className="btn btn-dark text-center mb-2">
                            Solicitar pruebas
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}