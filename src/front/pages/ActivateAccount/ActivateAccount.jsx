import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import logo from "../../pages/Login/logo_Medicina.png"
import icon from "../../assets/img/Signup/signup_image.png"
import { activateCount } from "../../APIServices/BACKENDservices";


export const ActivateAccount = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const [status, setStatus] = useState("verifying");
    const navigate = useNavigate();
    const [error, setError] = useState(null)
    const [showPwd, setShowPwd] = useState(false)
    const [showConfPwd, setShowConfPwd] = useState(false)
    const [user, setUser] = useState({
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
        if (!user.password.trim()) {
            setError("Todos los campos son obligatorios")
            return
        }
        if (user.password.length < 8) {
            setError("La contraseña debe tener minimo 8 caracteres")
            return
        }
        if (user.password !== user.confirmPassword) {
            setError("Las contraseñas no coinciden")
            return
        }
        const response = await activateCount(user.password, token)
        if (response.error) {
            setError(response.error)
            return
        }
        navigate("/login")

    }

    useEffect(() => {
        if (!token) {
            setStatus("error");
            return;
        }

    }, [token, navigate]);

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="text-center mx-3" style={{ maxHeight: '70vh' }}>
                <img src={icon} className="img-fluid" alt="Medicos" style={{ minHeight: '70vh' }} />
            </div>
            <div className="d-flex flex-column align-items-center justify-content-center p-4 rounded position-relative"
                style={{ backgroundColor: "var(--cardBackground)", minHeight: '60vh', width: "400px" }}>
                <div className="text-center py-5 position-absolute top-0" >
                    <img src={logo} alt="RegisterImage" style={{ height: "100px", width: "100px" }} />
                    <div>
                        <h2>Registro en la plataforma!</h2>
                        <h5>Por favor introduzca su contraseña</h5>
                    </div>
                </div>
                {error && <div class="alert fade-alert alert-danger " role="alert">
                    {error}
                </div>}
                <form onSubmit={handleSubmit} className="position-absolute top-50 start-0 end-0">
                    <div className="mb-3">
                        <div className="input-group">
                            <input type={showPwd ? "text" : "password"} name="password" placeholder="Contraseña" onChange={handleChange} value={user.password} className="form-control" id="InputPassword" />
                            <button type="button" className="btn" onClick={() => setShowPwd(!showPwd)}>
                                <i class={showPwd ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"} />
                            </button>
                        </div>
                        <div className="mb-3 mx-auto" style={{ height: '2px', backgroundColor: "var(--primaryText)", width: "95%" }}></div>
                    </div>
                    <div className="mb-3">
                        <div className="input-group">
                            <input type={showConfPwd ? "text" : "password"} name="confirmPassword" placeholder="Confirme su contraseña" onChange={handleChange} value={user.confirmPassword} className="form-control" id="InputPassword2" />
                            <button type="button" className="btn" onClick={() => setShowConfPwd(!showConfPwd)}>
                                <i class={showConfPwd ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"} />
                            </button>
                        </div>
                        <div className="mb-3 mx-auto" style={{ height: '2px', backgroundColor: "var(--primaryText)", width: "95%" }}></div>
                    </div>
                    <div className="text-center my-3">
                        <button type="submit" className="btn btn-primary rounded-pill col-11 align-self-center mt-4">Enviar</button>
                    </div>
                </form>
            </div>
        </div >

    )
};