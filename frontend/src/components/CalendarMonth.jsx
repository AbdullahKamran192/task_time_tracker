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

    if(dailyTotal == null) {
        return "lightgray"
    }

    switch(true) {
        case dailyTotal >= 480:
            return "darkgreen";
        case dailyTotal >= 390:
            return "green";
        case dailyTotal >= 300:
            return "#faf47d";
        case dailyTotal >= 180:
            return "#faaa5a";
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

    const firstDay = new Date(year, month, 1);
    console.log(`year ${year} and month ${month} and first day ${firstDay.getDay()}`)


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
                            style={{backgroundColor: dayBoxTotalTimeColor(dailyTotals[key])}}
                            onClick={() => {navigate(`/timetable?date=${String(day).padStart(2, "0")}/${String(month + 1).padStart(2, "0")}/${year}#loadTimetablePageTo`)}}
                        >

                            <div className="dayNumber">
                                {day}
                            </div>

                            <div className="taskName">
                                <b>●{dailyFirstTask[key]}</b><br/>
                                <b>●.....</b>
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