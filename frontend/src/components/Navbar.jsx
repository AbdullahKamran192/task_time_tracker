import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

    const navigate = useNavigate();

    return (
        <div className="navbar">
            <img src="" alt="logo"></img>
            <ul>
                <li>Home</li>
                <li>Tasks</li>
            </ul>
            <button onClick={() => navigate('/about')}>Get Started</button>
        </div>
    )
}

export default Navbar