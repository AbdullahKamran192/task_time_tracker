import { Router } from "express";
import { postTask, postTimeSession } from "../Config/database.js";

export const tasksRouter = Router()

tasksRouter.get("/", (req, res) => {
    res.render('tasks')
})

tasksRouter.post("/saveTask", async (req, res) => {
    const taskName = req.body.taskName;
    const taskDescription = req.body.taskDescription

    const taskStartTime = req.body.taskStartTime
    const taskStopTime = req.body.taskStopTime

    const query_response = await postTask(taskName, taskDescription)

    await postTimeSession(taskStartTime, taskStopTime, query_response.insertId)

    res.send("saved the Task")
})