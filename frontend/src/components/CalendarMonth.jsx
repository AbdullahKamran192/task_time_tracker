import "./CalendarMonth.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function formatMinutes(minutes) {
    if (!minutes)
        return "";

    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hrs === 0)
        return `${mins} min`;

    return `${hrs}h ${mins}m`;
}


const CalendarMonth = ({
    month,
    year,
    dailyTotals,
    dailyFirstTask
}) => {

    const [taskLimits, setTaskLimits] = useState([])

    async function getTaskTimeLimits() {
        const response = await fetch(
            "http://localhost:8080/tasksLimit", { credentials: "include" }
        );

        const data = await response.json();

        console.log("===================================")
        console.log(data)
        console.log("=================================")

        setTaskLimits(data);
    }

    useEffect(() => {
        getTaskTimeLimits();
    }, [])
    
    function dayBoxTotalTimeColor(dailyTotal) {

        if (dailyTotal == null || dailyTotal == 0) {
            return "lightgray";
        }

        if (dailyTotal >= taskLimits[0].minutes) {
            return taskLimits[0].colour; // dark green
        }

        if (dailyTotal >= taskLimits[1].minutes) {
            return taskLimits[1].colour // limegreen
        }

        if (dailyTotal >= taskLimits[2].minutes) {
            return taskLimits[2].colour // yellow
        }

        if (dailyTotal >= taskLimits[3].minutes) {
            return taskLimits[3].colour; //orange
        }

        return taskLimits[4].colour;          // red
    }

    const navigate = useNavigate()

    const monthName = new Date(
        year,
        month
    ).toLocaleString("default", {
        month: "long"
    });

    const daysInMonth =
        new Date(
            year,
            month + 1,
            0
        ).getDate();

    const firstDay = new Date(year, month, 1);
    //console.log(`year ${year} and month ${month} and first day ${firstDay.getDay()}`)


    const offSet = () => {
        if (firstDay.getDay() > 0) {
            return firstDay.getDay() - 1;
        } else {
            return 6; // sunday at the end
        }
    }

    // console.log("+++++++++++++++++++++++++++")
    // console.log(firstDay.getDay())
    // console.log("=========================")
    // console.log(`${firstDay.getDate()}-${firstDay.getMonth()}-${firstDay.getFullYear()}`)


    return (

        <div className="monthBox">

            <div className="monthHeader">

                <h1>
                    {monthName} {year}
                </h1>

            </div>

            <div className="weekHeader">
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
                <div>Sun</div>
            </div>

            <div className="daysContainer">

                {Array.from({
                    length: offSet()
                }).map((_, index) => {
                    return (
                        <div key={index}></div>
                    )
                })}

                {Array.from({
                    length: daysInMonth
                }).map((_, index) => {

                    const day = index + 1;

                    const key =
                        `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

                    return (

                        <div
                            key={day}
                            className="dayBox"
                            style={{ backgroundColor: dayBoxTotalTimeColor(dailyTotals[key]) }}
                            onClick={() => { navigate(`/timetable?date=${String(day).padStart(2, "0")}/${String(month + 1).padStart(2, "0")}/${year}#loadTimetablePageTo`) }}
                        >

                            <div className="dayNumber">
                                {day}
                            </div>

                            <div className="taskName">
                                {dailyFirstTask[key] && (
                                    <div style={{color: dayBoxTotalTimeColor(dailyTotals[key]) == "darkgreen" ? "white" : "black"}}>
                                        <b>●{dailyFirstTask[key]}</b><br />
                                        <b>●.....</b>
                                    </div>

                                )}
                            </div>

                            <div className="timeSpent" style={{ color: dayBoxTotalTimeColor(dailyTotals[key]) == "yellow" ? "black" : "white" }}>

                                {formatMinutes(
                                    dailyTotals[key]
                                )}

                            </div>

                        </div>

                    );

                })}

            </div>

        </div>

    );

};

export default CalendarMonth;