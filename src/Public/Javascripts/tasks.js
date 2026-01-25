// const now = new Date()

// setTimeout(() => {
//     const later = new Date()
//     console.log("Time difference")
//     console.log(later - now)
// }, 3000)

//console.log(now.getHours())

//import { getTasks } from "../../Config/database";

var now;

function toDateTimeLocal(date) {
    const pad = n => String(n).padStart(2, "0");

    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function startTimer() {
    now = new Date()
    now.getMonth()
    document.getElementById("startTimerButton").style.color = "red";
}

function stopTimer(){
    const later = new Date()
    const timeSpent = (later - now)

    document.getElementById("showTime").innerHTML = timeSpent;

    document.getElementById("stopTimerButton").style.color = "green";

    document.getElementById("saveTaskForm").style.visibility = "visible";

    document.getElementById("taskStartTimeInput").value = toDateTimeLocal(now)
    document.getElementById("taskStopTimeInput").value = toDateTimeLocal(later)



    
    // const timeStartLabel = document.createElement("label")
    // timeStartLabel.textContent = `start time: ${now}`
    // timeStartLabel.id = "timeStartLabel"

    // const timeStopLabel = document.createElement("label")
    // timeStopLabel.textContent = `stop time: ${later}`
    // timeStopLabel.id = "timeStopLabel"

    // document.getElementById("saveTaskForm").append(timeStartLabel)
    // document.getElementById("saveTaskForm").append(document.createElement("br"))
    // document.getElementById("saveTaskForm").append(timeStopLabel)

    // task_name = document.createElement("input")
    // task_name.id = "taskNameInput"
    // document.getElementById("saveTaskForm").append(task_name)

    // task_description = document.createElement("input")
    // task_description.id = "taskDescriptionInput"
    // document.getElementById("saveTaskForm").append(task_description)

    // submitButton = document.createElement("button")
    // submitButton.textContent = "Save"
    // document.getElementById("saveTaskForm").append(submitButton)

    //window.location.href = "/saveTask"
}