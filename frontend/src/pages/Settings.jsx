import React, { useState, useEffect } from "react";
import "./Settings.css"
import MessageBox from "../components/MessageBox";

const Settings = () => {

    const [tasksLimits, setTaskLimits] = useState([]);
    const [showMessageBox, setShowMessageBox] = useState(false);

    async function getSettingsData() {
        const data = await fetch("http://localhost:8080/tasksLimit", { credentials: 'include' })

        const receivedTasksLimits = await data.json();
        setTaskLimits(receivedTasksLimits)
    }


    useEffect(() => {
        getSettingsData();
    }, [])

    async function submitTasksLimits(event) {
        event.preventDefault();

        const updatedLimits = tasksLimits.map((taskLimit) => ({
            colour: taskLimit.colour,
            minutes: Number(document.getElementById(taskLimit.colour).value)
        }));

        const response = await fetch(
            "http://localhost:8080/tasksLimit",
            {
                credentials: "include",
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    tasksLimits: updatedLimits
                })
            }
        )

        if (response.ok) {
            setShowMessageBox(true)
        }

        console.log("99999999999999999999999999999999999")
        console.log(response)
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowMessageBox(false)
        }, 6000);

        return () => clearTimeout(timer);
    }, [showMessageBox])


    return (
        <div className="settingPage">
            <div className="taskTimeLimitBox">
                <h1>Update tasks time limit</h1>
                <form onSubmit={submitTasksLimits}>
                    {tasksLimits.map((taskLimit) => (
                        <div className="inputBox" key={taskLimit.colour}>
                            <div className="contentBox">
                                <label>{taskLimit.colour}</label>

                                <input
                                    id={taskLimit.colour}
                                    type="number"
                                    defaultValue={taskLimit.minutes}
                                    name={taskLimit.colour}
                                />
                                <span>minutes</span>
                            </div>
                        </div>
                    ))}

                    <button id="updateTaskButton">Update limits</button>
                {showMessageBox && (
                    <MessageBox messageTitle="Tasks time limits updated." message="" />
                )}
                </form>
            </div>
        </div>
    )
}

export default Settings