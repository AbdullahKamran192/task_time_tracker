import { Router } from "express";
import { isLoggedIn } from "../Middlewares/user.js";
import { getDailyFirstTask, getDailyTotalTime, getTasksByUserId, getTasksWithSessions, getTimeSessionByTaskID } from "../Config/database.js";

export const monthProgressRouter = Router();




monthProgressRouter.get("/monthProgress", isLoggedIn, async (req, res) => {

    try {

        const [dailyTotals, dailyFirstTask] = await Promise.all([
            getDailyTotalTime(req.user.user_id),
            getDailyFirstTask(req.user.user_id)
        ])

    let finalDailyTotal = {};

    for (let task of dailyTotals) {
        finalDailyTotal[task.day] = Number(task.total_minutes);
    }

    let finalDailyFirstTask = {};

    for (let task of dailyFirstTask) {
        finalDailyFirstTask[task.day] = task.task_name;
    }

    res.json({
        dailyTotals: finalDailyTotal,
        dailyFirstTask: finalDailyFirstTask,
        username: req.user.username,
        userProfilePicture: req.user.userProfilePicture
    });


    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
});