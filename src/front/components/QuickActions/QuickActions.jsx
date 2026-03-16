export const QuickActions = () => {
    return (
        <div className="border-0 p-3  rounded-4">
            <div className="d-flex flex-column gap-3">
                {/* Botón Buscar */}
                <div className="d-flex bg-white align-items-center bg-white p-3 rounded-3 bg-light action-btn-hover" style={{ cursor: 'pointer' }}>
                    <div className="bg-light p-2 rounded-3 shadow me-3">
                        <i className="fa-solid fa-magnifying-glass text-primary fs-5"></i>
                    </div>
                    <div>
                        <h6 className="mb-0 fw-bold">Buscar Paciente</h6>
                        <p className="text-muted m-0">Por nombre o DNI</p>
                    </div>
                </div>

                {/* Botón Siguiente Tarea */}
                <div className="d-flex bg-white align-items-center p-3 rounded-3 bg-light action-btn-hover" style={{ cursor: 'pointer' }}>
                    <div className="bg-light p-2 rounded-3 shadow me-3">
                        <i className="fa-solid fa-forward-step text-success fs-5"></i>
                    </div>
                    <div className="d-flex flex-column justify-content-center">
                        <h6 className="mb-0 fw-bold">Siguiente Tarea</h6>
                        <p className="text-muted m-0">Ir al siguiente paciente</p>
                    </div>
                </div>
                <div className="d-flex bg-white align-items-center p-3 rounded-3 bg-light action-btn-hover" style={{ cursor: 'pointer' }}>
                    <div className="bg-light p-2 rounded-3 shadow me-3">
                        <i className="fa-solid fa-forward-step text-danger fs-5"></i>
                    </div>
                    <div>
                        <h6 className="mb-0 fw-bold">Siguiente Tarea</h6>
                        <p className="text-muted m-0">Ir a la más urgente</p>
                    </div>
                </div>

                {/* Botón Pendientes de Envío con Badge */}
                <div className="d-flex bg-white align-items-center p-3 rounded-3 bg-light action-btn-hover position-relative" style={{ cursor: 'pointer' }}>
                    <div className="bg-light p-2 rounded-3 shadow me-3">
                        <i className="fa-solid fa-paper-plane text-warning fs-5"></i>
                    </div>
                    <div>
                        <h6 className="mb-0 fw-bold">Bandeja de Salida</h6>
                        <p className="text-muted m-0">4 informes listos</p>
                    </div>
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        4
                    </span>
                </div>
            </div>
        </div>
    )
}