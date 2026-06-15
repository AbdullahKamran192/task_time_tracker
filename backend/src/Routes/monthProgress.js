import { Router } from "express";
import { isLoggedIn } from "../Middlewares/user.js";
import { getTasksByUserId, getTimeSessionByTaskID } from "../Config/database.js";

export const monthProgressRouter = Router();

monthProgressRouter.get("/monthProgress", isLoggedIn, async (req, res) => {
    const tasks = await getTasksByUserId(req.user.user_id);

    const dailyTotals = {};
    const dailyFirstTask = {};

    for (const task of tasks) {
        const session = await getTimeSessionByTaskID(task.task_id);
        if (!session) continue;

        const start = new Date(session.start_time);
        const stop = new Date(session.stop_time);

        const key =
            start.getFullYear() + "-" +
            String(start.getMonth() + 1).padStart(2, "0") + "-" +
            String(start.getDate()).padStart(2, "0");

        const minutes = (stop - start) / (1000 * 60);
        const wasted = session.time_wasted || 0;

        if (!dailyTotals[key]) {
            dailyTotals[key] = 0;
            dailyFirstTask[key] = task.task_name;
        }

        dailyTotals[key] += (minutes - wasted);
    }

    res.render("tasks/monthProgress", {
        dailyTotals,
        dailyFirstTask,
        username: req.user.username,
        userProfilePicture: req.user.profile_picture
    });
});