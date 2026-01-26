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

document.getElementById("todayBtn").addEventListener("click", () => {
    console.log("today button clicked")
});
document.getElementById("prevBtn").addEventListener("click", () => {
    console.log("prevBtn button clicked")
});
document.getElementById("nextBtn").addEventListener("click", () => {
    console.log("nextBtn button clicked")
});