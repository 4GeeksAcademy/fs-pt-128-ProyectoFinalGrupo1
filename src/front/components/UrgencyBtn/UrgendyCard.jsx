import './UrgencyBtn.css'
import { getPriorityColor } from '../../utils/setColorPriority';

export const UrgencyCard = ({ t, calculateTime }) => {

    const priorityColor = getPriorityColor(t.urgency);
    const shadowStyle = {
        borderLeft: `6px solid ${priorityColor}`,
        background: '#fff',
    };

    return (
        <div className="bg-white  d-flex justify-content-between rounded m-2 p-2" style={{ ...shadowStyle }}>
            <div className="rounded-circle bg-light d-flex align-items-center justify-content-center" style={{ width: '70px', height: '50px' }}>
                <i className="fa-regular fa-file-lines fs-4 mx-3"></i>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-start w-100 ms-3">
                <h3 className="m-0 order-text text-uppercase fw-bolder">{t.order_type}</h3>
                <p className="m-0 fs-6 text-muted">{t.patient_name} {t.patient_lastname}</p>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center">
                <p className="m-0 rounded-pill text-white text-orderstatus text-uppercase px-2">{t.status}</p>
                <p className="m-0 text-muted text-hour">{calculateTime(t.created_at)}</p>
            </div>
        </div>
    )
}