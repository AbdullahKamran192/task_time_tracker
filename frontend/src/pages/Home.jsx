import React, { useState } from "react";
import "./Home.css";
import { useRef } from "react";
import { useEffect } from "react";
import AcitvityGraph from "../components/ActivityGraph";
import LoginWarning from "../components/LoginWarning";

const Home = () => {

    const startTime = useRef();
    const timerStarted = useRef(false);
    const timeWastedSeconds = useRef()
    const timerInterval = useRef()
    const wasteTimerOn = useRef(false)
    const wasteTimerInterval = useRef(null)
    const wasteTimerStart = useRef(null)
    const [showWasteButton, setShowWasteButton] = useState(false);

    function toDateTimeLocal(date) {
        const pad = n => String(n).padStart(2, "0");

        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
    }

    const [backendData, setBackendData] = useState({});

    const fetchData = async () => {
        const response = await fetch("http://localhost:8080/", {
            credentials: 'include'
        });
        const data = await response.json();
        setBackendData(data);
    }

    useEffect(() => {
        fetchData();
    }, [])

    async function startTimer() {

        if (timerStarted.current == false) {
            timerStarted.current = true
            document.getElementById("saveTaskForm").style.visibility = "hidden";
            startTime.current = new Date()
            document.getElementById("wasteTimerOnButton").innerHTML = "turn waste timer on"
            document.getElementById("wasteTimeIncrementButton").style.visibility = "visible";
            timeWastedSeconds.current = 0
            document.getElementById("showTimeWasted").innerHTML = `00:00:00`
            timerInterval.current = setInterval(() => {
                const now = new Date();
                const elapsed = now - startTime.current; // in milliseconds

                const hours = Math.floor(elapsed / (3600000))
                const minutes = Math.floor((elapsed % (3600000)) / (60000))
                const seconds = Math.floor(((elapsed % (3600000)) % (60000)) / 1000)
                document.getElementById("showTimeElapsed").innerHTML = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
            }, 1000)
        }
    }

    function incrementTimeWasted() {
        timeWastedSeconds.current += 60
    }

    function stopTimer() {
        timerStarted.current = false;
        clearInterval(wasteTimerInterval.current)
        clearInterval(timerInterval.current)
        const later = new Date()
        const timeSpent = (later - startTime.current)

        // if the waste timer was on and the user stopped the task timer.
        if (wasteTimerOn.current == true) {
            clearInterval(wasteTimerInterval.current)
            const wasteTimeElapsed = (new Date()) - wasteTimerStart.current; // in milliseconds
            timeWastedSeconds.current += 60
            wasteTimerOn.current = false
        }

        document.getElementById("wasteTimeIncrementButton").style.visibility = "hidden";
        //document.getElementById("showTimeElapsed").innerHTML = timeSpent;
        document.getElementById("saveTaskForm").style.visibility = "visible";
        document.getElementById("timeWastedInput").value = Math.floor(timeWastedSeconds.current / 60);
        timeWastedSeconds.current = 0
        document.getElementById("taskStartTimeInput").value = toDateTimeLocal(startTime.current)
        document.getElementById("taskStopTimeInput").value = toDateTimeLocal(later)
    }

    function togglePauseWasteTime() {
        document.getElementById("wasteTimerOnButton").innerHTML = "turn waste timer off"
        if (wasteTimerOn.current == false) {
            wasteTimerStart.current = new Date()
            wasteTimerInterval.current = setInterval(() => {
                const wasteTimeNow = new Date()
                const wasteTimeElapsed = (wasteTimeNow - wasteTimerStart.current) + Math.floor((timeWastedSeconds.current * 1000)) // in milliseconds

                const wasteTimehours = Math.floor(wasteTimeElapsed / (3600000))
                const wasteTimeminutes = Math.floor((wasteTimeElapsed % (3600000)) / (60000))
                const wasteTimeseconds = Math.floor(((wasteTimeElapsed % (3600000)) % (60000)) / 1000)

                document.getElementById("showTimeWasted").innerHTML = `${String(wasteTimehours).padStart(2, "0")}:${String(wasteTimeminutes).padStart(2, "0")}:${String(wasteTimeseconds).padStart(2, "0")}`

                // timeWastedSeconds = timeWastedSeconds + Math.round(wasteTimeElapsed / 60)   
            }, 1000)
            wasteTimerOn.current = true//setWasteTimerOn(true)
        } else {
            document.getElementById("wasteTimerOnButton").innerHTML = "turn waste timer on"
            clearInterval(wasteTimerInterval.current)
            const wasteTimeElapsed = (new Date()) - wasteTimerStart.current; // in milliseconds
            timeWastedSeconds.current += Math.floor(wasteTimeElapsed / 1000)//setTimeWastedSeconds(timeWastedSeconds.current + Math.floor(wasteTimeElapsed / 1000))
            wasteTimerOn.current = false//setWasteTimerOn(false)
        }
    }

    async function submitTask(event) {
        event.preventDefault();

        const response = await fetch(
            "http://localhost:8080/saveTask",
            {
                credentials: "include",
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    taskName: document.getElementById("taskNameInput").value,
                    taskDescription: document.getElementById("taskDescriptionInput").value,
                    taskStartTime: document.getElementById("taskStartTimeInput").value,
                    taskStopTime: document.getElementById("taskStopTimeInput").value,
                    timeWasted: document.getElementById("timeWastedInput").value
                })
            }
        );

        const data = await response.json();

        if (data) {

            document.getElementById("saveTaskForm").reset();

            document.getElementById("showTimeElapsed").innerHTML = "—";
            document.getElementById("showTimeWasted").innerHTML = "—";
        }
    }

    return (
        <main className="page">
            <header className="pageHeader">
                <h1 className="title">Home</h1>
                <p className="subtitle">Track time, log tasks, and keep an eye on wasted time.</p>
            </header>

            <div className="homeContent">
                <AcitvityGraph />

                <div className="rightColumn">
                    <section className="card">
                        <div className="cardHeader">
                            <h2 className="cardTitle">Timer</h2>
                            <span className="badge" id="timerStatusBadge">Ready</span>
                        </div>

                        <div className="actions">
                            <button className="btn btnPrimary" id="startTimerButton" onClick={startTimer}>Start timer</button>
                            <button className="btn btnDanger" id="stopTimerButton" onClick={stopTimer}>Stop timer</button>
                            <button className="btn btnGhost" id="wasteTimerOnButton" onClick={togglePauseWasteTime}></button>

                            <button className="btn btnSecondary" id="wasteTimeIncrementButton" onClick={incrementTimeWasted}
                                style={{ visibility: showWasteButton ? "visible" : "hidden" }}>
                                Wasted time +1 min
                            </button>
                        </div>

                        <div className="stats">
                            <div className="stat">
                                <p className="statLabel">Time elapsed</p>
                                <p className="statValue" id="showTimeElapsed">—</p>
                            </div>

                            <div className="stat">
                                <p className="statLabel">Time wasted</p>
                                <p className="statValue" id="showTimeWasted">—</p>
                            </div>
                        </div>
                    </section>

                    <section className="card">
                        <div className="cardHeader">
                            <h2 className="cardTitle">Save Task</h2>
                            <p className="cardHint">Fill in the details and save it when you are done.</p>
                        </div>

                        <form className="form" id="saveTaskForm" onSubmit={submitTask}>
                            <div className="helperRow">
                                <p className="helperText" id="timeStartP"></p>
                                <p className="helperText" id="timeStopP"></p>
                            </div>

                            <div className="field">
                                <label htmlFor="taskStartTimeInput">Task Start Time</label>
                                <input id="taskStartTimeInput" type="datetime-local" name="taskStartTime" />
                            </div>

                            <div className="field">
                                <label htmlFor="taskStopTimeInput">Task Stop Time</label>
                                <input id="taskStopTimeInput" type="datetime-local" name="taskStopTime" />
                            </div>

                            <div className="field">
                                <label htmlFor="taskNameInput">Task Name</label>
                                <input id="taskNameInput" placeholder="task name" type="text" name="taskName" />
                            </div>

                            <div className="field">
                                <label htmlFor="taskDescriptionInput">Task Description</label>
                                <input id="taskDescriptionInput" placeholder="task description" type="text" name="taskDescription" />
                            </div>

                            <div className="field">
                                <label htmlFor="timeWastedInput">Time Wasted (minutes)</label>
                                <input id="timeWastedInput" placeholder="time wasted" type="text" name="timeWasted" />
                            </div>

                            {backendData.username? (

                                <div className="formFooter">
                                    <button className="btn btnPrimary submitButton" type="submit">Save</button>
                                </div>
                            ) : (
                                <LoginWarning warningTitle="Log in to submit the form" warningMessage="You can view the form but must be logged in to save the task"/>
                            )}

                        </form>
                    </section>
                </div>


            </div>

        </main>
    )
}

export default React.memo(Home)