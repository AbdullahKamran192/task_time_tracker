import { Router } from "express";
import { getTasks, getTasksByUserId, getTimeSessionByTaskID, postTask, postTimeSession, updateTask, updateTimeSession } from "../Config/database.js";
import { isLoggedIn } from "../Middlewares/user.js";

export const tasksRouter = Router()

tasksRouter.get("/tasks", isLoggedIn, async (req, res) => {
    const date = req.query.date;
    const query_tasks = await getTasksByUserId(req.user.user_id);
    const tasks = [];

    for (const task of query_tasks) {

        const time_session = await getTimeSessionByTaskID(task.task_id);
        console.log("================TIME SESSION==============")
        console.log(time_session)

        if (time_session == null) {
            continue
        }

        const start_time = new Date(time_session["start_time"])
        const stop_time = new Date(time_session["stop_time"])
        const time_wasted = time_session["time_wasted"]

        const start_time_date = `${start_time.getDate()}-${start_time.getMonth()}-${start_time.getFullYear()}`
        


        console.log(start_time.toLocaleDateString(), stop_time)
        if (time_session && start_time.toLocaleDateString() == date) {
            tasks.push({"task" : task,
                "time_session" : time_session,
                "time_wasted" : time_wasted,
                "start_hour": start_time.getHours(),
                "stop_hour": stop_time.getHours(),
                "start_minute": start_time.getMinutes().toString().padStart(2, "0"),
                "stop_minute": stop_time.getMinutes().toString().padStart(2, "0")})
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
    const time_wasted = req.body.timeWasted;

    const query_response = await postTask(taskName, taskDescription, user_id)

    await postTimeSession(taskStartTime, taskStopTime, query_response.insertId, time_wasted)

    res.send("saved the Task")
})

tasksRouter.post("/updateTask", isLoggedIn, async (req, res) => {
    const task_id = req.body.task_id;
    const taskName = req.body.taskName;
    const taskDescription = req.body.taskDescription;
    const user_id = req.user.user_id;
    const taskStartTime = req.body.taskStartTime
    const taskStopTime = req.body.taskStopTime
    const task_colour = req.body.color;
    const time_wasted = req.body.timeWasted;

    const query_response = await updateTask(task_id, taskName, taskDescription, user_id, task_colour);

    const query_response_time_session = await updateTimeSession(taskStartTime, taskStopTime, task_id, time_wasted)

    res.send("Updated the task <button><a href='/tasks'>Tasks</a></button>")
})