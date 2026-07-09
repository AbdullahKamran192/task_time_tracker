import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import settingIcon from "../assets/setting_icon.png";
import "./Navbar.css"

const Navbar = ({ userData, loadingUser}) => {

    const navigate = useNavigate();

    console.log(userData)


    return (
        <div className="navbar">
            {userData?.userProfilePicture && (
                <img
                    className="profileImage"
                    src={userData?.userProfilePicture}
                    alt="Profile"
                />
            )}
            <ul>
                {userData?.username && (
                    <li>
                        <span className="welcomeText">
                            Hello, {userData?.username}
                        </span>
                    </li>
                )}
                <li><button onClick={() => navigate('/')}>home</button></li>
                <li><button onClick={() => navigate('/timetable')}>timetable</button></li>
                <li><button onClick={() => navigate('/calendar')}>calendar</button></li>

                {!loadingUser && !userData && (
                    <li><button onClick={() => {
                        navigate('/login')
                    }}> Login</button></li>
                )}

                {userData?.username && (
                    <li><button id="loginButton" onClick={() => {
                        window.location.href = `${import.meta.env.VITE_BACKEND_URL}/logout`
                    }}> Logout </button></li>
                )}

                {userData?.username && (
                    <li><button id="settingIcon" onClick={() => {
                        navigate('/settings')
                    }}><img className="settingsImage" src={settingIcon} alt="settings"/></button></li>
                )}
            </ul>
        </div>
    )
}

export default Navbar