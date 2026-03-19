import { calculateTime } from "../../utils/calculateTime.js"
import './PatientWaitingCard.css'

export const PatientWaitingCard = ({ incomes }) => {
    console.log(incomes);

    return (
        <div>
            {
                incomes
                    .filter(income => income.state == 'En espera de triaje')
                    .slice().reverse().slice(0, 6)
                    .map(income =>
                        <div key={income.id} className="bg-white border d-flex justify-content-between rounded m-2 p-2">
                            <div className="rounded-circle  bg-light d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                                <i className="fa-regular fa-file-lines fs-4 mx-3"></i>
                            </div>
                            <div className="d-flex flex-column justify-content-start align-items-start  text-truncate ms-2" style={{ width: '70%' }}>
                                <h3 className="m-0  order-text fw-bolder">{income.patient_firstname}</h3>
                                <small className="m-0 text-truncate text-muted mw-100">{income.visitreason}</small>
                            </div>
                            <div className="d-flex flex-column justify-content-center align-items-center" style={{ width: '20%' }}>
                                <p className={`m-0 rounded-pill text-white text-orderstatus text-nowrap text-uppercase px-2
                                    ${income.triage_priority === 1 ? 'bg-danger' :
                                        income.triage_priority === 2 ? 'bg-orange' :
                                            income.triage_priority === 3 ? 'bg-warning' :
                                                income.triage_priority === 4 ? 'bg-success' : 'bg-primary'}`}>
                                    {income.triage_priority === 1 ? 'Critico' :
                                        income.triage_priority === 2 ? 'Emergencia' :
                                            income.triage_priority === 3 ? 'Urgente' :
                                                income.triage_priority === 4 ? 'Leve' : 'No urgente'}</p>
                                <p className="m-0 text-muted text-hour">{calculateTime(income.created_at)}</p>
                            </div>
                        </div>
                    )
            }

        </div>

    )
}