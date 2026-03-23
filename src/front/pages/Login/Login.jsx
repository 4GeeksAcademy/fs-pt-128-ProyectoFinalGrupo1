import image from "./Imagen login.png";
import icon from "../../assets/img/Logo.svg"
import "./Login.css";
import { useState } from "react";
import { login } from "../../APIServices/BACKENDservices";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../../hooks/useGlobalReducer";


export const Login = () => {
    const { store, dispatch } = useGlobalReducer()
    const [visiblePassword, setVisiblePassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const clickPassword = (e) => {

        setVisiblePassword(!visiblePassword)

    }

    const handleChange = (e) => {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
        setError("")

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!user.email || !user.password) {
            setError("Todos los campos son obligatorios")
            setLoading(false)
            return
        }
        setLoading(true)
        const response = await login(user, navigate, dispatch)
        setError(response.Error)
        setLoading(false)
    }



    return (
        <div style={{ maxHeight: "100vh" }}>
            <div className="border-bottom mt-1 d-flex align-items-center w-100 mb-4" style={{ height: '53px' }} >
                <i className="fa-solid fa-staff-snake align-middle fs-3 me-2"></i>
                <h2 className="title w-100 text-start m-0 align-middle fs-6">Sistema Médico</h2>
            </div>
            <div className="container d-flex justify-content-center">
                <div
                    className="container d-flex justify-content-center"
                    style={{
                        color: "var(--primaryText)",
                        backgroundColor: "transparent",
                        fontFamily: "var(--bs-body-font-family)",
                    }}>
                    <div
                        className="col-auto loginFormContainer d-flex flex-column text-center border shadow mt-4"
                        style={{
                            backgroundColor: "var(--cardBackground)"
                        }}>
                        <div className="loginIconContainer mt-5">
                            <i className="fa-solid fa-staff-snake align-middle"></i>
                        </div>
                        <h1>Bienvenido!</h1>
                        <p>Introduce tus datos</p>
                        {
                            error && (
                                <div className="container">
                                    <div className="alert alert-danger d-flex align-items-center justify-content-around fade-alert" role="alert">
                                        {error} <i className="fa-solid fa-triangle-exclamation"></i>
                                    </div>

                                </div>
                            )
                        }
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3 w-75 loginInputs shadow-sm border rounded">
                                <input
                                    type="email"
                                    name="email"
                                    value={user.email}
                                    onChange={handleChange}
                                    placeholder="Email"
                                    className="form-control" id="InputEmail" aria-describedby="emailHelp" />
                            </div>
                            <div className="input-group mb-3 w-75 loginInputs shadow-sm border rounded">
                                <input
                                    type={visiblePassword ? (
                                        "text"
                                    ) : (
                                        "password"
                                    )}
                                    className="form-control"
                                    name="password"
                                    value={user.password}
                                    onChange={handleChange}
                                    placeholder="Contraseña"
                                    aria-label="Contraseña"
                                    aria-describedby="button-addon2"
                                />
                                <button
                                    className="btn"
                                    type="button"
                                    id="button-addon2"
                                    onClick={clickPassword}
                                >{visiblePassword ? (
                                    <i className="fa-solid fa-eye-slash"></i>
                                ) : (
                                    <i className="fa-solid fa-eye"></i>
                                )}
                                </button>

                            </div>

                            <div className="d-flex flex-column w-75 loginButtons">
                                {loading ? (
                                    <button
                                        type="submit"
                                        className="btn btn-dark mt-2 mb-4"

                                        disabled
                                    ><div className="spinner-border" role="status"></div>
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        className="btn btn-dark mt-2 mb-4"

                                    >Iniciar Sesión
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div >
            </div>
        </div>
    );
}