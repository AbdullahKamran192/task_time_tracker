import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Timetable.css"
import { Outlet } from "react-router-dom";
import EditTaskForm from "../components/EditTaskForm";
import TaskSaved from "../components/TaskSaved";

function formatTime(hour) {
    const isPM = hour >= 12;
    const h12 = ((hour + 11) % 12) + 1;
    const suffix = isPM ? "PM" : "AM";
    return `${h12}:00 ${suffix}`;
}

// exmaple take time 1:13 and convert it to 01:13
function formatTimeTo24Hours(time) {

    const hours = time.substring(0, time.indexOf(":"))
    const minutes = time.substring(time.indexOf(":") + 1, time.length)

    // const hours = time.substring(0,1).padStart(2, "0")
    // const minutes = time.substring(2,4).padStart(2, "")
    return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`
}

//             0123456789
//from example 26/01/2026 to 26-01-2026
function formatDate(date) {
    const formatted_date = date.substring(0, 2)
    const month = date.substring(3, 5)
    const fullYear = date.substring(6, 10)

    console.log("THE FORMATTED DATE")
    console.log(`${formatted_date}-${month}-${fullYear}`)

    return `${fullYear}-${month}-${formatted_date}`
}

const params = new URLSearchParams(window.location.search);
let date = params.get("date") ? new Date(formatDate(params.get("date"))) : new Date();


function handleToday() {
    date = new Date()
    console.log(date)
    window.location.href = `/timetable?date=${date.toLocaleDateString()}#loadTimetablePageTo`;
}

function handlePrev() {
    console.log(date)
    if (date) {
        date.setDate(date.getDate() - 1)
        window.location.href = `/timetable?date=${date.toLocaleDateString()}#loadTimetablePageTo`;
    }
    console.log("prevBtn button clicked")
}

function handleNext() {
    console.log(date)
    if (date) {
        date.setDate(date.getDate() + 1)
        window.location.href = `/timetable?date=${date.toLocaleDateString()}#loadTimetablePageTo`;
    }
    console.log("nextBtn button clicked")
}





const Timetable = () => {

    const [tasks, setTasks] = useState([]);
    const location = useLocation();
    const [selectedTask, setSelectedTask] = useState(null);
    const [taskSaved, setTaskSaved] = useState(false);

    const queryParams = new URLSearchParams(location.search);
    const urlDate = queryParams.get("date");

    const fetchData = async () => {
        if (urlDate) {
            const response = await fetch(`http://localhost:8080/tasks?date=${urlDate}#loadTimetablePageTo`, {
                credentials: 'include'
            });
            const data = await response.json();
            console.log(data)
            setTasks(data.tasks)
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    // map all the tasks received (for this date) onto the timetable, correctly with the timestamp.
    const listTasks = tasks.map((task, index) => {

        const PIXELS_PER_MINUTE = 72 / 60;

        const startTime = new Date(task.time_session.start_time);

        const startMinutes =
            startTime.getHours() * 60 +
            startTime.getMinutes();

        const top = startMinutes * PIXELS_PER_MINUTE;

        const durationMinutes =
            (new Date(task.time_session.stop_time) -
                new Date(task.time_session.start_time))
            / (1000 * 60);

        const height = durationMinutes * PIXELS_PER_MINUTE;


        return (
            <div
                className="taskBox"
                key={index}
                style={{
                    top: `${top}px`,
                    height: `${height}px`
                }}
                onClick={() => {
                    if (!selectedTask) {
                        setSelectedTask(task);
                    } else {
                        setSelectedTask(null)
                    }
                }}
            >
                <p>{task.task.task_name}</p>
                <p>{task.task.task_description}</p>
            </div>
        );
    });


    function divById(task_id) {
        console.log(`You clicked on ${task_id}`)
        const divItem = document.getElementById(task_id);

        const openButton = document.querySelector("[data-open-modal]")
        const closeButton = document.querySelector("[data-close-modal]")
        const modal = document.querySelector("[data-modal]")

        modal.showModal()

        closeButton.onclick = () => modal.close();

        console.log("THE START HOUR MINUTE IS ")
        console.log(divItem.querySelector(".start_hour_minute").textContent)

        document.getElementById("taskIdModel").value = task_id
        document.getElementById("taskStartTimeInputModal").value = `${formatDate(params.get("date"))}T${formatTimeTo24Hours(divItem.querySelector(".start_hour_minute").textContent)}`;
        document.getElementById("taskStopTimeInputModal").value = `${formatDate(params.get("date"))}T${formatTimeTo24Hours(divItem.querySelector(".stop_hour_minute").textContent)}`;
        document.getElementById("taskNameInputModal").value = divItem.querySelector(".task_name").textContent;
        document.getElementById("taskDescriptionInputModal").value = divItem.querySelector(".task_description").textContent;
        document.getElementById("timeWastedModal").value = divItem.querySelector(".time_wasted").textContent;
        document.getElementById("deleteTaskButton").onclick = function () {
            deleteTaskButtonClick(task_id); // LEARN
        }
    }

    async function deleteTaskButtonClick(task_id) {
        console.log(`PERFORM THE DELETE FOR ${task_id}`)

        if (confirm("Are you sure you want to delete the task!") == true) {
            try {
                delete_response = await fetch("/deleteTask", {
                    method: "POST",
                    body: JSON.stringify({
                        "task_id": task_id,
                    }),
                    headers: {
                        "Content-type": "application/json",
                    },
                })

                if (!delete_response.ok) {
                    throw new Error(`Response status: ${delete_response.status}`)
                }

                if (delete_response.redirected) {
                    window.location.href = delete_response.url
                }
            } catch (error) {
                console.error(error.message);
            }
        }
    }

    return (
        <>
            <header className="toolbar">
                <div className="left">
                    <button className="btn" id="todayBtn" onClick={handleToday}>Today</button>
                    <button className="btn iconbtn" id="prevBtn" onClick={handlePrev} aria-label="Previous">
                        &lt;
                    </button>
                    <button className="btn iconbtn" id="nextBtn" onClick={handleNext} aria-label="Next">
                        &gt;
                    </button>

                    <div className="title" id="monthTitle">
                        {date.toLocaleDateString()}
                    </div>
                </div>
            </header>

            <main className="pageLayout">
                <div className="dayHeader" id="dayHeaderText">
                    {date.toLocaleDateString()}
                </div>
                <div className="miniCalendar">

                    <h3>
                        {currentDate.toLocaleString("default", {
                            month: "long",
                            year: "numeric"
                        })}
                    </h3>

                    <div className="calendarGrid">

                        {dates.map(day => {

                            const selected =
                                day === currentDate.getDate();

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

                <div className="calendar">
                    <div className="gridWrap">
                        <div className="grid">
                            <div className="timeCol">
                                {Array.from({ length: 24 }, (_, h) => (
                                    <div key={h} className="timeRow">
                                        <div className="timeLabel">
                                            {formatTime(h)}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="dayCol" id="dayCol">
                                {Array.from({ length: 24 }, (_, h) => (
                                    <div key={h} className="hourLine"></div>
                                ))}

                                {selectedTask && (
                                    <EditTaskForm
                                        task={selectedTask}
                                        onClose={() => setSelectedTask(null)}
                                        showTaskSaved={() => setTaskSaved(true)}
                                    />
                                )}

                                {listTasks}
                            </div>

                            {taskSaved && (
                                <TaskSaved onClose={() => setTaskSaved(false)} />
                            )}

                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Timetable;