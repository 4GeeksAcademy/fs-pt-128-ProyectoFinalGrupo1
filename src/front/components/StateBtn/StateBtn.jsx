import { calculateTime } from '../../utils/calculateTime'
import './StateBtn.css'

export const StateBtn = ({ test }) => {



    return (
        <div>
            {
                test.slice().reverse().slice(0, 6).map(t =>
                    <div key={t.id} className="bg-white border d-flex justify-content-between rounded m-2 p-2">
                        <div className="rounded-circle  bg-light d-flex align-items-center justify-content-center" style={{ width: '70px', height: '50px' }}>
                            <i className="fa-regular fa-file-lines fs-4 mx-3"></i>
                        </div>
                        <div className="d-flex flex-column justify-content-center align-items-start w-100 ms-3">
                            <h3 className="m-0  order-text fw-bolder">{t.order_type}</h3>
                            <small className="m-0  text-muted">{t.patient_name} {t.patient_last}</small>
                        </div>
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <p className="m-0 rounded-pill text-white text-orderstatus text-uppercase px-2">{t.status}</p>
                            <small className="m-0 mt-1 text-muted text-hour">{calculateTime(t.created_at)}</small>
                        </div>
                    </div>
                )
            }

        </div>

    )
}