import { Router } from "express";
import { getTasks, getTasksByUserId, getTimeSessionByTaskID, postTask, postTimeSession } from "../Config/database.js";
import { isLoggedIn } from "../Middlewares/user.js";

export const tasksRouter = Router()

tasksRouter.get("/tasks", isLoggedIn, async (req, res) => {
    const date = req.query.date;
    const query_tasks = await getTasksByUserId(req.user.user_id);
    const tasks = [];

    for (const task of query_tasks) {

        const time_session = await getTimeSessionByTaskID(task.task_id);
        console.log("==============================")
        const start_time = new Date(time_session["start_time"])
        const stop_time = new Date(time_session["stop_time"])

        const start_time_date = `${start_time.getDate()}-${start_time.getMonth()}-${start_time.getFullYear()}`

        console.log(start_time.toLocaleDateString(), stop_time)
        if (time_session && start_time.toLocaleDateString() == date) {
            tasks.push({"task" : task,
                "time_session" : time_session,
                "start_hour": start_time.getHours(),
                "stop_hour": stop_time.getHours(),
                "start_minute": start_time.getMinutes(),
                "stop_minute": stop_time.getMinutes(),})
        }
    }

    console.log("the date is")
    console.log(date)

    res.render("timetable", {
        tasks,
        "date" : date
    });
});


tasksRouter.post("/saveTask", isLoggedIn, async (req, res) => {
    const taskName = req.body.taskName;
    const taskDescription = req.body.taskDescription;
    const user_id = req.user.user_id;

    const taskStartTime = req.body.taskStartTime
    const taskStopTime = req.body.taskStopTime

    const query_response = await postTask(taskName, taskDescription, user_id)

    await postTimeSession(taskStartTime, taskStopTime, query_response.insertId)

    res.send("saved the Task")
})