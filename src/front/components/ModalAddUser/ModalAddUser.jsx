export const ModalAddUser = () => {
    return (
        <div className="text-end mb-3">
            <button type="button" className="btn btn-primary " data-bs-toggle="modal" data-bs-target="#exampleModal">
                Agregar
                <i className="fa-solid fa-user-plus ms-2"></i>
            </button>

            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Registro nuevo usuario</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body text-start">
                            <div className="d-flex flex-column p-3 mt-0">
                                <div class="input-group mb-3">
                                     <span class="input-group-text"
                                        id="basic-addon1">
                                        <i class="fa-solid fa-address-card"></i>
                                    </span>
                                    <input type="text"
                                        class="form-control"
                                        placeholder="Nombre"
                                        aria-label="Username"
                                        aria-describedby="basic-addon1" />
                                </div>
                                <div class="input-group mb-3">
                                     <span class="input-group-text"
                                        id="basic-addon1">
                                        <i class="fa-solid fa-address-card"></i>
                                    </span>
                                    <input type="text"
                                        class="form-control"
                                        placeholder="Apellidos"
                                        aria-label="Username"
                                        aria-describedby="basic-addon1" />
                                </div>
                                <select class="form-select mb-3" aria-label="Default select example">
                                    <option selected>Seleccione un rol</option>
                                    <option value="1">Médico</option>
                                    <option value="2">Enfermero</option>
                                    <option value="3">Administrativo</option>
                                </select>
                                <div class="input-group mb-3">
                                    <span class="input-group-text" 
                                    id="basic-addon1">
                                        @
                                    </span>
                                    <input type="text"
                                        class="form-control"
                                        placeholder="Email"
                                        aria-label="Username"
                                        aria-describedby="basic-addon1" />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            <button type="button" className="btn btn-primary">
                                Notificar
                                <i className="fa-solid fa-envelope ms-2"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}