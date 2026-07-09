import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const RouteLayout = ({ userData, loadingUser }) => {
    return (
        <div>
            <Navbar userData={userData} loadingUser={loadingUser}/>
            <div className="container">
                <Outlet context={{userData, loadingUser}}/>
            </div>
        </div>
    )
}

export default RouteLayout