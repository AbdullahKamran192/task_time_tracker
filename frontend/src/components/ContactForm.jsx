import React from "react";

const ContactForm = () => {
    return (
        <div>
            <form>
                <input type="text" placeholder="Name"></input> <br/>
                <input type="email" placeholder="Email"></input> <br/>
                <textare placeholder="message"></textare> <br />
                <button type="submit">submit</button>
            </form>
        </div>
    )
}

export default ContactForm