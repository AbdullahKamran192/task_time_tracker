import "./CalendarMonth.css";
import React from "react";
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

function dayBoxTotalTimeColor(dailyTotal) {

    switch(true) {
        case dailyTotal === 0:
            return "gray";
            break;
        case dailyTotal >= 480:
            return "darkgreen";
            break;
        case dailyTotal >= 390:
            return "green";
            break;
        case dailyTotal >= 300:
            return "#faf47d";
            break;
        case dailyTotal >= 180:
            return "#faaa5a";
            break;
        default:
            return "#fc5f53";
    }
}

const CalendarMonth = ({
    month,
    year,
    dailyTotals,
    dailyFirstTask
}) => {

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
                    length: daysInMonth
                }).map((_, index) => {

                    const day = index + 1;

                    const key =
                        `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

                    return (

                        <div
                            key={day}
                            className="dayBox"
                            style={{backgroundColor: dayBoxTotalTimeColor(dailyTotals[key])}}
                            onClick={() => {navigate(`/timetable?date=${String(day).padStart(2, "0")}/${String(month + 1).padStart(2, "0")}/${year}#loadTimetablePageTo`)}}
                        >

                            <div className="dayNumber">
                                {day}
                            </div>

                            <div className="taskName">
                                <b>{dailyFirstTask[key]}</b>
                            </div>

                            <div className="timeSpent">

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