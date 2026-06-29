import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import settingIcon from "../assets/setting_icon.png";
import "./Navbar.css"

const Navbar = () => {

    const navigate = useNavigate();

    const [allData, setAllData] = useState({});

    const fetchData = async () => {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/`, {
            credentials: 'include'
        });
        const data = await response.json();
        setAllData(data);
    }

    useEffect(() => {
        fetchData();
    }, [])


    return (
        <div className="navbar">
            {allData.userProfilePicture && (
                <img
                    className="profileImage"
                    src={allData.userProfilePicture}
                    alt="Profile"
                />
            )}
            <ul>
                {allData.username && (
                    <li>
                        <span className="welcomeText">
                            Hello, {allData?.username}
                        </span>
                    </li>
                )}
                <li><button onClick={() => navigate('/')}>home</button></li>
                <li><button onClick={() => navigate('/timetable')}>timetable</button></li>
                <li><button onClick={() => navigate('/calendar')}>calendar</button></li>

                {!allData.username && (
                    <li><button onClick={() => {
                        navigate('/login')
                    }}> Login</button></li>
                )}

                {allData.username && (
                    <li><button id="loginButton" onClick={() => {
                        window.location.href = `${import.meta.env.VITE_BACKEND_URL}/logout`
                    }}> Logout </button></li>
                )}

                {allData.username && (
                    <li><button id="settingIcon" onClick={() => {
                        navigate('/settings')
                    }}><img className="settingsImage" src={settingIcon} alt="settings"/></button></li>
                )}
            </ul>
        </div>
    )
}

export default Navbar