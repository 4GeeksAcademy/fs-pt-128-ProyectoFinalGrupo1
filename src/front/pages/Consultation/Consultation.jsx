export const Consultation = () => {
    return (
        <div> 
            <h1 className="fs-2 text-center mt-3">Consulta</h1>
            <div className="container mt-4">
                <form>
                    <fieldset className="mb-2 mt-2">
                        <legend>
                            Datos del paciente
                        </legend>
                    </fieldset>
                    <div className="row">
                        <div className="col-12 col-md-2 mb-3">
                            <label htmlFor="dni"
                                className="form-label">
                                Dni
                            </label>
                            <input type="text"
                                className="form-control rounded-pill"
                                id="dni" />
                        </div>
                        <div className="col-12 col-md-4 mb-3" >
                            <label htmlFor="nombre"
                                className="form-label">
                                Nombre
                            </label>
                            <input type="text"
                                className="form-control rounded-pill"
                                id="nombre" />
                        </div>
                        <div className="col-12 col-md-4 mb-3" >
                            <label htmlFor="apellidos"
                                className="form-label">
                                Apellidos
                            </label>
                            <input type="text"
                                className="form-control rounded-pill"
                                id="apellidos" />
                        </div>
                        <div className="col-12 col-md-2 mb-3" >
                            <label htmlFor="edad"
                                className="form-label">
                                Edad
                            </label>
                            <input type="text"
                                className="form-control rounded-pill"
                                id="edad" />
                        </div>
                        <div className="col-12 mb-3" >
                            <label htmlFor="edad"
                                className="form-label">
                                Alergias
                            </label>
                            <input type="text"
                                className="form-control rounded-pill"
                                id="edad" />
                        </div>
                    </div>
                    <fieldset className="mb-2 mt-2">
                        <legend>
                            Motivo consulta
                        </legend>
                    </fieldset>
                    <div className="bg-light rounded-pill">
                        <p className="m-0 p-2 ">Motivo de la consulta</p>
                    </div>
                    <fieldset className="mb-2 mt-2">
                        <legend>
                            Valoracion de triaje realizada por: Enfermero
                        </legend>
                    </fieldset>
                    <div className="bg-light rounded-pill">
                        <p className="m-0 p-2 ">Valoracion de triaje</p>
                    </div>
                    <fieldset className="mb-2 mt-2">
                        <legend>
                            Diagnostico
                        </legend>
                    </fieldset>
                    <div className="mb-4">
                        <label htmlFor="razonDeConsulta" className="form-label">
                            Diagnostico y tratamiento
                        </label>
                        <textarea
                            className="form-control rounded-4 p-3"
                            name="reason_consultation"
                            id="razonDeConsulta"
                            rows="4"
                        ></textarea>
                    </div>
                </form>
            </div>
        </div>
    )
}