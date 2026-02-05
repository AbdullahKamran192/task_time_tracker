import { Router } from "express";
import { deleteTask, getTasks, getTasksByUserId, getTimeSessionByTaskID, postTask, postTimeSession, updateTask, updateTimeSession } from "../Config/database.js";
import { isLoggedIn } from "../Middlewares/user.js";

export const tasksRouter = Router()

const dateKey = (d) => {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${dd}/${mm}/${yyyy}`;
};

tasksRouter.get("/tasks", isLoggedIn, async (req, res) => {
    const date = req.query.date
    console.log("################# DATE #################");
    console.log(date)
    const query_tasks = await getTasksByUserId(req.user.user_id);
    const tasks = [];

    for (const task of query_tasks) {

        const time_session = await getTimeSessionByTaskID(task.task_id);

        if (time_session == null) {
            continue
        }

        const start_time = new Date(time_session["start_time"])
        const stop_time = new Date(time_session["stop_time"])
        const time_wasted = time_session["time_wasted"]

        const start_time_date = `${start_time.getDate()}-${start_time.getMonth()}-${start_time.getFullYear()}`

	console.log("@@@@@@@@@@@@@@@@ START TIME @@@@@@@@@@@@")
	console.log(start_time.toLocaleDateString())

	console.log("]]]]]]]]]]]]]]]]]]]]]] START TIME DATE [[[[[[[[[[[[[[[")
        console.log(start_time_date)

        if (time_session && dateKey(start_time) == date) {
            tasks.push({"task" : task,
                "time_session" : time_session,
                "time_wasted" : time_wasted,
                "start_hour": start_time.getHours(),
                "stop_hour": stop_time.getHours(),
                "start_minute": start_time.getMinutes().toString().padStart(2, "0"),
                "stop_minute": stop_time.getMinutes().toString().padStart(2, "0")})
        }
    }

    // console.log("=========== USERNAME AND PICTURE =================")
    // console.log(req.user.username)
    // console.log(req.user.profile_picture)

    res.render("tasks/timetable", {
        tasks,
        "date" : date,
        "username": req.user.username,
        "userProfilePicture": req.user.profile_picture
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

    res.render('tasks/taskStatus', {
        "taskStatusMessage": "Task saved successfully",
        "username" : req.user.username,
        "userProfilePicture": req.user.profile_picture
    })
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

    res.render('tasks/taskStatus', {
        "taskStatusMessage": "Task updated successfully",
        "username" : req.user.username,
        "userProfilePicture": req.user.profile_picture
    })
})

tasksRouter.post("/deleteTask", isLoggedIn, async (req, res) => {
    const task_id = req.body.task_id
    const user_id = req.user.user_id;

    console.log("=========== TASK ID ===============")

    console.log(task_id)
    console.log(user_id)

    console.log("======================================")

    await deleteTask(task_id, user_id);

    res.redirect("/tasks")

    // res.render('tasks/taskStatus', {
    //     "taskStatusMessage": "Task deleted successfully",
    //     "username" : req.user.username,
    //     "userProfilePicture": req.user.profile_picture
    // })
})
