import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

const Calendar = () => {

    async function getMonthProgress() {
        const response = await fetch("http://localhost:8080/monthProgress", {credentials: 'include'})

        const data = await response.json();

        console.log(data)
    }

    useEffect(() => {
        getMonthProgress()
    }, [])

    return (
        <div></div>
    )
}

export default Calendar