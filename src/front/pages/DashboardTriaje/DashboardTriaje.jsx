import { useState } from "react"
import useGlobalReducer from "../../hooks/useGlobalReducer"
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { SortableRow } from "../../components/RowTriage"
import { loadNewOrder } from "../../APIServices/BACKENDservices"

export const DashboardTriaje = () => {

    const { store, dispatch } = useGlobalReducer()

    const handleDnD = (e) => {
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
            loadNewOrder(orderedIds)
        }
    }


    return (
        <div className="container mt-5" style={{ maxHeight: "80vh", overflowX: "hidden", overflowY: "auto" }} >
            <h1 className="text-center text-uppercase fs-2 mb-3">Dashboard Triaje</h1>
            <DndContext collisionDetection={closestCenter} onDragEnd={handleDnD}>
                <table class="table" >
                    <thead style={{ position: "sticky", top: "0", zIndex: "2" }}>
                        <tr >
                            <th scope="col">Paciente</th>
                            <th scope="col">First</th>
                            <th scope="col">Last</th>
                            <th scope="col">Handle</th>
                        </tr>
                    </thead>
                    <SortableContext items={store.incomes.map(income => income.id)} strategy={verticalListSortingStrategy}>
                        <tbody className="list">
                            {
                                store.incomes.map((income, index) =>
                                    <SortableRow key={income.id} id={income.id} index={index} income={income} />
                                )
                            }
                        </tbody>
                    </SortableContext>
                </table>
            </DndContext>
        </div>

    )
}