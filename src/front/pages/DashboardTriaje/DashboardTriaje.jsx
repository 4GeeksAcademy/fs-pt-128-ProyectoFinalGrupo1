import { useEffect, useState } from "react"
import useGlobalReducer from "../../hooks/useGlobalReducer"
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { SortableRow } from "../../components/RowTriage/RowTriage"
import { getIncomes, loadNewOrder } from "../../APIServices/BACKENDservices"
import { restrictToVerticalAxis, restrictToWindowEdges } from '@dnd-kit/modifiers';
import { SpinnerLoad } from "../../components/Spinner/SpinnerLoad";
import { useParams } from "react-router-dom";
import '../RegisterUser/RegisterUser.css'
import './DashboardTriaje.css'

export const DashboardTriaje = () => {

    const { store, dispatch } = useGlobalReducer()
    const { type, value } = useParams()
    const [typeSelect, setTypeSelect] = useState('')
    const [valueSelect, setValueSelect] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    let patientLoad = [...store.incomes]
    const handlerSearch = (value) => {
        dispatch({ type: 'search', payload: value })
    }

    const filtered = patientLoad.filter(income => {
        const searchPatient = store.search.toLowerCase();
        return (
            income.patient_firstname?.toLowerCase().includes(searchPatient) ||
            income.patient_lastname?.toLowerCase().includes(searchPatient) ||
            income.patient_dni?.toLowerCase().includes(searchPatient)
        )
    })

    const handleTypeSelect = (e) => {
        setTypeSelect(e.target.value)
        setValueSelect("select")
    }

    const handleValueSelect = (e) => {
        setValueSelect(e.target.value)
    }

    const handleDnD = async (e) => {
        const { active, over } = e
        if (!over || active.id === over.id) return

        if (active.id !== over.id) {
            const oldIndex = store.incomes.findIndex(income => income.id === active.id)
            const newIndex = store.incomes.findIndex(income => income.id === over.id)
            const newOrder = arrayMove(store.incomes, oldIndex, newIndex)

            dispatch({
                type: "update_incomes_order",
                payload: newOrder
            })
            const orderedIds = newOrder.map(income => income.id)
            await loadNewOrder(orderedIds)
        }
    }
    const loadPatients = async () => {
        setIsLoading(true)
        const response = await getIncomes(dispatch)

        if (response) {
            setIsLoading(false)
            return
        }
        setIsLoading(false)
    }

 
    useEffect(() => {
        loadPatients()
        if (type && value) {
            setTypeSelect(type)
            setValueSelect(value)
        }
    }, [type, value, dispatch])

    return (
        <div>
            <div className="border-bottom mt-2 d-flex align-items-center" style={{ height: '53px' }} >
                <h2 className="title w-100 text-start fs-6">Control de triaje</h2>
            </div>
            {

                isLoading ? (
                    <div className="d-flex justify-content-center align-items-center flex-column" style={{ minHeight: "100vh" }}>
                        <h2 className="title">Cagando datos del paciente...</h2>
                        <SpinnerLoad />
                    </div>
                ) :
                    (<div className="container-fluid mt-3 border rounded container-table" style={{ maxHeight: "80vh", overflowX: "hidden", overflowY: "auto", maxWidht: '100%' }} >
                        <h1 className="title w-100 text-start fs-3 mt-2">Control de triaje</h1>
                        <p>Gestión de triaje con reordenado híbrido</p>
                        <div className="d-flex justify-content-center mb-2 align-items-center">
                            <small className="mx-1">Filtar:</small>
                            <select className="form-select form-select-custom w-25 shadow-sm" aria-label="Default select type" onChange={handleTypeSelect} value={typeSelect}>
                                <option value='select' selected>Selecciona una opción</option>
                                <option value="patient">Paciente</option>
                                <option value="urgency">Prioridad</option>
                            </select>
                            {(typeSelect === 'select' || typeSelect === 'task' || typeSelect === '') &&
                                <select className="form-select w-25 mx-1" aria-label="Default select example" disabled>
                                    <option selected>Selecciona una opcion</option>
                                </select>
                            }
                            {
                                (typeSelect === 'patient') &&
                                <div className="input-group w-25 mx-1">
                                    <input type="text"
                                        className="form-control form-select-custom shadow-sm border"
                                        placeholder="Nombre o DNI"
                                        aria-label="nombre"
                                        aria-describedby="visible-addon"
                                        onChange={(e) => handlerSearch(e.target.value)} />
                                </div>

                            }
                            {
                                typeSelect === 'urgency' &&
                                <select className="form-select  form-select-custom shadow-sm border w-25 mx-1" aria-label="Default select example" onChange={handleValueSelect} value={valueSelect}>
                                    <option value='select' selected>Selecciona una prioridad</option>
                                    <option value="control">Criticos</option>
                                    <option value="1">Inminente</option>
                                    <option value="2">Emergencia</option>
                                    <option value="3">Urgente</option>
                                    <option value="4">No urgente</option>
                                    <option value="5">Control</option>
                                </select>
                            }
                        </div>
                        <DndContext
                            collisionDetection={closestCenter}
                            modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
                            onDragEnd={handleDnD}>
                            <table className="table table-md align-middle text-center font-size mt-3" >
                                <thead style={{ position: "sticky", top: "0", zIndex: "2" }}>
                                    <tr>
                                        <th scope="col" className="text-nowrap" style={{ width: "17%" }}>Paciente</th>
                                        <th scope="col" colSpan={1} className="text-nowrap" style={{ width: "8%" }}>Alergias</th>
                                        <th scope="col" style={{ width: "41%" }}>Motivo de la visita</th>
                                        <th scope="col" className="w-auto text-nowrap" style={{ width: "8%" }}>Triaje</th>
                                        <th scope="col" className="w-auto text-nowrap" style={{ width: "10%" }}>Tiempo en espera</th>
                                        <th scope="col" className="w-auto text-nowrap" style={{ width: "8%" }}></th>
                                    </tr>
                                </thead>
                                <SortableContext items={store.incomes.map(income => income.id)} strategy={verticalListSortingStrategy}>
                                    <tbody className="list">
                                        {
                                            filtered
                                                .filter(income => {
                                                    if (typeSelect === 'historial' && valueSelect === 'all')
                                                        return income.state === 'Esperando consulta' && (new Date() - new Date(income.created_at)) / 60000 < 720
                                                    if (typeSelect === 'patient' && valueSelect === 'all') return income.state === 'En espera de triaje'
                                                    if (typeSelect == 'task' && valueSelect == 'next') return income.state === 'En espera de triaje'
                                                    if (valueSelect === 'select' || valueSelect === '' || !valueSelect)
                                                        return income.state === 'En espera de triaje'
                                                    if (income.state === 'En espera de triaje' && (typeSelect == 'urgency' && valueSelect == 'control')) return income.triage_priority == 1 || income.triage_priority == 2
                                                    if (typeSelect == 'urgency' && income.state === 'En espera de triaje') return income.triage_priority == valueSelect
                                                    return false
                                                })
                                                .sort((a, b) => {
                                                    if (type === 'task' && value === 'next') { return (a.id - b.id) }
                                                    return 0;
                                                })
                                                .map((income) =>
                                                    < SortableRow key={income.id} id={income.id} income={income} />
                                                )
                                        }
                                    </tbody>
                                </SortableContext>
                            </table>
                        </DndContext>
                    </div >
                    )}
        </div>


    )
}