var startTime;
var timeWasted;

function toDateTimeLocal(date) {
    const pad = n => String(n).padStart(2, "0");

    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

async function startTimer() {
    document.getElementById("saveTaskForm").style.visibility = "hidden";
    startTime = new Date()
    startTime.getMonth()
    document.getElementById("startTimerButton").style.color = "red";
    document.getElementById("wasteTimeIncrementButton").style.visibility = "visible";
    timeWasted = 0
    timerInterval = setInterval(() => {
        const now = new Date();
        const elapsed = now - startTime; // in milliseconds

        const hours = Math.floor(elapsed / (3600000))
        const minutes = Math.floor((elapsed % (3600000)) / (60000))
        const seconds = Math.floor(((elapsed % (3600000)) % (60000)) / 1000)
        document.getElementById("showTimeElapsed").innerHTML = `stopwatch: ${String(hours).padStart(2,"0")}:${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;
        document.getElementById("showTimeWasted").innerHTML = `time wasted: ${timeWasted} minutes`
    }, 1000);
}

function incrementTimeWasted() {
    timeWasted = timeWasted + 1;
    console.log(`the new timeWasted ${timeWasted}`)
}

function stopTimer(){
    clearInterval(timerInterval)
    const later = new Date()
    const timeSpent = (later - startTime)

    document.getElementById("wasteTimeIncrementButton").style.visibility = "hidden";

    //document.getElementById("showTimeElapsed").innerHTML = timeSpent;

    document.getElementById("stopTimerButton").style.color = "green";

    document.getElementById("saveTaskForm").style.visibility = "visible";

    document.getElementById("timeWastedInput").value = timeWasted;
    timeWasted = 0

    document.getElementById("taskStartTimeInput").value = toDateTimeLocal(startTime)
    document.getElementById("taskStopTimeInput").value = toDateTimeLocal(later)
}