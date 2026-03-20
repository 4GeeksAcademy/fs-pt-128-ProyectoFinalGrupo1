import { Link } from "react-router-dom"

export const QuickActionsTriage = ({ criticalPacients, oldestPatient }) => {
    return (
        <div className="border-0 p-3 rounded-4">
            <div className="d-flex flex-column gap-3">
                <Link className="text-decoration-none" to={'/triage/patient/all'}>
                    <div className="d-flex bg-white align-items-center bg-white p-3 rounded-3 bg-light action-btn-hover" style={{ cursor: 'pointer' }}>
                        <div className="bg-light p-2 rounded-3 shadow me-3 text-center" style={{ width: '40px', height: '40px' }}>
                            <i className="fa-solid fa-magnifying-glass text-primary fs-5"></i>
                        </div>
                        <div>
                            <h6 className="mb-0 fw-bold text-dark">Buscar Paciente</h6>
                            <p className="text-muted m-0">Por nombre o DNI</p>
                        </div>
                    </div>
                </Link>

                <Link className="text-decoration-none" to={'/triage/task/next'}>
                    <div className="d-flex bg-white align-items-center p-3 rounded-3 bg-light action-btn-hover position-relative" style={{ cursor: 'pointer' }}>
                        <div className="bg-light p-2 rounded-3 shadow me-3 text-center" style={{ width: '40px', height: '40px' }}>
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

                <Link className="text-decoration-none" to={'/triage/urgency/control'}>
                    <div className="d-flex bg-white align-items-center p-3 rounded-3 bg-light action-btn-hover position-relative" style={{ cursor: 'pointer' }}>
                        <div className="bg-light p-2 rounded-3 shadow me-3 text-center" style={{ width: '40px', height: '40px' }}>
                            <i className="fa-solid fa-forward-step text-danger fs-5"></i>
                        </div>
                        <div>
                            <h6 className="mb-0 fw-bold text-dark ">Tareas pacientes criticos</h6>
                            <p className="text-muted m-0">Siguente paciente critico</p>
                        </div>

                        {
                            criticalPacients > 0 &&
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                {criticalPacients}
                            </span>
                        }
                    </div>
                </Link>
                <Link className="text-decoration-none" to={'/triage/historial/all'}>
                    <div className="d-flex bg-white align-items-center p-3 rounded-3 bg-light action-btn-hover position-relative" style={{ cursor: 'pointer' }}>
                        <div className="bg-light p-2 rounded-3 shadow me-3 text-center" style={{ width: '40px', height: '40px' }}>
                            <i className="fa-solid fa-user-check text-warning fs-5"></i>
                        </div>
                        <div>
                            <h6 className="mb-0 fw-bold text-dark ">Historial de Pacientes </h6>
                            <p className="text-muted m-0">Historial de pacientes valorados en turno</p>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}