import React, { useState, useEffect } from "react";
import "./Login.css"
import googleLogo from "../assets/google.png";

const Login = () => {

    return (
        <div className="loginPage">
            <div className="loginContainer">
                <div className="loginForm">
                    <h1>Use your Google account</h1>
                    <button
                        onClick={() => {
                            window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/google`;
                        }}
                    >
                        <img
                            id="googleLogo"
                            src={googleLogo}
                            alt="Google"
                        />

                        <span>Login with Google</span>

                    </button>
                    <p>Secure login - we never see your password</p>
                </div>
                <div className="informationBox">
                    <h1>Track your time smarter</h1>
                    <p>This website helps you track tasks, monitor time spent and understand where your productivity goes.</p>
                    <p>✔ Start and stop task timers</p>
                    <p>✔ Log completed work</p>
                    <p>✔ Track wasted time</p>
                    <p>✔ improve focus and productivity</p>
                    <p>Built for students, developers, and anyone who wants better time awareness</p>
                </div>
            </div>
        </div>
    )
}

export default Login