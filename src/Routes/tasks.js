import { Router } from "express";
import { getTasks, getTasksByUserId, getTimeSessionByTaskID, postTask, postTimeSession } from "../Config/database.js";
import { isLoggedIn } from "../Middlewares/user.js";

export const tasksRouter = Router()

tasksRouter.get("/tasks", isLoggedIn, async (req, res) => {
    const query_tasks = await getTasksByUserId(req.user.user_id);
    const tasks = [];

    for (const task of query_tasks) {
        const time_session = await getTimeSessionByTaskID(task.task_id);
        if (time_session) {
            tasks.push({"task" : task, "time_session" : time_session})
        }
    }

    res.render("tasks", { tasks });
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