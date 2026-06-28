import { Router } from "express";
import {
    deleteTask,
    getTasksWithSessions,
    postTask,
    postTimeSession,
    updateTask,
    updateTimeSession
} from "../Config/database.js";
import { isLoggedIn } from "../Middlewares/user.js";

export const tasksRouter = Router();

const dateKey = (d) => {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${dd}/${mm}/${yyyy}`;
};

tasksRouter.get("/tasks", isLoggedIn, async (req, res) => {
    const date = req.query.date;

    const rows = await getTasksWithSessions(req.user.user_id);

    // console.log("===========================================================")
    // console.log(req.query.date)
    // console.log(req.user.user_id)
    // console.log("===========================================================")


    const tasks = [];

    for (const row of rows) {
        const start_time = new Date(row.start_time);
        const stop_time = new Date(row.stop_time);

        if (dateKey(start_time) === date) {
            tasks.push({
                task: {
                    task_id: row.task_id,
                    task_name: row.task_name,
                    task_description: row.task_description,
                    task_colour: row.task_colour
                },
                time_session: {
                    start_time: row.start_time,
                    stop_time: row.stop_time
                },
                time_wasted: row.time_wasted,
                start_hour: start_time.getHours(),
                stop_hour: stop_time.getHours(),
                start_minute: String(start_time.getMinutes()).padStart(2, "0"),
                stop_minute: String(stop_time.getMinutes()).padStart(2, "0")
            });
        }
    }

    // res.render("tasks/timetable", {
    //     tasks,
    //     date,
    //     username: req.user.username,
    //     userProfilePicture: req.user.profile_picture
    // });

    res.json({
        "tasks": tasks,
        "date": date,
        "username": req.user.username,
        "userProfilePicture": req.user.profile_picture
    })
});

tasksRouter.post("/saveTask", isLoggedIn, async (req, res) => {
    const taskName = req.body.taskName;
    const taskDescription = req.body.taskDescription;
    const user_id = req.user.user_id;

    const taskStartTime = req.body.taskStartTime;
    const taskStopTime = req.body.taskStopTime;
    const time_wasted = req.body.timeWasted;

    const query_response = await postTask(taskName, taskDescription, user_id);

    await postTimeSession(
        taskStartTime,
        taskStopTime,
        query_response.insertId,
        time_wasted
    );

    // res.render("tasks/taskStatus", {
    //     taskStatusMessage: "Task saved successfully",
    //     username: req.user.username,
    //     userProfilePicture: req.user.profile_picture
    // });

    res.json({
        taskStatusMessage: "Task saved successfully",
        username: req.user.username,
        userProfilePicture: req.user.profile_picture
    })
});

tasksRouter.post("/updateTask", isLoggedIn, async (req, res) => {
    console.log(req.body)

    const task_id = req.body.task_id;
    const taskName = req.body.taskName;
    const taskDescription = req.body.taskDescription;
    const user_id = req.user.user_id;
    const taskStartTime = req.body.taskStartTime;
    const taskStopTime = req.body.taskStopTime;
    const task_colour = req.body.color;
    const time_wasted = req.body.timeWasted;

    await updateTask(task_id, taskName, taskDescription, user_id, task_colour);

    await updateTimeSession(
        taskStartTime,
        taskStopTime,
        task_id,
        time_wasted
    );

    res.json({
        taskStatusMessage: "Task updated successfully",
        username: req.user.username,
        userProfilePicture: req.user.profile_picture  
    })
});

tasksRouter.post("/deleteTask", isLoggedIn, async (req, res) => {
    const task_id = req.body.task_id;
    const user_id = req.user.user_id;

    await deleteTask(task_id, user_id);

    res.redirect("/tasks");
});