import { Router } from "express";
import { getTasks, getTimeSessionByTaskID, postTask, postTimeSession } from "../Config/database.js";

export const tasksRouter = Router()

tasksRouter.get("/", (req, res) => {
    res.render('home')
})

tasksRouter.get("/tasks", async (req, res) => {
    const query_tasks = await getTasks();
    const tasks = [];

    for (const task of query_tasks) {
        const time_session = await getTimeSessionByTaskID(task.task_id);
        if (time_session) {
            tasks.push({"task" : task, "time_session" : time_session})
        }
    }

    res.render("tasks", { tasks });
});


tasksRouter.post("/saveTask", async (req, res) => {
    const taskName = req.body.taskName;
    const taskDescription = req.body.taskDescription

    const taskStartTime = req.body.taskStartTime
    const taskStopTime = req.body.taskStopTime

    const query_response = await postTask(taskName, taskDescription)

    await postTimeSession(taskStartTime, taskStopTime, query_response.insertId)

    res.send("saved the Task")
})