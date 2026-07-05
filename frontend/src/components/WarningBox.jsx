import React from "react";
import './WarningBox.css'


const LoginWarning = ({warningTitle, warningMessage}) => {


    return (
        <div className="loginWarning">
            <h3>Warning: {warningTitle}</h3>
            <p>{warningMessage}</p>
        </div>
    )
}

export default LoginWarning