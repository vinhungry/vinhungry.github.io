let selectedDate = "";

function createCalendar() {
    const calendar = document.getElementById("calendar");
    const title = document.getElementById("calendarTitle");

    calendar.innerHTML = "";

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    title.textContent = `${monthNames[month]} ${year}`;

    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    for (let i = 0; i < weekdays.length; i++) {
        const weekdayDiv = document.createElement("div");
        weekdayDiv.className = "weekday";
        weekdayDiv.textContent = weekdays[i];
        calendar.appendChild(weekdayDiv);
    }

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDayOfMonth; i++) {
        const emptyDiv = document.createElement("div");
        emptyDiv.className = "empty";
        calendar.appendChild(emptyDiv);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dateKey = `${year}-${month + 1}-${day}`;

        const dayDiv = document.createElement("div");
        dayDiv.className = "day";
        dayDiv.textContent = day;

        if (
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
        ) {
            dayDiv.classList.add("today");
        }

        if (localStorage.getItem(dateKey)) {
            dayDiv.classList.add("has-note");
        }

        dayDiv.onclick = function () {
            selectedDate = dateKey;
            document.getElementById("selectedDate").textContent = `Note for ${monthNames[month]} ${day}, ${year}`;
            document.getElementById("noteInput").value = localStorage.getItem(dateKey) || "";
        };

        calendar.appendChild(dayDiv);
    }
}

function saveNote() {
    if (selectedDate === "") {
        alert("Please select a date first.");
        return;
    }

    const note = document.getElementById("noteInput").value;
    localStorage.setItem(selectedDate, note);

    alert("Note saved!");
    createCalendar();
}

createCalendar();
