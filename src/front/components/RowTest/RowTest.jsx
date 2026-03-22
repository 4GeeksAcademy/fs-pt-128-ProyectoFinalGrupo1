import { Link } from "react-router-dom";
import { TimeCounter } from "../TimeCounter/TimeCounter";
import { getPriorityColor } from "../../utils/setColorPriority";
import './RowTest.css'
import { PopOverTest } from "../PopOver/PopOverTest";
import useGlobalReducer from "../../hooks/useGlobalReducer";

export const RowTest = ({ test }) => {
    const rol = { "rol": localStorage.getItem("rol") }
    const { store, dispatch } = useGlobalReducer()
    const priorityColor = getPriorityColor(test.urgency);
    const shadowStyle = {
        borderLeft: `6px solid ${priorityColor}`,
        borderRight: `6px solid ${priorityColor}`,
        borderLeftColor: priorityColor,
        borderRightColor: priorityColor,
        boxShadow: `inset 15px 0 70px -15px ${priorityColor}, inset 0 0 5px rgba(0,0,0,0.05)`,
    };
    console.log(store.orders?.find(i => i.id == test.id));

    return (
        <tr className="color-primary medical-row row-test"
            style={{ ...shadowStyle }}
        >
            <td className="w-auto text-nowrap bg-transparent">
                {test.patient_name} {test.patient_last}
            </td>
            <td className="w-auto text-nowrap bg-transparent ">
                {test.order_type}
            </td>
            <td className="text-break bg-transparent ">
                {test.status}</td>
            <td className="w-auto text-nowrap bg-transparent">
                {rol === 'Técnico' ? <Link to={`/test-form/${test.income_id}/${test.id}`}>
                    <button className="btn btn-custom-table bg-transparent border-0 p-0">
                        Ficha paciente
                    </button>
                </Link> : <div className='text-center'>
                    <Link to={`/test-result/${test.income_id}`} className='link-underline-dark text-dark fw-semibold'>Ver resultados</Link>
                </div>}

            </td>
            <td className="w-auto text-nowrap bg-transparent">
                <TimeCounter startTime={test.created_at} priority={test.urgency} />
            </td>
        </tr>
    )
}