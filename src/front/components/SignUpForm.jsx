import React from "react"
import logo from "../assets/img/Logo.svg";

export const SignUpForm = () => {
    return (
        <>
            <div className="text-center py-3">
                <img src={logo} alt="" style={{ height: "100px", width: "100px", color: "#000" }} />
                <div>
                    <h2>Registration to the<br/>platform!</h2>
                    <h5>Please entrer your details</h5>
                </div>
            </div>
            <form>

                <div className="mb-3">
                    <input type="email" placeholder="Email" className="form-control" id="InputEmail" aria-describedby="emailHelp" />
                    <div className="mb-3 mx-auto" style={{ height: '2px', backgroundColor: "var(--primaryText)", width: "95%" }}></div>
                </div>
                <div className="mb-3">
                    <input type="text" placeholder="Password" className="form-control" id="InputPassword" />
                    <div className="mb-3 mx-auto" style={{ height: '2px', backgroundColor: "var(--primaryText)", width: "95%" }}></div>
                </div>
                <div className="mb-3">
                    <input type="text" placeholder="Repeat your password" className="form-control" id="InputPassword2" />
                    <div className="mb-3 mx-auto" style={{ height: '2px', backgroundColor: "var(--primaryText)", width: "95%" }}></div>
                </div>
                <div className="mb-3 text mt-4" style={{paddingInline: "12px"}}>
                    {/* Aqui falta por meter la URL del login cuando esté creado */}
                    Do you have already have an account? <a className="text" href="http://">Log In</a>
                </div>

                <div className="text-center my-3">
                    <button type="submit" className="btn btn-primary rounded-pill col-11 align-self-center mt-4">Sign Up</button>
                </div>
            </form>
        </>
    )
}