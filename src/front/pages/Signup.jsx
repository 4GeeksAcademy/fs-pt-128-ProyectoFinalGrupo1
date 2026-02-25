import React from "react";
import image from "../assets/img/Signup/signup_image.png"
import { SignUpForm } from "../components/SignUpForm";

export const Signup = () => {

    return (
        <>
            <div className="container">
                <div className="row">

                    <div className="col-7 text-center">
                        <img src={image} className="img-fluid" alt="Rigo Baby" />

                    </div>
                    <div className="col-5 rounded-4" style={{ backgroundColor: "var(--cardBackground)" }}>
                        <SignUpForm />
                    </div>
                </div>

            </div>
        </>
    )

}