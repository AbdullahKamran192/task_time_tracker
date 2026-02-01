var startTime;
var timeWastedSeconds;
var timerInterval;
var wasteTimerOn = false;
var wasteTimerInterval;
var wasteTimerStart;

function toDateTimeLocal(date) {
    const pad = n => String(n).padStart(2, "0");

    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

async function startTimer() {
    document.removeEventListener('keydown', handleKeyDownStart);
    document.addEventListener('keydown', handleKeyDownPause);
    document.addEventListener('keydown', handleKeyDownStop);
    document.getElementById("saveTaskForm").style.visibility = "hidden";
    startTime = new Date()
    startTime.getMonth()
    document.getElementById("startTimerButton").style.color = "red";
    document.getElementById("wasteTimeIncrementButton").style.visibility = "visible";
    timeWastedSeconds = 0
    document.getElementById("showTimeWasted").innerHTML = `time wasted: 00:00:00`
    timerInterval = setInterval(() => {
        const now = new Date();
        const elapsed = now - startTime; // in milliseconds

        const hours = Math.floor(elapsed / (3600000))
        const minutes = Math.floor((elapsed % (3600000)) / (60000))
        const seconds = Math.floor(((elapsed % (3600000)) % (60000)) / 1000)
        document.getElementById("showTimeElapsed").innerHTML = `stopwatch: ${String(hours).padStart(2,"0")}:${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;
    }, 1000);
}

function incrementTimeWasted() {
    timeWastedSeconds = timeWastedSeconds + 60;
    console.log(`the new timeWasted ${timeWastedSeconds}`)
}

function stopTimer(){
    document.removeEventListener('keydown', handleKeyDownStop);
    document.removeEventListener('keydown', handleKeyDownPause)
    document.addEventListener('keydown', handleKeyDownStart);
    clearInterval(wasteTimerInterval)
    clearInterval(timerInterval)
    const later = new Date()
    const timeSpent = (later - startTime)

    // if the waste timer was on and the user stopped the task timer.
    if (wasteTimerOn == true) {
        clearInterval(wasteTimerInterval)
        const wasteTimeElapsed = (new Date()) - wasteTimerStart; // in milliseconds
        console.log(`WASTE TIME ${wasteTimeElapsed}`)
        timeWastedSeconds = timeWastedSeconds + Math.floor(wasteTimeElapsed / 1000)
        wasteTimerOn = false
    }

    document.getElementById("wasteTimeIncrementButton").style.visibility = "hidden";

    //document.getElementById("showTimeElapsed").innerHTML = timeSpent;

    document.getElementById("stopTimerButton").style.color = "green";

    document.getElementById("saveTaskForm").style.visibility = "visible";

    document.getElementById("timeWastedInput").value = Math.floor(timeWastedSeconds / 60);
    timeWastedSeconds = 0

    document.getElementById("taskStartTimeInput").value = toDateTimeLocal(startTime)
    document.getElementById("taskStopTimeInput").value = toDateTimeLocal(later)
}

function pauseTimer() {
    //clearInterval()
}

function handleKeyDownStart(event) {
    if (event.ctrlKey && event.altKey && event.key === '/') {
        console.log("Ctrl + Alt + / pressed. Timer STARTED")
        startTimer()
    }  
}

function handleKeyDownStop(event) {
    if (event.ctrlKey && event.altKey && event.key === 'm') {
        console.log("Ctrl + Alt + m pressed. Timer STOPPED")
        stopTimer()
    }
}

function handleKeyDownPause(event) {
    if (event.ctrlKey && event.altKey && event.key === 'k'){
        console.log("Ctrl + Alt + k pressed. Timer PAUSED")
        if (wasteTimerOn == false) {
            wasteTimerStart = new Date()
            wasteTimerInterval = setInterval(() => {
                const wasteTimeNow = new Date()
                const wasteTimeElapsed = (wasteTimeNow - wasteTimerStart) + Math.floor((timeWastedSeconds * 1000)) // in milliseconds

                const wasteTimehours = Math.floor(wasteTimeElapsed / (3600000))
                const wasteTimeminutes = Math.floor((wasteTimeElapsed % (3600000)) / (60000))
                const wasteTimeseconds = Math.floor(((wasteTimeElapsed % (3600000)) % (60000)) / 1000)

                document.getElementById("showTimeWasted").innerHTML = `time wasted: ${String(wasteTimehours).padStart(2, "0")}:${String(wasteTimeminutes).padStart(2, "0")}:${String(wasteTimeseconds).padStart(2, "0")}`

                // timeWastedSeconds = timeWastedSeconds + Math.round(wasteTimeElapsed / 60)
            }, 1000)
            wasteTimerOn = true
        } else {
            clearInterval(wasteTimerInterval)
            const wasteTimeElapsed = (new Date()) - wasteTimerStart; // in milliseconds
            console.log(`WASTE TIME ${wasteTimeElapsed}`)
            timeWastedSeconds = timeWastedSeconds + Math.floor(wasteTimeElapsed / 1000)
            wasteTimerOn = false
        }
    }
}

document.addEventListener('keydown', handleKeyDownStart);
