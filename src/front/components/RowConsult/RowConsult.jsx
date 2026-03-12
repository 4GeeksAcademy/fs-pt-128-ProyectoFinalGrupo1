import { Link } from "react-router-dom";
import { TimeCounter } from "../TimeCounter/TimeCounter";
import { PopOver } from "../PopOver/PopOver";
import { getPriorityColor } from "../../utils/setColorPriority";
import './RowConsult.css'

export const RowConsult = ({ income }) => {

    const priorityColor = getPriorityColor(income.triage_priority);
    const shadowStyle = {
        borderLeft: `6px solid ${priorityColor}`,
        borderLeftColor: priorityColor,
        boxShadow: `inset 15px 0 70px -15px ${priorityColor}, inset 0 0 5px rgba(0,0,0,0.05)`,
    };

    return (
        <tr className="color-primary medical-row"
            style={{ ...shadowStyle }}
        >
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
                    <button className="btn btn-custom border border-0 p-0">
                        Pasar a consulta
                    </button>
                </Link>

            </td>
            <td className="w-auto text-nowrap bg-transparent">
                <TimeCounter startTime={income.created_at} priority={income.triage_priority} />
            </td>
        </tr>
    )
}