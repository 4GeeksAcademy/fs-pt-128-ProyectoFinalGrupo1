import image from "./Imagen login.png";
import icon from "../../assets/img/Logo.svg"
import "./Login.css";
import { useState } from "react";


export const Login = () => {

    const [visiblePassword, setVisiblePassword] = useState(false)
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

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!user.email || !user.password) {
            setError("Todos los campos son obligatorios")
        }
    }


    return (
        <>
            <div className="container d-flex justify-content-around mt-5" style={{ "color": "var(--primaryText)" }}>
                <div className="col-auto loginFormContainer d-flex flex-column text-center" style={{ "backgroundColor": "var(--cardBackground)" }}>
                    <div className="loginIconContainer mt-5">
                        <img src={icon} alt="logo" className="iconLogo" />
                    </div>
                    <h1>Bienvenido!</h1>
                    <p>Introduce tus datos</p>
                    {
                        error && (
                            <div className="alert alert-danger d-flex align-items-center justify-content-around fade-alert" role="alert">
                                {error} <i className="fa-solid fa-triangle-exclamation"></i>
                            </div>
                        )
                    }
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 w-75 loginInputs">
                            <input
                                type="email"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                                placeholder="Email"
                                className="form-control" id="InputEmail" aria-describedby="emailHelp" />
                            <div className="mb-3 mx-auto" style={{ height: '2px', backgroundColor: "var(--primaryText)", width: "95%" }}></div>
                        </div>
                        <div className="input-group mb-3 w-75 loginInputs">
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
                            <div className="mb-3 mx-auto" style={{ height: '2px', backgroundColor: "var(--primaryText)", width: "95%" }}></div>
                        </div>
                        <div className="formFooterLogin">
                            <div className="mb-3 form-check">
                                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                <label className="form-check-label" htmlFor="exampleCheck1">Recordar usuario</label>
                            </div>
                            <p>Olvidaste tu contraseña?</p>
                        </div>
                        <div className="d-flex flex-column w-75 loginButtons">
                            <button type="submit" className="btn btn-primary mt-2 mb-2 rounded-pill">Iniciar sesión</button>
                            <button className="btn btn-secondary mt-2 rounded-pill">Iniciar sesión con Email</button>
                        </div>

                    </form>

                </div>


                <div className="col-auto mt-4 imgLoginContainer ms-3">
                    <img src={image} alt="imagen del doctor" />
                </div>
            </div >


        </>
    );
}