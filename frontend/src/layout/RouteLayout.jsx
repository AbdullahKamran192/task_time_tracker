import React from "react";
import Navbar from "../components/navbar";
import { Outlet } from "react-router-dom";

const RouteLayout = () => {
    return (
        <div>
            <Navbar />
            <div className="container">
                <Outlet />
            </div>
        </div>
    )
}

export default RouteLayout