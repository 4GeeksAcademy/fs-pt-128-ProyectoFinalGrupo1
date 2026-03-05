import { useSortable } from "@dnd-kit/react/sortable";

export const SortableRow = ({ id, index }) => {
    const { ref } = useSortable({ id, index });

    return (
        <tr className="table-success item" ref={ref} >
            <th scope="row" >{id}</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
        </tr>
    )
}