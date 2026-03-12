import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Link } from "react-router-dom";
import { TimeCounter } from "../TimeCounter/TimeCounter";
import { PopOver } from "../PopOver/PopOver";
import { getPriorityColor } from "../../utils/setColorPriority";

export const SortableRow = ({ id, income }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };
    const priorityColor = getPriorityColor(income.triage_priority);
    const shadowStyle = {
        borderLeft: `6px solid ${priorityColor}`,
        borderLeftColor: priorityColor,
        boxShadow: `inset 15px 0 70px -15px ${priorityColor}, inset 0 0 5px rgba(0,0,0,0.05)`,
    };

    return (
        <tr className="color-primary medical-row" ref={setNodeRef}
            style={{ ...style, ...shadowStyle }}
            {...attributes}>
            <td className="w-auto text-nowrap bg-transparent p-0">
                {income.patient_firstname} {income.patient_lastname}
            </td>
            <td colSpan={1} className="text-nowrap bg-transparent p-0">
                <PopOver patient={income.patient_firstname} allergies={income.patient_allergies} />
            </td>
            <td className="text-break bg-transparent p-0">
                {income.visitreason}</td>
            <td className="w-auto text-nowrap bg-transparent p-0">
                <Link to={`/income/${income.patient_dni}`}>
                    <button className="btn btn-sm btn-outline-dark border border-0 text-decoration-none p-0">
                        Pasar triaje
                    </button>
                </Link>

            </td>
            <td className="w-auto text-nowrap bg-transparent">
                <TimeCounter startTime={income.created_at} priority={income.triage_priority} />
            </td>
            <td className="w-auto text-nowrap bg-transparent "
                {...listeners}>
                <i className="fa-solid fa-grip-vertical fs-5"></i>
            </td>
        </tr>
    )
}