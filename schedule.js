let courses = JSON.parse(localStorage.getItem("courses")) || [];

function addCourse() {
    const courseName = document.getElementById("courseName").value;
    const teacherName = document.getElementById("teacherName").value;
    const location = document.getElementById("location").value;
    const roomNumber = document.getElementById("roomNumber").value;
    const startTime = document.getElementById("startTime").value;
    const endTime = document.getElementById("endTime").value;
    const courseColor = document.getElementById("courseColor").value;

    const selectedDays = [];
    const checkboxes = document.querySelectorAll(".day-checkboxes input[type='checkbox']");

    checkboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            selectedDays.push(checkbox.value);
        }
    });

    if (
        courseName === "" ||
        teacherName === "" ||
        location === "" ||
        roomNumber === "" ||
        startTime === "" ||
        endTime === "" ||
        selectedDays.length === 0
    ) {
        alert("Please fill out all fields and choose at least one day.");
        return;
    }

    const course = {
        courseName: courseName,
        teacherName: teacherName,
        location: location,
        roomNumber: roomNumber,
        startTime: startTime,
        endTime: endTime,
        courseColor: courseColor,
        days: selectedDays
    };

    courses.push(course);
    localStorage.setItem("courses", JSON.stringify(courses));

    clearForm();
    displaySchedule();
}

function displaySchedule() {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

    days.forEach(function(day) {
        document.getElementById(day).innerHTML = "";
    });

    courses.forEach(function(course, index) {
        course.days.forEach(function(day) {
            const courseDiv = document.createElement("div");
            courseDiv.className = "course-card";
            courseDiv.style.backgroundColor = course.courseColor;

            courseDiv.innerHTML = `
                <strong>${course.courseName}</strong><br>
                ${course.startTime} - ${course.endTime}<br>
                Professor: ${course.teacherName}<br>
                Location: ${course.location}, Room ${course.roomNumber}<br>
                <button onclick="deleteCourse(${index})">Delete</button>
            `;

            document.getElementById(day).appendChild(courseDiv);
        });
    });
}

function deleteCourse(index) {
    courses.splice(index, 1);
    localStorage.setItem("courses", JSON.stringify(courses));
    displaySchedule();
}

function clearSchedule() {
    if (confirm("Are you sure you want to clear your whole schedule?")) {
        courses = [];
        localStorage.removeItem("courses");
        displaySchedule();
    }
}

function clearForm() {
    document.getElementById("courseName").value = "";
    document.getElementById("teacherName").value = "";
    document.getElementById("location").value = "";
    document.getElementById("roomNumber").value = "";
    document.getElementById("startTime").value = "";
    document.getElementById("endTime").value = "";
    document.getElementById("courseColor").value = "#8ecae6";

    const checkboxes = document.querySelectorAll(".day-checkboxes input[type='checkbox']");
    checkboxes.forEach(function(checkbox) {
        checkbox.checked = false;
    });
}

displaySchedule();
