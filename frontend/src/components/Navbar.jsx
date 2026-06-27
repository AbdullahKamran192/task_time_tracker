import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css"

const Navbar = () => {

    const navigate = useNavigate();

    const [allData, setAllData] = useState({});

    const fetchData = async () => {
        const response = await fetch("http://localhost:8080/", {
            credentials: 'include'
        });
        const data = await response.json();
        console.log(data)
        setAllData(data);
    }

    useEffect(() => {
        fetchData();
    }, [])


    return (
        <div className="navbar">
            {allData.userProfilePicture && (
                <img
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
                        window.location.href = "http://localhost:8080/logout"
                    }}> Logout </button></li>
                )}
            </ul>
        </div>
    )
}

export default Navbar