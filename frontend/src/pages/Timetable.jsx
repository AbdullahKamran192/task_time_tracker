import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Timetable.css"
import { Outlet } from "react-router-dom";
import EditTaskForm from "../components/EditTaskForm";
import MiniCalendar from "../components/MiniCalendar";
import { useNavigate } from "react-router-dom";

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

function formatMinutes(minutes) {
    if (!minutes)
        return "";

    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hrs === 0)
        return `${mins} min`;

    return `${hrs}h ${mins}m`;
}

//             0123456789
//from example 26/01/2026 to 26-01-2026
function formatDate(date) {
    const formatted_date = date.substring(0, 2)
    const month = date.substring(3, 5)
    const fullYear = date.substring(6, 10)

    //console.log("THE FORMATTED DATE")
    //console.log(`${formatted_date}-${month}-${fullYear}`)

    return `${fullYear}-${month}-${formatted_date}`
}



const Timetable = () => {
    const navigate = useNavigate();

    function formatURLDate(date) {
        return `${String(date.getDate()).padStart(2,"0")}/${String(date.getMonth()+1).padStart(2,"0")}/${date.getFullYear()}`;
    }

    function handleToday() {
        const newDate = new Date();

        setDate(newDate);

        navigate(`/timetable?date=${formatURLDate(newDate)}#loadTimetablePageTo`);
    }

    function handlePrev() {
        const newDate = new Date(date);

        newDate.setDate(newDate.getDate() - 1);

        setDate(newDate);

        navigate(`/timetable?date=${formatURLDate(newDate)}#loadTimetablePageTo`);
    }

    function handleNext() {
        const newDate = new Date(date);

        newDate.setDate(newDate.getDate() + 1);

        setDate(newDate);

        navigate(`/timetable?date=${formatURLDate(newDate)}#loadTimetablePageTo`);
    }

    function getTotalProductiveMinutes(tasks) {
        let total = 0;

        tasks.forEach(task => {
            const start = new Date(task.time_session.start_time);
            const stop = new Date(task.time_session.stop_time);    

            total +=
                (stop - start) / (1000 * 60) - task.time_wasted;
        })
        return total;
    }

    function getTotalWastedMinutes(tasks) {
        let total = 0;

        tasks.forEach(task => {
            total += task.time_wasted;
        });

        return total;
    }

    const params = new URLSearchParams(window.location.search);
    //let date = params.get("date") ? new Date(formatDate(params.get("date"))) : new Date();
    const [date, setDate] = useState(params.get("date") ? new Date(formatDate(params.get("date"))) : new Date())


    const [tasks, setTasks] = useState([]);
    const location = useLocation();
    const [selectedTask, setSelectedTask] = useState(null);

    const queryParams = new URLSearchParams(location.search);
    const urlDate = queryParams.get("date");

    const fetchData = async () => {
        if (urlDate) {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tasks?date=${urlDate}#loadTimetablePageTo`, {
                credentials: 'include'
            });
            const data = await response.json();
            console.log(data)
            setTasks(data.tasks)
        }
    }

    const totalMinutes = getTotalProductiveMinutes(tasks);
    const totalWastedMinutes = getTotalWastedMinutes(tasks);

    useEffect(() => {
        fetchData();
    }, [urlDate])

    useEffect(() => {
        if (urlDate) {
            setDate(new Date(formatDate(urlDate)));
        } else {
            setDate(new Date());
        }
    }, [urlDate]);

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
                    height: `${height}px`,
                    backgroundColor: task.task.task_colour ? task.task.task_colour : "blue"
                }}
                onClick={() => {
                    if (!selectedTask) {
                        setSelectedTask(task);
                    } else {
                        setSelectedTask(null)
                    }
                }}
            >
                <div className="taskTitle">
                    {task.task.task_name}
                </div>

                <div className="taskTime">
                    {startTime.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit"
                    })}
                    {" - "}
                    {new Date(task.time_session.stop_time).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit"
                    })}
                </div>

                <div className="taskDescription">
                    {task.task.task_description}
                </div>
            </div>
        );
    });


    function divById(task_id) {
        //console.log(`You clicked on ${task_id}`)
        const divItem = document.getElementById(task_id);

        const openButton = document.querySelector("[data-open-modal]")
        const closeButton = document.querySelector("[data-close-modal]")
        const modal = document.querySelector("[data-modal]")

        modal.showModal()

        closeButton.onclick = () => modal.close();

        //console.log("THE START HOUR MINUTE IS ")
        //console.log(divItem.querySelector(".start_hour_minute").textContent)

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
        //console.log(`PERFORM THE DELETE FOR ${task_id}`)

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
                //console.error(error.message);
            }
        }
    }

    //console.log("TASKS:", tasks);

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


            <div className="pageLayout">

                <MiniCalendar date={date} />

                <main className="calendar">

                    <div className="statHeader" id="dayHeaderText">
                        <p><b>Total productive time:</b> {formatMinutes(totalMinutes)}</p>
                        <p><b>Total wasted time:</b> {formatMinutes(totalWastedMinutes)}</p>
                    </div>

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
                                        reloadTasks={fetchData}
                                    />
                                )}

                                {listTasks}
                            </div>

                        </div>
                    </div>
                </main>
            </div>

        </>
    );
};

export default Timetable;