import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../pages/Timetable.css"

const EditTaskForm = () => {
    return (
        <div className="box">
            <h4>Edit the task</h4>

            <label>Task ID (readonly)</label>
            <input
                id="taskIdModel"
                type="text"
                name="task_id"
                readOnly
            />

            <button
                className="closeButton"
                data-close-modal
            >
                X
            </button>

            <form
                className="box"
                action="/updateTask"
                method="post"
            >
                <h4>Edit the task</h4>

                <label>Task ID (readonly)</label>
                <input
                    id="taskIdModel"
                    type="text"
                    name="task_id"
                    readOnly
                />

                <br />

                <label htmlFor="taskStartTimeInputModal">
                    Task Start Time
                </label>

                <br />

                <input
                    id="taskStartTimeInputModal"
                    type="datetime-local"
                    name="taskStartTime"
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
                />

                <br />

                <label htmlFor="taskDescriptionInputModal">
                    Task Description
                </label>

                <textarea
                    id="taskDescriptionInputModal"
                    placeholder="task description"
                    name="taskDescription"
                ></textarea>

                <label htmlFor="timeWastedModal">
                    Minutes Wasted
                </label>

                <input
                    id="timeWastedModal"
                    type="text"
                    name="timeWasted"
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

                <button
                    className="submitButton"
                    type="submit"
                >
                    Save
                </button>
            </form>

            <button
                id="deleteTaskButton"
                onClick={() => {
                    console.log("Delete task clicked");
                }}
            >
                Delete Task
            </button>
        </div>
    );
};

export default EditTaskForm;