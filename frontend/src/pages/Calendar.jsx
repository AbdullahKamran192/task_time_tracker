import { useState, useEffect } from "react";
import CalendarMonth from "../components/CalendarMonth";
import "./Calendar.css";
import WarningBox from "../components/WarningBox";

const Calendar = ({userData}) => {

    const [calendarDataLoaded, setCalendarDataLoaded] = useState(false);
    const [error, setError] = useState(null)


    // Task Time Limit

    const [taskLimits, setTaskLimits] = useState([]);

    async function getTaskLimits() {

        try {
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/tasksLimit`,
                { credentials: "include" }
            );
    
            const data = await response.json();
            setTaskLimits(data);

        } catch (err) {
            setError(err.message)
        }
    }

    useEffect(() => {

        if (userData) {
            getMonthProgress();
            getTaskLimits();
        } else {
            setCalendarDataLoaded(true)
        }


    }, []);

    // Backend Tasks Data Received.

    const [receivedData, setReceivedData] = useState({
        dailyTotals: {},
        dailyFirstTask: {}
    });


    async function getMonthProgress() {

        try {
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/monthProgress`,
                {
                    credentials: "include"
                }
            );
    
            const data = await response.json();
    
            setReceivedData(data);
            setCalendarDataLoaded(true)

        } catch (err) {
            setError(err.message)
        }

    }

    const currentYear = new Date().getFullYear();

    return (

        <div className="calendarPage">

            { error && <WarningBox warningTitle={error}/>}

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