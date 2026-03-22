import { Link } from "react-router-dom"

export const QuickActions = ({ criticalPacient, oldestPatient, sendPending }) => {
    return (
        <div className="border-0 p-3 rounded-4">
            <div className="d-flex flex-column gap-3">
                <Link className="text-decoration-none" to={'/tests/patient/all'}>
                    <div className="d-flex bg-white align-items-center bg-white p-3 rounded-3 bg-light action-btn-hover" style={{ cursor: 'pointer' }}>
                        <div className="bg-light p-2 rounded-3 shadow me-3">
                            <i className="fa-solid fa-magnifying-glass text-primary fs-5"></i>
                        </div>
                        <div>
                            <h6 className="mb-0 fw-bold text-dark">Buscar Paciente</h6>
                            <p className="text-muted m-0">Por nombre o DNI</p>
                        </div>
                    </div>
                </Link>

                <Link className="text-decoration-none" to={'/tests/task/next'}>
                    <div className="d-flex bg-white align-items-center p-3 rounded-3 bg-light action-btn-hover position-relative" style={{ cursor: 'pointer' }}>
                        <div className="bg-light p-2 rounded-3 shadow me-3">
                            <i className="fa-solid fa-forward-step text-success fs-5"></i>
                        </div>
                        <div>
                            <h6 className="mb-0 fw-bold text-dark">Siguente tarea</h6>
                            <p className="text-muted m-0">Siguente tarea ordenada por mas antigua</p>
                        </div>
                        {
                            oldestPatient > 0 &&
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                {oldestPatient}
                            </span>
                        }
                    </div>
                </Link>

                <Link className="text-decoration-none" to={'/tests/urgency/control'}>
                    <div className="d-flex bg-white align-items-center p-3 rounded-3 bg-light action-btn-hover position-relative" style={{ cursor: 'pointer' }}>
                        <div className="bg-light p-2 rounded-3 shadow me-3">
                            <i className="fa-solid fa-forward-step text-danger fs-5"></i>
                        </div>
                        <div>
                            <h6 className="mb-0 fw-bold text-dark ">Tareas pacientes criticos</h6>
                            <p className="text-muted m-0">Siguente paciente critico</p>
                        </div>

                        {
                            criticalPacient > 0 &&
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                {criticalPacient}
                            </span>
                        }
                    </div>
                </Link>
                <Link className="text-decoration-none" to={'/tests/status/Pendiente'}>
                    <div className="d-flex bg-white align-items-center p-3 rounded-3 bg-light action-btn-hover position-relative" style={{ cursor: 'pointer' }}>
                        <div className="bg-light p-2 rounded-3 shadow me-3">
                            <i className="fa-solid fa-paper-plane text-warning fs-5"></i>
                        </div>
                        <div>
                            <h6 className="mb-0 fw-bold text-dark">Bandeja de Salida</h6>
                            <p className="text-muted m-0">{sendPending} informes listos</p>
                        </div>
                        {
                            sendPending > 0 &&
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                {sendPending}
                            </span>
                        }
                    </div>
                </Link>
            </div>
        </div>
    )
}