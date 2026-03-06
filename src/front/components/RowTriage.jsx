import { useSortable } from "@dnd-kit/react/sortable";

export const SortableRow = ({ id, index, income }) => {
    const { ref } = useSortable({ id, index });

    return (
        <tr className="table-success item" ref={ref} >
            <th scope="row" >{id}</th>
            <td>{income.patient_name}</td>
            <td>Thornton</td>
            <td>@fat</td>
        </tr>
    )
}