import { useEffect } from "react"
import useGlobalReducer from "../../hooks/useGlobalReducer"
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { SortableRow } from "../../components/RowTriage/RowTriage"
import { getIncomes, loadNewOrder } from "../../APIServices/BACKENDservices"
import { restrictToVerticalAxis, restrictToWindowEdges } from '@dnd-kit/modifiers';
import '../RegisterUser/RegisterUser.css'

export const DashboardTriaje = () => {

    const { store, dispatch } = useGlobalReducer()

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
        getIncomes(dispatch)
    }, [])

    return (
        <div className="container-fluid mt-5 container-table" style={{ maxHeight: "80vh", overflowX: "hidden", overflowY: "auto", maxWidht: '100%' }} >
            <h1 className="text-center text-uppercase fs-2 mb-3">Dashboard Triaje</h1>
            <DndContext
                collisionDetection={closestCenter}
                modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
                onDragEnd={handleDnD}>
                <table className="table table-md align-middle text-center fs-5" >
                    <thead style={{ position: "sticky", top: "0", zIndex: "2" }}>
                        <tr >
                            <th scope="col" className="w-auto text-nowrap">Paciente</th>
                            <th scope="col" className="w-auto text-nowrap">Alergias</th>
                            <th scope="col">Motivo de la visita</th>
                            <th scope="col" className="w-auto text-nowrap">Triaje</th>
                            <th scope="col" className="w-auto text-nowrap">Tiempo en espera</th>
                            <th scope="col" className="w-auto text-nowrap"></th>
                        </tr>
                    </thead>
                    <SortableContext items={store.incomes.map(income => income.id)} strategy={verticalListSortingStrategy}>
                        <tbody className="list">
                            {
                                store.incomes
                                    .filter(income => income.state === 'En espera de triaje')
                                    .map((income) =>

                                        < SortableRow key={income.id} id={income.id} income={income} />
                                    )
                            }
                        </tbody>
                    </SortableContext>
                </table>
            </DndContext>
        </div>

    )
}