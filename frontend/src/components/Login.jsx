import React, {useState, useEffect} from "react";

const Login = () => {

    return (
        <div>
            <button onClick={() => {
                window.location.href = "http://localhost:8080/auth/google";
            }}> Login with Google </button>
        </div>
    )
}

export default Login