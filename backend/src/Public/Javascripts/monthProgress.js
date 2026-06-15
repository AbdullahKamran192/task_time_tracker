const dataElement = document.getElementById("data");

if (!dataElement) {
    console.error("Data element not found");
}

const data = JSON.parse(dataElement.textContent || "{}");

const dailyTotals = data.dailyTotals || {};
const dailyFirstTask = data.dailyFirstTask || {}; 

console.log("dailyTotals:", dailyTotals); 

const container = document.getElementById("monthsContainer");
const yearDisplay = document.getElementById("yearDisplay");

//COLOR SYSTEM
const getColor = (minutes) => {
    if (minutes === 0) return "gray";
    if (minutes >= 480) return "darkgreen"; // 8h (elite)
    if (minutes >= 390) return "green";     // 6.5h (very strong)
    if (minutes >= 300) return "yellow";    // 5h (good)
    if (minutes >= 180) return "orange";    // 3h (okay)
    return "red";                           // low
};

const formatDateKey = (date) => {
    return (
        date.getFullYear() + "-" +
        String(date.getMonth() + 1).padStart(2, "0") + "-" +
        String(date.getDate()).padStart(2, "0")
    );
};

// CREATE MONTH
const createMonth = (year, month) => {
    const monthDiv = document.createElement("div");
    monthDiv.className = "month";
    monthDiv.dataset.year = year;

    const title = document.createElement("h2");
    title.innerText = new Date(year, month).toLocaleString("default", { month: "long" });
    monthDiv.appendChild(title);

    const grid = document.createElement("div");
    grid.className = "grid";

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let d = 1; d <= daysInMonth; d++) {
        const date = new Date(year, month, d);
        const key = formatDateKey(date);

        const minutes = dailyTotals[key] || 0;
        const taskName = dailyFirstTask[key] || "";

        //Convert minutes to hours (max 2 decimal places, clean)
        const hours = minutes > 0
            ? parseFloat((minutes / 60).toFixed(2))
            : "";

        const box = document.createElement("div");
        box.className = "day " + getColor(minutes);

        box.innerHTML = `
            <div class="day-number">${d}</div>
            <div class="hours-worked">${hours}</div>
            <div class="task-name">${taskName}</div>
        `;

        box.title = `${minutes.toFixed(0)} mins`;

        box.onclick = () => {
            const formatted =
                String(d).padStart(2, "0") + "/" +
                String(month + 1).padStart(2, "0") + "/" +
                year;

            window.location.href = `/tasks?date=${formatted}`;
        };

        grid.appendChild(box);
    }

    monthDiv.appendChild(grid);
    container.appendChild(monthDiv);
};

const dates = Object.keys(dailyTotals);

let startDate = dates.length ? new Date(dates[0]) : new Date();

dates.forEach(d => {
    const date = new Date(d);
    if (date < startDate) startDate = date;
});

const startYear = startDate.getFullYear();
const currentYear = new Date().getFullYear();

// GENERATE MONTHS
for (let year = startYear; year <= currentYear; year++) {
    for (let month = 0; month < 12; month++) {
        if (year === startYear && month < startDate.getMonth()) continue;
        createMonth(year, month);
    }
}

// SCROLL YEAR UPDATE
window.addEventListener("scroll", () => {
    const months = document.querySelectorAll(".month");

    months.forEach((month) => {
        const rect = month.getBoundingClientRect();

        if (rect.top < 150 && rect.bottom > 150) {
            yearDisplay.innerText = month.dataset.year;
        }
    });
});