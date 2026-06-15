import React from "react";
import "./Home.css";

const Home = () => {

    


    return (
        <main className="page">
            <header className="pageHeader">
            <h1 className="title">Home</h1>
            <p className="subtitle">Track time, log tasks, and keep an eye on wasted time.</p>
            </header>

            <section className="card">
            <div className="cardHeader">
                <h2 className="cardTitle">Timer</h2>
                <span className="badge" id="timerStatusBadge">Ready</span>
            </div>

            <div className="actions">
                <button className="btn btnPrimary" id="startTimerButton" onclick="startTimer()">Start timer</button>
                <button className="btn btnDanger" id="stopTimerButton" onclick="stopTimer()">Stop timer</button>
                <button className="btn btnGhost" id="wasteTimerOnButton" onclick="togglePauseWasteTime()"></button>

                <button className="btn btnSecondary" id="wasteTimeIncrementButton" onclick="incrementTimeWasted()"
                style={{visibility: "hidden"}}>
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
                <p className="cardHint">Fill in the details and save it when you’re done.</p>
            </div>

            <form className="form" id="saveTaskForm" action="/saveTask" method="post">
                <div className="helperRow">
                <p className="helperText" id="timeStartP"></p>
                <p className="helperText" id="timeStopP"></p>
                </div>

                <div className="grid">
                <div className="field">
                    <label for="taskStartTimeInput">Task Start Time</label>
                    <input id="taskStartTimeInput" type="datetime-local" name="taskStartTime" />
                </div>

                <div className="field">
                    <label for="taskStopTimeInput">Task Stop Time</label>
                    <input id="taskStopTimeInput" type="datetime-local" name="taskStopTime" />
                </div>
                </div>

                <div className="field">
                <label for="taskDescriptionInput">Task Name</label>
                <input id="taskDescriptionInput" placeholder="task name" type="text" name="taskName" />
                </div>

                <div className="field">
                <label for="taskDescriptionInput">Task Description</label>
                <input id="taskDescriptionInput" placeholder="task description" type="text" name="taskDescription" />
                </div>

                <div className="field">
                <label for="timeWastedInput">Time Wasted (minutes)</label>
                <input id="timeWastedInput" placeholder="time wasted" type="text" name="timeWasted" />
                </div>

                <div className="formFooter">
                <button className="btn btnPrimary submitButton" type="submit">Save</button>
                </div>
            </form>
            </section>
        </main>
    )
}

export default Home