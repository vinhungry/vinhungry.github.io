let selectedDate = "";

function createCalendar() {
    const calendar = document.getElementById("calendar");
    calendar.innerHTML = "";

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
        const dateKey = `${year}-${month + 1}-${day}`;

        const dayDiv = document.createElement("div");
        dayDiv.className = "day";
        dayDiv.textContent = day;

        if (localStorage.getItem(dateKey)) {
            dayDiv.classList.add("has-note");
        }

        dayDiv.onclick = function () {
            selectedDate = dateKey;
            document.getElementById("selectedDate").textContent = "Note for " + dateKey;
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
