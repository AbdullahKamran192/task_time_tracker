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
            `${import.meta.env.VITE_BACKEND_URL}/monthProgress`,
            {
                credentials: "include"
            }
        );

        const data = await response.json();

        console.log(data)

        setReceivedData(data);
    }

    useEffect(() => {
        getMonthProgress();
    }, []);

    const currentYear = new Date().getFullYear();

    return (

        <div className="calendarPage">

            {Array.from({ length: 12 }).map((_, month) => (

                <CalendarMonth
                    key={month}
                    month={month}
                    year={currentYear}
                    dailyTotals={receivedData.dailyTotals}
                    dailyFirstTask={receivedData.dailyFirstTask}
                />

            ))}

        </div>

    );

};

export default Calendar;