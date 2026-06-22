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
                <li><p style={{color: "white"}}>Hello {allData?.username}</p></li>
                <li><button onClick={() => navigate('/about')}>Get Started</button></li>
                <li><button onClick={() => {
                    navigate('/login')
                }}> Login</button></li>
                <li><button onClick={() => {
                    window.location.href = "http://localhost:8080/logout"
                }}> Logout </button></li>
            </ul>
        </div>
    )
}

export default Navbar