import React from "react";
import './LoginWarning.css'


const LoginWarning = ({warningTitle, warningMessage}) => {


    return (
        <div class="loginWarning">
            <h3>{warningTitle}</h3>
            <p>{warningMessage}</p>
        </div>
    )
}

export default LoginWarning