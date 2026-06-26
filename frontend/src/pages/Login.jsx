import React, { useState, useEffect } from "react";
import "./Login.css"

const Login = () => {

    return (
        <div className="loginPage">
            <div className="loginForm">
                <button onClick={() => {
                    window.location.href = "http://localhost:8080/auth/google";
                }}> Login with Google </button>
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
    )
}

export default Login