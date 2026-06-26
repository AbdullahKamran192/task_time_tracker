import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MiniCalendar.css"

const MiniCalendar = ({ date }) => {

    if (!date) {
        return null
    }

    const year = date.getFullYear();
    const month = date.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const dates = Array.from(
        { length: daysInMonth },
        (_, i) => i + 1
    );

    const firstDay = new Date(year, month, 1);

    const offset = () => {
        if (firstDay.getDay() > 0) {
            return firstDay.getDay() - 1;
        } else {
            return 6; // Sunday at the end
        }
    };

    return (
        <div className="miniCalendar">

            <h3>
                {date.toLocaleString("default", {
                    month: "long",
                    year: "numeric"
                })}
            </h3>

            <div className="calendarWeekdays">
                <span>M</span>
                <span>T</span>
                <span>W</span>
                <span>T</span>
                <span>F</span>
                <span>S</span>
                <span>S</span>
            </div>

            <div className="calendarGrid">

                {Array.from({ length: offset() }).map((_, index) => (
                    <div key={index}></div>
                ))}

                {dates.map(day => {

                    const selected =
                        day === date.getDate();

                    return (
                        <a
                            key={day}
                            href={`/timetable?date=${String(day).padStart(2, "0")}/${String(month + 1).padStart(2, "0")}/${year}#loadTimetablePageTo`}
                            className={
                                selected
                                    ? "calendarDate activeDate"
                                    : "calendarDate"
                            }
                        >
                            {day}
                        </a>
                    );
                })}

            </div>

        </div>
    )
}

export default MiniCalendar