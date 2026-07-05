import { useState, useEffect } from "react";
import CalendarMonth from "../components/CalendarMonth";
import "./Calendar.css";

const Calendar = () => {

    const [calendarDataLoaded, setCalendarDataLoaded] = useState(false);


    // Task Time Limit

    const [taskLimits, setTaskLimits] = useState([]);

    async function getTaskLimits() {
        const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/tasksLimit`,
            { credentials: "include" }
        );

        const data = await response.json();
        setTaskLimits(data);
    }

    useEffect(() => {
        getMonthProgress();
        getTaskLimits();
    }, []);

    // Backend Tasks Data Received.

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

        setReceivedData(data);
        setCalendarDataLoaded(true)
    }

    const currentYear = new Date().getFullYear();

    return (

        <div className="calendarPage">

            {!calendarDataLoaded && (
                <div className="loader"></div>
            )}
    
            {calendarDataLoaded && (
                <div className="calendarActivePage">
        
                    {Array.from({ length: 12 }).map((_, month) => (
        
                        <CalendarMonth
                            key={month}
                            month={month}
                            year={currentYear}
                            dailyTotals={receivedData.dailyTotals}
                            dailyFirstTask={receivedData.dailyFirstTask}
                            taskLimits={taskLimits}
                        />
        
                    ))}
        
                </div>
            )}
        </div>



    );

};

export default Calendar;