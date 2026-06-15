//24h clock (00:00 -> 23:00)
const timeCol = document.getElementById("timeCol");
const dayCol  = document.getElementById("dayCol");

function formatTime(hour){
    const isPM = hour >= 12;
    const h12 = ((hour + 11) % 12) + 1;
    const suffix = isPM ? "PM" : "AM";
    return `${h12}:00 ${suffix}`;
}

// exmaple take time 1:13 and convert it to 01:13
function formatTimeTo24Hours(time) {

    const hours = time.substring(0, time.indexOf(":"))
    const minutes = time.substring(time.indexOf(":") + 1, time.length)

    // const hours = time.substring(0,1).padStart(2, "0")
    // const minutes = time.substring(2,4).padStart(2, "")
    return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`
}

for (let h = 0; h < 24; h++){
    const tRow = document.createElement("div");
    tRow.className = "timeRow";

    const label = document.createElement("div");
    label.className = "timeLabel";
    label.textContent = formatTime(h);

    tRow.appendChild(label);
    timeCol.appendChild(tRow);
    
    const line = document.createElement("div");
    line.className = "hourLine";

    if (h == 7) {
	line.id = "loadTimetablePageTo"
    }

    dayCol.appendChild(line);
}
//             0123456789
//from example 26/01/2026 to 26-01-2026
function formatDate(date){
    const formatted_date = date.substring(0,2)
    const month = date.substring(3,5)
    const fullYear = date.substring(6,10)

    console.log("THE FORMATTED DATE")
    console.log(`${formatted_date}-${month}-${fullYear}`)

    return `${fullYear}-${month}-${formatted_date}`
}

const params = new URLSearchParams(window.location.search);
let date = params.get("date") ? new Date(formatDate(params.get("date"))) : new Date();

document.getElementById("todayBtn").addEventListener("click", () => {
    date = new Date()
    console.log(date)
    window.location.href = `/tasks?date=${date.toLocaleDateString()}#loadTimetablePageTo`;
});
document.getElementById("prevBtn").addEventListener("click", () => {
    console.log(date)
    if (date) {
        date.setDate(date.getDate() - 1)
        window.location.href = `/tasks?date=${date.toLocaleDateString()}#loadTimetablePageTo`;
    }
    console.log("prevBtn button clicked")
});
document.getElementById("nextBtn").addEventListener("click", () => {
    console.log(date)
    if (date) {
        date.setDate(date.getDate() + 1)
        window.location.href = `/tasks?date=${date.toLocaleDateString()}#loadTimetablePageTo`;
    }
    console.log("nextBtn button clicked")
});


function divById(task_id) {
    console.log(`You clicked on ${task_id}`)
    const divItem = document.getElementById(task_id);

    const openButton = document.querySelector("[data-open-modal]")
    const closeButton = document.querySelector("[data-close-modal]")
    const modal = document.querySelector("[data-modal]")

    modal.showModal()

    closeButton.onclick = () => modal.close();

    console.log("THE START HOUR MINUTE IS ")
    console.log(divItem.querySelector(".start_hour_minute").textContent)

    document.getElementById("taskIdModel").value = task_id
    document.getElementById("taskStartTimeInputModal").value = `${formatDate(params.get("date"))}T${formatTimeTo24Hours(divItem.querySelector(".start_hour_minute").textContent)}`;
    document.getElementById("taskStopTimeInputModal").value = `${formatDate(params.get("date"))}T${formatTimeTo24Hours(divItem.querySelector(".stop_hour_minute").textContent)}`;
    document.getElementById("taskNameInputModal").value = divItem.querySelector(".task_name").textContent;
    document.getElementById("taskDescriptionInputModal").value = divItem.querySelector(".task_description").textContent;
    document.getElementById("timeWastedModal").value = divItem.querySelector(".time_wasted").textContent;
    document.getElementById("deleteTaskButton").onclick = function () {
        deleteTaskButtonClick(task_id); // LEARN
    }
}

async function deleteTaskButtonClick(task_id) {
    console.log(`PERFORM THE DELETE FOR ${task_id}`)

    if (confirm("Are you sure you want to delete the task!") == true) {
        try {
            delete_response = await fetch("/deleteTask", {
                method: "POST",
                body: JSON.stringify({
                    "task_id": task_id,
                }),
                headers: {
                    "Content-type": "application/json",
                },
            })

            if (!delete_response.ok) {
                throw new Error(`Response status: ${delete_response.status}`)
            }

            if (delete_response.redirected) {
                window.location.href = delete_response.url
            }
        } catch (error) {
            console.error(error.message);
        }
    }
}
