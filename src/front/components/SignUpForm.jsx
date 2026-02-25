import React from "react"
import logo from "../assets/img/Logo.svg";

export const SignUpForm = () => {
    return (
        <>
            <div className="text-center">
                <img src={logo} alt="" style={{ height: "100px", width: "100px", color: "#000" }} />
                <div>
                    <h2>Registration to the platform!</h2>
                    <h5>Please entrer your details</h5>
                </div>
            </div>
            <form>

                <div className="mb-3">
                    <input type="email" placeholder="Email" className="form-control" id="InputEmail" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <input type="text" placeholder="Password" className="form-control" id="InputPassword" />
                </div>
                <div className="mb-3">
                    <input type="text" placeholder="Repeat your password" className="form-control" id="InputPassword2" />
                </div>
                <div className="mb-3 text">
                    {/* Aqui falta por meter la URL del login cuando esté creado */}
                    Do you have already have an account? <a className="text" href="http://">Log In</a>
                </div>

                <div className="text-center">
                    <button type="submit" className="btn btn-primary rounded-pill col-11 align-self-center">Sign Up</button>
                </div>
            </form>
        </>
    )
}