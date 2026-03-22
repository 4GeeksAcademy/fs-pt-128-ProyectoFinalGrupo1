import { Link } from "react-router-dom"
import useGlobalReducer from "../../hooks/useGlobalReducer"
import { useEffect } from "react"
import { getIncomeTest } from "../../APIServices/BACKENDservices"

export const QuickActionsConsultation = ({ criticalPacients }) => {
    const { store, dispatch } = useGlobalReducer()

    useEffect(() => {
        getIncomeTest(dispatch)
    }, [])

    return (
        <div className="border-0 p-3 rounded-4">
            <div className="d-flex flex-column gap-3">
                <Link className="text-decoration-none" to={'/consultation/patient/all'}>
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
                <Link className="text-decoration-none" to={'/consultation/urgency/control'}>
                    <div className="d-flex bg-white align-items-center bg-white p-3 rounded-3 bg-light action-btn-hover position-relative" style={{ cursor: 'pointer' }}>
                        <div className="bg-light p-2 rounded-3 shadow me-3 text-center" style={{ width: '40px', height: '40px' }}>
                            <i className="fa-solid fa-triangle-exclamation text-danger fs-5"></i>
                        </div>
                        <div>
                            <h6 className="mb-0 fw-bold text-dark">Pacientes críticos</h6>
                            <p className="text-muted m-0">Acceso directo a pacientes críricos</p>
                        </div>
                        {
                            criticalPacients > 0 &&
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                {criticalPacients}
                            </span>
                        }
                    </div>
                </Link>
                <Link className="text-decoration-none" to={'/tests/status/solicitada'}>
                    <div className="d-flex bg-white align-items-center p-3 rounded-3 bg-light action-btn-hover position-relative" style={{ cursor: 'pointer' }}>
                        <div className="bg-light p-2 rounded-3 shadow me-3 text-center" style={{ width: '40px', height: '40px' }}>
                            <i className="fa-solid fa-flask-vial text-warning fs-5"></i>
                        </div>
                        <div>
                            <h6 className="mb-0 fw-bold text-dark">Ver pruebas solicitadas</h6>
                            <p className="text-muted m-0">Pruebas solicitadas de forma individual para cada especialidad</p>
                        </div>
                        {
                            store.test.filter(t => t.status == 'Solicitada').length > 0 &&
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                {store.test.filter(t => t.status == 'Solicitada').length}
                            </span>
                        }
                    </div>
                </Link>
                <Link className="text-decoration-none" to={'/tests/status/finalizado'}>
                    <div className="d-flex bg-white align-items-center p-3 rounded-3 bg-light action-btn-hover position-relative" style={{ cursor: 'pointer' }}>
                        <div className="bg-light p-2 rounded-3 shadow me-3 text-center" style={{ width: '40px', height: '40px' }}>
                            <i className="fa-solid fa-microscope text-success fs-5"></i>
                        </div>
                        <div>
                            <h6 className="mb-0 fw-bold text-dark">Ver pruebas finalizadas</h6>
                            <p className="text-muted m-0">Pruebas finalizadas de forma individual para cada especialidad</p>
                        </div>
                        {
                            store.test.filter(t => t.status == 'Finalizado').length > 0 &&
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                {store.test.filter(t => t.status == 'Finalizado').length}
                            </span>
                        }
                    </div>
                </Link>
                <Link className="text-decoration-none" to={'/patientsHistory'}>
                    <div className="d-flex bg-white align-items-center bg-white p-3 rounded-3 bg-light action-btn-hover" style={{ cursor: 'pointer' }}>
                        <div className="bg-light p-2 rounded-3 shadow me-3 text-center" style={{ width: '40px', height: '40px' }}>
                            <i className="fa-solid fa-box-archive text-secondary fs-5"></i>
                        </div>
                        <div>
                            <h6 className="mb-0 fw-bold text-dark">Ver historial de paciente</h6>
                            <p className="text-muted m-0">Historial de pacientes en ingresos anteriores</p>
                        </div>
                    </div>
                </Link>

            </div>
        </div>
    )
}