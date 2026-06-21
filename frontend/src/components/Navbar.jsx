import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

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
            <img src={allData?.userProfilePicture} alt="logo"></img>
            <ul>
                <li>Home</li>
                <li>Tasks</li>
            </ul>
            <p>Hello {allData?.username}</p>
            <button onClick={() => navigate('/about')}>Get Started</button>
            <button onClick={() => {
                navigate('/login')
            }}> Login</button>
            <button onClick={() => {
                window.location.href = "http://localhost:8080/logout"
            }}> Logout </button>
        </div>
    )
}

export default Navbar