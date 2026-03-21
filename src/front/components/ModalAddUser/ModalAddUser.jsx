import { useState } from "react"
import { useRef } from "react"
import { getUser, registerUser } from "../../APIServices/BACKENDservices";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import { SpinnerButton } from "../Spinner/SpinnerButton";

export const ModalAddUser = () => {
    const navigate = useNavigate()
    const { store, dispatch } = useGlobalReducer()
    const closeBtnRef = useRef(null)
    const [user, setUser] = useState({
        "firstname": "",
        "lastname": "",
        "rol": "",
        "email": ""
    });
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const handlerChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
        setError("")
    }

    const handlerSubmit = async (e) => {
        e.preventDefault()
        if (!user.firstname || !user.lastname || !user.rol || !user.email) {
            setError("Todos los campos son obligatorios")
            setLoading(false)
            return
        }
        setLoading(true)
        const response = await registerUser(user)
        if (response && !response.error) {
            await getUser(dispatch)
            closeBtnRef.current.click()
            setUser({
                "firstname": "",
                "lastname": "",
                "rol": "",
                "email": ""
            })
            setError("")
        } else {
            setError(response.error)
        }
        setLoading(false)
    }


    return (
        <div className="text-end mb-3">
            <button type="button" className="btn btn-primary " data-bs-toggle="modal" data-bs-target="#exampleModal">
                Agregar
                <i className="fa-solid fa-user-plus ms-2"></i>
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Registro nuevo usuario</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form className="modal-body text-start" onSubmit={handlerSubmit}>
                            {
                                error && (
                                    <div className="alert alert-danger d-flex align-items-center justify-content-around fade-alert" role="alert">
                                        {error} <i className="fa-solid fa-triangle-exclamation"></i>
                                    </div>
                                )
                            }
                            <div className="d-flex flex-column p-3 mt-0">
                                <div className="input-group mb-3">
                                    <span className="input-group-text border shadow-sm"
                                        id="basic-addon1">
                                        <i className="fa-solid fa-address-card"></i>
                                    </span>
                                    <input type="text"
                                        className="form-control border shadow-sm"
                                        placeholder="Nombre"
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                        name="firstname"
                                        value={user.firstname}
                                        onChange={handlerChange} />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text border shadow-sm"
                                        id="basic-addon1">
                                        <i className="fa-solid fa-address-card"></i>
                                    </span>
                                    <input type="text"
                                        className="form-control border shadow-sm"
                                        placeholder="Apellidos"
                                        aria-label="lastname"
                                        aria-describedby="basic-addon1"
                                        name="lastname"
                                        value={user.lastname}
                                        onChange={handlerChange} />
                                </div>
                                <select className="form-select mb-3 border shadow-sm"
                                    aria-label="Default select example"
                                    name="rol"
                                    value={user.rol}
                                    onChange={handlerChange}>
                                    <option defaultValue>Seleccione un rol</option>
                                    <option value="Médico">Médico</option>
                                    <option value="Enfermero">Enfermero</option>
                                    <option value="Administrativo">Administrativo</option>
                                    <option value="Técnico">Técnico</option>
                                </select>
                                <div className="input-group mb-3">
                                    <span className="input-group-text border shadow-sm"
                                        id="basic-addon1">
                                        @
                                    </span>
                                    <input type="email"
                                        className="form-control border shadow-sm"
                                        placeholder="Email"
                                        aria-label="Email"
                                        aria-describedby="basic-addon1"
                                        name="email"
                                        value={user.email}
                                        onChange={handlerChange} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" ref={closeBtnRef} data-bs-dismiss="modal">Cerrar</button>
                                {loading ? (
                                    <button
                                        type="submit"
                                        className="btn btn-dark mt-2 mb-2 d-flex"

                                        disabled
                                    ><SpinnerButton text={"Enviando"}></SpinnerButton>
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        className="btn btn-dark mt-2 mb-2 "
                                    >
                                        Notificar
                                        <i className="fa-solid fa-envelope ms-2"></i>
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}