import { Router } from "express";
import { isLoggedIn } from "../Middlewares/user.js";
import { getTasksByUserId, getTimeSessionByTaskID, getUserTaskLimits, updateUserTaskLimits } from "../Config/database.js";

export const settingsRouter = Router();

settingsRouter.get("/tasksLimit", isLoggedIn, async (req, res) => {
    const tasksLimits = await getUserTaskLimits(req.user.user_id);

    res.json(tasksLimits)
});

settingsRouter.post("/tasksLimit", isLoggedIn, async (req, res) => {

    console.log("==================================================")
    console.log(req.body)
    console.log("==================================================")

    const tasksLimits = req.body.tasksLimits;

    for (const taskLimit of tasksLimits) {

        const colour = taskLimit.colour;
        const minutes = taskLimit.minutes;

        await updateUserTaskLimits(req.user.user_id, colour, minutes);
    }

    console.log("-----------------")

    res.json({
        settingsStatusMessage: "Minutes updated successfully",
        username: req.user.username,
        userProfilePicture: req.user.profile_picture  
    })
})
