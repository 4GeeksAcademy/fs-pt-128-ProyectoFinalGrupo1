import { useEffect, useState } from "react"
import { getIncomeTest } from "../../APIServices/BACKENDservices"
import useGlobalReducer from "../../hooks/useGlobalReducer"
import { RowTest } from "../../components/RowTest/RowTest"
import { testsCatalog } from "../../utils/testsCatalog"

export const DashboardTest = () => {
    const { store, dispatch } = useGlobalReducer()
    const [typeSelect, setTypeSelect] = useState('')
    const [valueSelect, setValueSelect] = useState('')

    const handleTypeSelect = (e) => {
        setTypeSelect(e.target.value)
        setValueSelect("select")
    }
    const handleValueSelect = (e) => {
        setValueSelect(e.target.value)
    }

    useEffect(() => {
        getIncomeTest(dispatch)
    }, [])

    return (
        <div>
            <div className="border-bottom mt-2 d-flex align-items-center" style={{ height: '53px' }} >
                <h2 className="title w-100 text-start fs-6">Gestión de Pruebas</h2>
            </div>
            <div className="container-fluid mt-3 container-table border rounded" style={{ maxHeight: "80vh", overflowX: "hidden", overflowY: "auto", maxWidht: '100%' }} >
                <h2 className="title w-100 text-start fs-3">Gestión de Pruebas</h2>
                <p>Gestión de pruebas según prioridad y paciente</p>

                <div className="d-flex justify-content-center align-items-center">
                    <small className="mx-1">Filtar:</small>
                    <select class="form-select w-50" aria-label="Default select type" onChange={handleTypeSelect} value={typeSelect}>
                        <option value='select' selected>Selecciona una opción</option>
                        <option value="urgency">Prioridad</option>
                        <option value="order_type">Tipo de prueba</option>
                        <option value="status">Estado</option>
                    </select>
                    {(typeSelect === 'select' || typeSelect === '') && <select class="form-select w-25 mx-1" aria-label="Default select example" disabled>
                        <option selected>Selecciona una opcion</option>
                    </select>}
                    {
                        typeSelect === 'urgency' &&
                        <select class="form-select w-25 mx-1" aria-label="Default select example" onChange={handleValueSelect} value={valueSelect}>
                            <option value='select' selected>Selecciona una prioridad</option>
                            <option value="1">Critico</option>
                            <option value="2">Emergencia</option>
                            <option value="3">Urgente</option>
                            <option value="4">No urgente</option>
                            <option value="5">Control</option>
                        </select>
                    }
                    {
                        typeSelect === 'order_type' &&
                        <select class="form-select w-25 mx-1" aria-label="Default select example" onChange={handleValueSelect} value={valueSelect}>
                            <option value='select' selected>Selecciona una prueba</option>
                            {
                                testsCatalog.map(t => (
                                    t.items.map(item =>
                                        <>
                                            <option value={item}>{item}</option>
                                        </>
                                    )

                                ))
                            }
                        </select>
                    }
                    {
                        typeSelect === 'status' &&
                        <select class="form-select w-25 mx-1" aria-label="Default select example" onChange={handleValueSelect}>
                            <option value='select' selected>Selecciona un estado</option>
                            <option value="Solicitada">Solicitada</option>
                            <option value="2">En proceso</option>
                            <option value="3">Pendiente de envio</option>
                            <option value="4">Finalizada</option>
                        </select>
                    }


                </div>
                <table className="table table-md align-middle text-center fs-6 mt-2" >
                    <thead style={{ position: "sticky", top: "0", zIndex: "2" }}>
                        <tr >
                            <th scope="col" className="w-auto text-nowrap">Paciente</th>
                            <th scope="col" className="w-auto text-nowrap">Prueba</th>
                            <th scope="col">Estado</th>
                            <th scope="col" className="w-auto text-nowrap">Ver más</th>
                            <th scope="col" className="w-auto text-nowrap">Tiempo en espera</th>
                        </tr>
                    </thead>

                    <tbody className="list">
                        {
                            store.test
                                .filter(test => {
                                    if ((typeSelect == 'urgency' || typeSelect == 'order_type' || typeSelect == 'status') && valueSelect == 'select' || valueSelect == '') return true
                                    if (typeSelect == 'urgency') return test.urgency == valueSelect
                                    if (typeSelect == 'order_type') return test.order_type == valueSelect
                                    if (typeSelect == 'status') return test.status == valueSelect
                                    else return true
                                })
                                .map((test) =>
                                    <RowTest key={test.id} test={test} />
                                )

                        }
                    </tbody>

                </table>
            </div>

        </div>

    )
}