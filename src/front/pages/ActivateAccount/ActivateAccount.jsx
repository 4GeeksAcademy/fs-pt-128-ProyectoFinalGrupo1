import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import logo from "../../pages/Login/logo_Medicina.png"
import { activateCount } from "../../APIServices/BACKENDservices";
import './ActivateAccount.css'


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
        navigate("/")

    }

    useEffect(() => {
        if (!token) {
            setStatus("error");
            return;
        }

    }, [token, navigate]);

    return (
        <div className="container-fluid d-flex flex-column justify-content-center align-items-center bg-white" style={{ maxHeight: '100vh' }}>
            <div className="border-bottom mt-1 d-flex align-items-center w-100 mb-4" style={{ height: '53px' }} >
                <i className="fa-solid fa-staff-snake align-middle fs-3"></i>
                <h2 className="title w-100 text-start m-0 align-middle fs-6">Sistema Médico</h2>
            </div>
            <div className="d-flex flex-column align-items-center justify-content-center bg-light shadow rounded bg-color mt-3 mb-3 rounded g-1"
                style={{ height: 'auto', width: "400px", minHeight: '65vh' }}>
                <div className="text-center align-start mb-4 top-0" style={{ height: 'auto', minHeight: '100%' }} >
                    <i className="fa-solid fa-staff-snake align-middle mb-2" style={{ fontSize: '60px' }}></i>
                    <h2>Activación de la cuenta</h2>
                    <h5>Por favor introduzca su contraseña</h5>
                </div>
                {error && <div className="alert fade-alert alert-danger " role="alert">
                    {error}
                </div>}
                <form onSubmit={handleSubmit} style={{ height: 'auto' }}>
                    <div className="mb-3">
                        <div className="input-group border rounded shadow-sm">
                            <input type={showPwd ? "text" : "password"} name="password" placeholder="Contraseña" onChange={handleChange} value={user.password} className="form-control" id="InputPassword" />
                            <button type="button" className="btn" onClick={() => setShowPwd(!showPwd)}>
                                <i className={showPwd ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"} />
                            </button>
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className="input-group border rounded shadow-smborder rounded shadow-sm">
                            <input type={showConfPwd ? "text" : "password"} name="confirmPassword" placeholder="Confirme su contraseña" onChange={handleChange} value={user.confirmPassword} className="form-control " id="InputPassword2" />
                            <button type="button" className="btn" onClick={() => setShowConfPwd(!showConfPwd)}>
                                <i className={showConfPwd ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"} />
                            </button>
                        </div>
                    </div>
                    <div className="text-center my-3">
                        <button type="submit" className="btn btn-dark col-11 align-self-center mt-4">Cofirmar</button>
                    </div>
                </form>
            </div>
        </div>


    )
};