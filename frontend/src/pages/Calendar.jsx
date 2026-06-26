import { useState, useEffect } from "react";
import CalendarMonth from "../components/CalendarMonth";
import "./Calendar.css";

const Calendar = () => {

    const [receivedData, setReceivedData] = useState({
        dailyTotals: {},
        dailyFirstTask: {}
    });

    async function getMonthProgress() {

        const response = await fetch(
            "http://localhost:8080/monthProgress",
            {
                credentials: "include"
            }
        );

        const data = await response.json();

        setReceivedData(data);

    }

    useEffect(() => {

        getMonthProgress();

    }, []);

    return (

        <div className="calendarPage">

            <CalendarMonth
                month={5}
                year={2026}
                dailyTotals={receivedData.dailyTotals}
                dailyFirstTask={receivedData.dailyFirstTask}
            />
        </div>

    );

};

export default Calendar;