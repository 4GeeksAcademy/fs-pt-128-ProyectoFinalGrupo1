import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Link } from "react-router-dom";
export const SortableRow = ({ id, income }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };
    const getPriorityColor = (priority) => {
        switch (priority) {
            case 1: return "#d34240"
            case 2: return "#ffae69"
            case 3: return "#ffee8c"
            case 4: return "#88e788"
            case 5: return "#b3ebf2"
            default: return "white"
        }
    }

    return (
        <tr className="color-primary" ref={setNodeRef}
            style={{ ...style, backgroundColor: getPriorityColor(income.triage_priority) }}
            {...attributes}>
            <th scope="row" style={{ backgroundColor: getPriorityColor(income.triage_priority) }}></th>
            <th className="align-middle"
                style={{ backgroundColor: getPriorityColor(income.triage_priority) }}>
                {income.patient_firstname} {income.patient_lastname}
            </th>
            <td className="align-middle"
                style={{ backgroundColor: getPriorityColor(income.triage_priority) }}>
                {income.patient_allergies}
            </td>
            <td className="align-middle"
                style={{ backgroundColor: getPriorityColor(income.triage_priority) }}>
                {income.visitreason}</td>
            <td className="align-middle"
                style={{ backgroundColor: getPriorityColor(income.triage_priority) }}>
                <Link to={`/income/${income.patient_dni}`}>
                    <button className="btn btn-outline-dark">
                        Pasar triaje
                    </button>
                </Link>

            </td>
            <td className="align-middle"
                style={{ backgroundColor: getPriorityColor(income.triage_priority) }}>
                Futuro contador
            </td>
            <td className="align-middle"
                {...listeners}
                style={{ cursor: "grab", backgroundColor: getPriorityColor(income.triage_priority) }}>
                ⠿
            </td>
        </tr>
    )
}