import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Link } from "react-router-dom";
import { TimeCounter } from "../TimeCounter/TimeCounter";
import { PopOver } from "../PopOver/PopOver";
import { PopOverTest } from "../PopOver/PopOverTest";
import { getPriorityColor } from "../../utils/setColorPriority";
import './RowConsult.css'


export const RowConsult = ({ id, income }) => {

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };
    const priorityColor = getPriorityColor(income.triage_priority);
    const shadowStyle = {
        borderLeft: `6px solid ${priorityColor}`,
        borderRight: `6px solid ${priorityColor}`,
        borderLeftColor: priorityColor,
        borderRightColor: priorityColor,
        boxShadow: `inset 15px 0 70px -15px ${priorityColor}, inset 0 0 5px rgba(0,0,0,0.05)`,
    };
    return (
        <tr className="color-primary medical-row" ref={setNodeRef}
            style={{ ...style, ...shadowStyle }} {...attributes}>
            <td className="w-auto text-nowrap bg-transparent">
                {income.patient_firstname} {income.patient_lastname}
            </td>
            <td className="w-auto text-nowrap bg-transparent ">
                <PopOver patient={income.patient_firstname} allergies={income.patient_allergies} />
            </td>
            <td className="text-break bg-transparent ">
                {income.valoration_triage}</td>
            <td className="w-auto text-nowrap bg-transparent">
                <Link to={`/consultation/${income.id}`}>
                    <button className="btn btn-custom-table  bg-transparent border-0 p-0">
                        Pasar a consulta
                    </button>
                </Link>

            </td>
            <td className="w-auto text-nowrap bg-transparent ">
                <PopOverTest patient={income.patient_firstname} orders={income.orders} />
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