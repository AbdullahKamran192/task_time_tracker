import React, {useEffect} from "react";
import './MessageBox.css'


const MessageBox = ({messageTitle, message}) => {

    useEffect(() => {
        const timer = setTimeout(() => {
            document.getElementById("messageBox").style.animation =
                "fadeOut 1s ease forwards";
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div id="messageBox" className="messageBox">
            <h3>Message: {messageTitle}</h3>
            <p>{message}</p>
        </div>
    )
}

export default MessageBox