import { useEffect, useState } from "react"
import useGlobalReducer from "../../hooks/useGlobalReducer"
import { closestCenter, DndContext } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable"
import { RowConsult } from "../../components/RowConsult/RowConsult"
import { getIncomes, loadNewOrder } from "../../APIServices/BACKENDservices"
import { restrictToVerticalAxis, restrictToWindowEdges } from "@dnd-kit/modifiers"
import { SpinnerLoad } from "../../components/Spinner/SpinnerLoad"


export const DashboardConsulta = () => {
    const { store, dispatch } = useGlobalReducer()
    const [isLoading, setIsLoading] = useState(false)

    const loadPatients = async () => {
        setIsLoading(true)
        const response = await getIncomes(dispatch)

        if (response) {
            setIsLoading(false)
            return
        }
        setIsLoading(false)
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

    useEffect(() => {
        loadPatients()
    }, [])

    return (
        <div>
            <div className="border-bottom mt-2 d-flex align-items-center" style={{ height: '53px' }} >
                <h2 className="title w-100 text-start fs-6">Control de consulta</h2>
            </div>
            {isLoading ?
                (<div className="d-flex justify-content-center align-items-center flex-column" style={{ minHeight: "100vh" }}>
                    <h2>Cagando datos del paciente...</h2>
                    <SpinnerLoad />
                </div>) : (
                    <div className="container-fluid mt-3 container-table" style={{ maxHeight: "80vh", overflowX: "hidden", overflowY: "auto", maxWidht: '100%' }} >
                        <h1 className="title w-100 text-start fs-3 mt-2">Control de Consulta</h1>
                        <p>Gestión de consulta con reordenado híbrido</p>
                        <DndContext
                            collisionDetection={closestCenter}
                            modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
                            onDragEnd={handleDnD}>
                            <table className="table table-md align-middle text-center fs-6" >
                                <thead style={{ position: "sticky", top: "0", zIndex: "2" }}>
                                    <tr >
                                        <th scope="col" className="w-auto text-nowrap" style={{ width: "17%" }}>Paciente</th>
                                        <th scope="col" className="w-auto text-nowrap" style={{ width: "8%" }}>Alergias</th>
                                        <th scope="col" style={{ width: "49%" }}>Valoración del triaje</th>
                                        <th scope="col" className="w-auto text-nowrap" style={{ width: "8%" }}>Consulta</th>
                                        <th scope="col" className="w-auto text-nowrap">Tiempo en espera</th>
                                        <th scope="col" className="w-auto text-nowrap" style={{ width: "8%" }}></th>
                                    </tr>
                                </thead>
                                <SortableContext items={store.incomes.map(income => income.id)} strategy={verticalListSortingStrategy}>
                                    <tbody className="list">
                                        {
                                            store.incomes
                                                .filter(income => income.state === 'Esperando consulta')
                                                .map((income) =>
                                                    <RowConsult key={income.id} id={income.id} income={income} />
                                                )

                                        }
                                    </tbody>
                                </SortableContext>
                            </table>
                        </DndContext>
                    </div>
                )}
        </div>

    )
}