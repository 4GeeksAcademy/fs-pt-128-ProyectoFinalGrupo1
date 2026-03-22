import { useState } from 'react'
import { OffCanvas } from '../OffCanvas/OffCanvas'
import useGlobalReducer from '../../hooks/useGlobalReducer'
import { getIncome, postOrders } from '../../APIServices/BACKENDservices'
import { SpinnerButton } from '../Spinner/SpinnerButton'
import { testsCatalog } from '../../utils/testsCatalog'


export const AnaliticOrder = ({ orders, id }) => {

    const { store, dispatch } = useGlobalReducer()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [confirm, setConfirm] = useState('')
    const [showInput, setShowInput] = useState(false)
    const [radValue, setRadValue] = useState('')

    const handlerChangeOrders = (e) => {
        if (e.target.name === 'Radiografía') {
            setShowInput(e.target.checked)
            if (!e.target.checked) {
                dispatch({ type: 'remove_order', payload: store.orders.find(o => o?.startsWith('Radiografía')) })
            }
            return
        }
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
                        {testsCatalog
                            .filter(t => t.category === "pruebas mas solicitadas")
                            .map(test =>
                                test.items
                                    .map(item => (
                                        <div className="d-flex justify-content-center align-items-center mx-2">
                                            <input type="checkbox"
                                                name={item}
                                                id={item}
                                                onChange={handlerChangeOrders}
                                                checked={Array.isArray(orders) && orders.some(o =>
                                                    item === 'Radiografía'
                                                        ? o.order_type?.startsWith('Radiografía')
                                                        : o.order_type === item
                                                ) || (item === 'Radiografía'
                                                    ? store.orders.some(o => o?.startsWith('Radiografía'))
                                                    : store.orders.includes(item))}
                                                disabled={Array.isArray(orders) && orders.some(o =>
                                                    item === 'Radiografía'
                                                        ? o.order_type?.startsWith('Radiografía')
                                                        : o.order_type === item
                                                )} />
                                            <label htmlFor={item} className="mx-1"> {item}</label>
                                            {item === 'Radiografía' && showInput &&
                                                <input type="text"
                                                    className='border shadow-sm'
                                                    placeholder="Especificar zona..."
                                                    onChange={(e) => {
                                                        setRadValue(e.target.value)
                                                        const existing = store.orders.find(o => o?.startsWith('Radiografía'))
                                                        if (existing) dispatch({ type: 'remove_order', payload: existing })
                                                        dispatch({ type: 'add_order', payload: `Radiografía - ${e.target.value}` })
                                                    }}
                                                    onClick={(e) => e.stopPropagation()}
                                                    disabled={Array.isArray(orders) && orders.some(o =>
                                                        item === 'Radiografía'
                                                            ? o.order_type?.startsWith('Radiografía')
                                                            : o.order_type === item
                                                    )} />}
                                        </div>

                                    ))

                            )
                        }
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