import { Link } from "react-router-dom";
import { TimeCounter } from "../TimeCounter/TimeCounter";
export const RowConsult = ({ income }) => {
    const getPriorityColor = (priority) => {
        switch (priority) {
            case 1: return "rgb(243, 142, 152)";
            case 2: return "rgb(250, 195, 140)";
            case 3: return "rgb(253, 232, 157)";
            case 4: return "rgb(181, 235, 181)";
            case 5: return "rgb(167, 226, 255)";
            default: return "rgba(255, 255, 255, 1)";
        }
    }

    return (
        <tr className="color-primary"
            style={{ backgroundColor: getPriorityColor(income.triage_priority) }}
        >
            <td className="w-auto text-nowrap bg-transparent">
                {income.patient_firstname} {income.patient_lastname}
            </td>
            <td className="w-auto text-nowrap bg-transparent">
                {income.patient_allergies.replace("{", "").replace("}", "")}
            </td>
            <td className="text-break bg-transparent">
                {income.valoration_triage}</td>
            <td className="w-auto text-nowrap bg-transparent">
                <Link to={`/consultation/${income.id}`}>
                    <button className="btn btn-outline-dark">
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