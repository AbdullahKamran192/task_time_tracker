import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './EditTaskForm.css'
import WarningBox from "./WarningBox";

function formatDateTime(stringDateTime) {
    const dateTime = new Date(stringDateTime)

    const month = (dateTime.getMonth() + 1).toString().padStart(2, "0")
    const date = (dateTime.getDate()).toString().padStart(2, "0")
    const hour = dateTime.getHours().toString().padStart(2, "0")
    const minute = dateTime.getMinutes().toString().padStart(2, "0")

    return dateTime.getFullYear() + "-" + month + "-" + date + "T" + hour + ":" + minute
}

const EditTaskForm = ({ task, onClose, showTaskSaved, reloadTasks }) => {

    const navigate = useNavigate()

    const [error, setError] = useState(null)


    async function updateTask(event) {
        event.preventDefault();

        const color = document.querySelector(
            'input[name="color"]:checked'
        )?.value;

        try {
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/updateTask`,
                {
                    credentials: "include",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        task_id: task.task.task_id,
                        taskName: document.getElementById("taskNameInputModal").value,
                        taskDescription: document.getElementById("taskDescriptionInputModal").value,
                        taskStartTime: document.getElementById("taskStartTimeInputModal").value,
                        taskStopTime: document.getElementById("taskStopTimeInputModal").value,
                        timeWasted: document.getElementById("timeWastedModal").value,
                        color: color
                    })
                }
            );
    
            if(!response.ok) {
                const error = await response.json();
                throw new Error(error.message)
            }

            const data = await response.json();
    
            if (data) {
                onClose();
                reloadTasks();
            }
        } catch (err) {
            setError(err.message)
        }

    }

    async function deleteTask() {

        try {
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/deleteTask`,
                {
                    credentials: "include",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        task_id: task.task.task_id
                    })
                }
            )
    
            const data = await response.json();
    
            if (data) {
                onClose();
                reloadTasks();
            }

        } catch (err) {
            setError(err.message)
        }


    }

    return (
        <div className="modalOverlay">
            <div className="box">
                <div className="formHeader">
                    <h4 id="EditTaskTitle">Edit the task</h4>

                    <button className="closeButton" onClick={onClose} type="button">
                        X
                    </button>
                </div>

                { error && <WarningBox warningTitle={error}/>}



                <form
                    onSubmit={updateTask}
                    method="post"
                >

                    <br />

                    <label htmlFor="taskStartTimeInputModal">
                        Task Start Time
                    </label>

                    <br />

                    <input
                        id="taskStartTimeInputModal"
                        type="datetime-local"
                        name="taskStartTime"
                        defaultValue={formatDateTime(task.time_session.start_time)}
                    />

                    <br />
                    <br />

                    <label htmlFor="taskStopTimeInputModal">
                        Task Stop Time
                    </label>

                    <br />

                    <input
                        id="taskStopTimeInputModal"
                        type="datetime-local"
                        name="taskStopTime"
                        defaultValue={formatDateTime(task.time_session.stop_time)}
                    />

                    <br />
                    <br />

                    <label htmlFor="taskNameInputModal">
                        Task Name
                    </label>

                    <input
                        id="taskNameInputModal"
                        placeholder="task name"
                        type="text"
                        name="taskName"
                        defaultValue={task.task.task_name}
                    />

                    <br />

                    <label htmlFor="taskDescriptionInputModal">
                        Task Description
                    </label>

                    <textarea
                        id="taskDescriptionInputModal"
                        placeholder="task description"
                        name="taskDescription"
                        defaultValue={task.task.task_description}
                    ></textarea>

                    <label htmlFor="timeWastedModal">
                        Minutes Wasted
                    </label>

                    <input
                        id="timeWastedModal"
                        type="text"
                        name="timeWasted"
                        defaultValue={task.time_wasted}
                    />

                    <br />

                    <label>Task Colour</label>

                    <div className="color-picker">
                        <label>
                            <input
                                type="radio"
                                name="color"
                                value="blue"
                            />
                            <span className="color blue"></span>
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="color"
                                value="orange"
                            />
                            <span className="color orange"></span>
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="color"
                                value="green"
                            />
                            <span className="color green"></span>
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="color"
                                value="purple"
                            />
                            <span className="color purple"></span>
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="color"
                                value="red"
                            />
                            <span className="color red"></span>
                        </label>
                    </div>

                    <div className="buttonContainer">
                        <button
                            className="submitButton"
                            type="submit"
                        >
                            Save
                        </button>

                        <button
                            id="deleteTaskButton"
                            type="button"
                            onClick={deleteTask}
                        >
                            Delete Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditTaskForm;