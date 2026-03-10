import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Link } from "react-router-dom";
import { TimeCounter } from "../TimeCounter/TimeCounter";
export const SortableRow = ({ id, income }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };
    const getPriorityColor = (priority) => {
        switch (priority) {
            case 1: return "rgb(243, 142, 152)"; // Rojo (Pastel fuerte)
            case 2: return "rgb(250, 195, 140)"; // Naranja (Tono melocotón)
            case 3: return "rgb(253, 232, 157)"; // Amarillo (Crema cálido)
            case 4: return "rgb(181, 235, 181)"; // Verde (Menta suave)
            case 5: return "rgb(167, 226, 255)"; // Azul (Cielo claro)
            default: return "rgba(255, 255, 255, 1)";
        }
    }

    return (
        <tr className="color-primary" ref={setNodeRef}
            style={{ ...style, backgroundColor: getPriorityColor(income.triage_priority) }}
            {...attributes}>
            <td className="w-auto text-nowrap"
                style={{ backgroundColor: getPriorityColor(income.triage_priority) }}>
                {income.patient_firstname} {income.patient_lastname}
            </td>
            <td className="w-auto text-nowrap"
                style={{ backgroundColor: getPriorityColor(income.triage_priority) }}>
                {income.patient_allergies}
            </td>
            <td className="text-break"
                style={{ backgroundColor: getPriorityColor(income.triage_priority) }}>
                {income.visitreason}</td>
            <td className="w-auto text-nowrap"
                style={{ backgroundColor: getPriorityColor(income.triage_priority) }}>
                <Link to={`/income/${income.patient_dni}`}>
                    <button className="btn btn-outline-dark">
                        Pasar triaje
                    </button>
                </Link>

            </td>
            <td className="w-auto text-nowrap"
                style={{ backgroundColor: getPriorityColor(income.triage_priority) }}>
                <TimeCounter startTime={income.created_at} priority={income.triage_priority} />
            </td>
            <td className="w-auto text-nowrap"
                {...listeners}
                style={{ cursor: "grab", backgroundColor: getPriorityColor(income.triage_priority) }}>
                ⠿
            </td>
        </tr>
    )
}