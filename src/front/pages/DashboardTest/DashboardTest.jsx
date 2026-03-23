import { useEffect, useState } from "react"
import { getIncomes, getIncomeTest } from "../../APIServices/BACKENDservices"
import useGlobalReducer from "../../hooks/useGlobalReducer"
import { RowTest } from "../../components/RowTest/RowTest"
import { testsCatalog } from "../../utils/testsCatalog"
import { useParams } from "react-router-dom"
import './DashboardTest.css'
import Select from "react-select"

export const DashboardTest = () => {
    const { store, dispatch } = useGlobalReducer()
    const { type, value } = useParams()
    const [typeSelect, setTypeSelect] = useState('')
    const [valueSelect, setValueSelect] = useState('')
    const decodedValue = decodeURIComponent(value)
    const options = testsCatalog.flatMap(test =>
        test.items.map(i => ({
            value: i,
            label: i
        }))
    )

    let dataLoad = [...store.test]
    const handlerSearch = (value) => {
        dispatch({ type: 'search', payload: value })
    }
    const filtered = dataLoad.filter(test => {
        const searchTerm = store.search.toLowerCase();
        return (
            test.patient_name?.toLowerCase().includes(searchTerm) ||
            test.patient_last?.toLowerCase().includes(searchTerm) ||
            test.patient_dni?.toLowerCase().includes(searchTerm)
        );
    });

   
    const f = filtered.filter(test => {

        if ((store.incomes?.find(i => i.id == test.income_id)?.state == 'Alta') && test.status == 'Finalizado') return false

        if (test.status === 'Finalizado' && valueSelect !== 'finalizado') {
            return false;
        }
        if (test.status === "Finalizado" && (typeSelect == 'status' && valueSelect == 'finalizado')) {
            return true;
        }
        if (test.status === "Solicitada" && (typeSelect == 'status' && valueSelect == 'solicitada')) {
            return true;
        }
        if (valueSelect === 'select' || valueSelect === '' || !valueSelect) {
            return true;
        }

        if (typeSelect === 'urgency' && valueSelect === 'control') {
            return test.urgency == 1 || test.urgency == 2;
        }
        if (typeSelect === 'urgency') return test.urgency == valueSelect;
        if (typeSelect === 'order_type') return test.order_type == (valueSelect?.value || valueSelect);
        if (typeSelect === 'status') return test.status == valueSelect;

        return true;
    })
        .sort((a, b) => {

            if (type === 'task' && value === 'next') { return (a.id - b.id) }
            return 0;
        })
    const handleTypeSelect = (e) => {
        setTypeSelect(e.target.value)
        setValueSelect("select")
    }
    const handleValueSelect = (e) => {
        setValueSelect(e.target.value)
    }
    useEffect(() => {
        getIncomeTest(dispatch)
        getIncomes(dispatch)
        if (type && value) {
            setTypeSelect(type)
            setValueSelect(decodedValue)
        }
    }, [type, value, dispatch])

    return (
        <div>
            <div className="border-bottom mt-2 d-flex align-items-center" style={{ height: '53px' }} >
                <h2 className="title w-100 text-start fs-6">Gestión de Pruebas</h2>
            </div>
            <div className="container-fluid mt-3 container-table border rounded" style={{ height: '80vh', maxHeight: "80vh", overflowX: "hidden", overflowY: "auto", maxWidht: '100%' }} >
                <h2 className="title w-100 text-start mt-1 fs-3">Gestión de Pruebas</h2>
                <p>Gestión de pruebas según prioridad y paciente</p>

                <div className="d-flex justify-content-center align-items-center">
                    <small className="mx-1">Filtar:</small>
                    <select className="form-select form-select-custom w-25 shadow-sm border" aria-label="Default select type" onChange={handleTypeSelect} value={typeSelect}>
                        <option value='select' selected>Selecciona una opción</option>
                        <option value="urgency">Prioridad</option>
                        <option value="patient">Paciente</option>
                        <option value="order_type">Tipo de prueba</option>
                        <option value="status">Estado</option>
                    </select>
                    {(typeSelect === 'select' || typeSelect === 'task' || typeSelect === '') &&
                        <select className="form-select w-25 mx-1" aria-label="Default select example" disabled>
                            <option selected>Selecciona una opcion</option>
                        </select>}
                    {
                        (typeSelect === 'patient') &&
                        <div className="input-group w-25 mx-1 shadow-sm border">
                            <input type="text"
                                className="form-control shadow-sm border"
                                placeholder="Nombre o DNI"
                                aria-label="Username"
                                aria-describedby="visible-addon"
                                onChange={(e) => handlerSearch(e.target.value)} />
                        </div>

                    }
                    {
                        typeSelect === 'urgency' &&
                        <select className="form-select w-25 mx-1 shadow-sm border" aria-label="Default select example" onChange={handleValueSelect} value={valueSelect}>
                            <option value='select' selected>Selecciona una prioridad</option>
                            <option value="control">Criticos</option>
                            <option value="1">Inminente</option>
                            <option value="2">Emergencia</option>
                            <option value="3">Urgente</option>
                            <option value="4">No urgente</option>
                            <option value="4">No urgente</option>
                        </select>
                    }
                    {
                        typeSelect === 'order_type' &&
                        <Select
                            options={options}
                            placeholder="Buscar prueba..."
                            onChange={(valueSelect) => setValueSelect(valueSelect)}
                            className=" w-25 mx-1 shadow-sm border "
                            styles={{ zIndex: '1000' }}
                        />
                    }
                    {
                        typeSelect === 'status' &&
                        <select className="form-select w-25 mx-1 shadow-sm border" aria-label="Default select example" onChange={handleValueSelect}>
                            <option value='select' selected>Selecciona un estado</option>
                            <option value="solicitada">Solicitada</option>
                            <option value="enProceso">En proceso</option>
                            <option value="pendiente">Pendiente de envio</option>
                            <option value="finalizado">Finalizado</option>
                        </select>
                    }


                </div>
                <table className="table table-md align-middle text-center fs-6 mt-2" >
                    <thead style={{ position: "sticky", top: "0" }}>
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
                            f.length > 0 ?
                                f.map((test) =>
                                    <RowTest key={test.id} test={test} />
                                ) : <tr>
                                    <td colSpan="5">
                                        No hay resultados para este filtro
                                    </td>
                                </tr>

                        }
                    </tbody>

                </table>
            </div>

        </div>

    )
}