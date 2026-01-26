//24h clock (00:00 -> 23:00)
const timeCol = document.getElementById("timeCol");
const dayCol  = document.getElementById("dayCol");

function formatTime(hour){
    const isPM = hour >= 12;
    const h12 = ((hour + 11) % 12) + 1;
    const suffix = isPM ? "PM" : "AM";
    return `${h12}:00 ${suffix}`;
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
    window.location.href = `/tasks?date=${date.toLocaleDateString()}`;
});
document.getElementById("prevBtn").addEventListener("click", () => {
    console.log(date)
    if (date) {
        date.setDate(date.getDate() - 1)
        window.location.href = `/tasks?date=${date.toLocaleDateString()}`;
    }
    console.log("prevBtn button clicked")
});
document.getElementById("nextBtn").addEventListener("click", () => {
    console.log(date)
    if (date) {
        date.setDate(date.getDate() + 1)
        window.location.href = `/tasks?date=${date.toLocaleDateString()}`;
    }
    console.log("nextBtn button clicked")
});


function divById(task_id) {
    console.log(`You clicked on ${task_id}`)
}

const divItem = document.getElementById('11');
divItem.style.background = "red"