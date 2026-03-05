import React, { useState } from "react"
import logo from "../assets/img/Logo.svg";
import { useNavigate } from "react-router-dom";
import { signup } from "../APIServices/BACKENDservices";

export const SignUpForm = () => {

    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const [showPwd, setShowPwd] = useState(false)
    const [showConfPwd, setShowConfPwd] = useState(false)
    const [user, setUser] = useState({
        "email": "",
        "password": "",
        "confirmPassword": ""
    })


    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        console.log(user);
        if (!user.email || !user.password) {
            setError("Todos los campos son obligatorios")
            return
        }
        if (user.password !== user.confirmPassword) {
            setError("Las contraseñas no coinciden")
            return
        }
        const response = await signup(user);
        if (response.error) {
            setError(response.error)
        }
        setUser({
            "email": "",
            "password": "",
            "confirmPassword": ""
        })
        navigate("/login")

    }

    return (
        <>
            <div className="text-center py-3">
                <img src={logo} alt="" style={{ height: "100px", width: "100px" }} />
                <div>
                    <h2>Registro en la plataforma!</h2>
                    <h5>Por favor introduzca sus datos</h5>
                </div>
            </div>
            {error && <div className="alert fade-alert alert-danger " role="alert">
                {error}
            </div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input type="email" name="email" placeholder="Email" onChange={handleChange} value={user.email} className="form-control" id="InputEmail" aria-describedby="emailHelp" />
                    <div className="mb-3 mx-auto" style={{ height: '2px', backgroundColor: "var(--primaryText)", width: "95%" }}></div>
                </div>
                <div className="mb-3">
                    <div className="input-group">
                        <input type={showPwd ? "text" : "password"} name="password" placeholder="Contraseña" onChange={handleChange} value={user.password} className="form-control" id="InputPassword" />
                        <button type="button" className="btn" onClick={() => setShowPwd(!showPwd)}>
                            <i className={showPwd ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"} />
                        </button>
                    </div>
                    <div className="mb-3 mx-auto" style={{ height: '2px', backgroundColor: "var(--primaryText)", width: "95%" }}></div>
                </div>
                <div className="mb-3">
                    <div className="input-group">
                        <input type={showConfPwd ? "text" : "password"} name="confirmPassword" placeholder="Confirme su contraseña" onChange={handleChange} value={user.confirmPassword} className="form-control" id="InputPassword2" />
                        <button type="button" className="btn" onClick={() => setShowConfPwd(!showConfPwd)}>
                            <i className={showConfPwd ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"} />
                        </button>
                    </div>
                    <div className="mb-3 mx-auto" style={{ height: '2px', backgroundColor: "var(--primaryText)", width: "95%" }}></div>
                </div>
                <div className="text-center my-3">
                    <button type="submit" className="btn btn-primary rounded-pill col-11 align-self-center mt-4">Enviar</button>
                </div>
            </form>
        </>
    )
}