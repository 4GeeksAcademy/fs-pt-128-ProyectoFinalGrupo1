import { Link } from "react-router-dom";
import { calculateTime } from "../../utils/calculateTime";
import { getPriorityColor } from "../../utils/setColorPriority";

export const WaitingList = ({ income }) => {

    const priorityColor = getPriorityColor(Number(income.triage_priority));
    const shadowStyle = {
        borderLeft: `6px solid ${priorityColor}`,
        background: '#fff',
    };

    return (
        <div key={income.id} className="bg-white  d-flex justify-content-between rounded m-2 p-2" style={{ ...shadowStyle }}>
            <div className="rounded-circle  bg-light d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                <i className="fa-regular fa-file-lines fs-4 mx-3"></i>
            </div>
            <div className="d-flex flex-column justify-content-start align-items-start  text-truncate ms-2" style={{ width: '70%' }}>
                <h3 className="m-0  order-text fw-bolder">{income.patient_firstname}</h3>
                <small className="m-0 text-truncate text-muted mw-100">{income.visitreason}</small>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center" style={{ width: '20%' }}>
                <Link to={`/consultation/${income.id}`}>
                    <button className="btn btn-sm btn-dark">
                        <i className="fa-solid fa-user-doctor me-1"></i>
                        Consulta
                    </button>
                </Link>
                <p className="m-0 text-muted text-hour">{calculateTime
                    (income.created_at)}</p>
            </div>
        </div>
    )
}
