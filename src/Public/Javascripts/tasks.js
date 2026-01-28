// const now = new Date()

// setTimeout(() => {
//     const later = new Date()
//     console.log("Time difference")
//     console.log(later - now)
// }, 3000)

//console.log(now.getHours())

//import { getTasks } from "../../Config/database";

var startTime;
var timeWasted;
var timeElapsed;
var timerActive = false

function toDateTimeLocal(date) {
    const pad = n => String(n).padStart(2, "0");

    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function startTimer() {
    document.getElementById("saveTaskForm").style.visibility = "hidden";
    startTime = new Date()
    startTime.getMonth()
    document.getElementById("startTimerButton").style.color = "red";
    document.getElementById("wasteTimeIncrementButton").style.visibility = "visible";
    timeWasted = 0
    timeElapsed = 0
    timerActive = true
    incrementTimeElapsed()
}

function incrementTimeElapsed() {
    while (timerActive) {
        setTimeout(() => {
            const now = new Date()
            document.getElementById("showTimeElapsed").innerHTML = now - timeElapsed
        }, 1000)
    }
}

function incrementTimeWasted() {
    timeWasted = timeWasted + 1;
    console.log(`the new timeWasted ${timeWasted}`)
}

function stopTimer(){
    timerActive = false
    const later = new Date()
    const timeSpent = (later - startTime)

    document.getElementById("wasteTimeIncrementButton").style.visibility = "hidden";

    document.getElementById("showTimeElapsed").innerHTML = timeSpent;

    document.getElementById("stopTimerButton").style.color = "green";

    document.getElementById("saveTaskForm").style.visibility = "visible";

    document.getElementById("timeWastedInput").value = timeWasted;
    timeWasted = 0

    document.getElementById("taskStartTimeInput").value = toDateTimeLocal(startTime)
    document.getElementById("taskStopTimeInput").value = toDateTimeLocal(later)
}