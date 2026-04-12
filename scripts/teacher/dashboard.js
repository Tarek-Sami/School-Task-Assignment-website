const allTasks = document.querySelector(".task-list");
const profile = JSON.parse(localStorage.getItem("profile"));
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const teacherTasks = [];
tasks.forEach((task) => {
  if (task.teacher === profile.username) {
    teacherTasks.push(task);
  }
});

const priorityOrder = {
  high: 0,
  medium: 1,
  low: 2,
};

let html = "";

teacherTasks
  .slice()
  .sort((firstTask, secondTask) => {
    const priorityDifference =
      (priorityOrder[firstTask.priority] ?? 3) -
      (priorityOrder[secondTask.priority] ?? 3);

    if (priorityDifference !== 0) {
      return priorityDifference;
    }

    return (firstTask.headline || "").localeCompare(secondTask.headline || "");
  })
  .forEach((task) => {
    html += `<div class="task ${task.status === "completed" ? "complete" : ""}" data-id="${task.id}">
          <div class="task-left">
            <input type="checkbox" class="task-checkbox" ${task.status === "completed" ? "checked" : ""}/>
            <div class="task-info">
              <h4 id="task-headline"><a href="../../shared/task-details.html?id=${task.id}" class="task-headline-link">${task.headline}</a></h4>
              <p id="task-teacher">
                <img
                  src="https://ui-avatars.com/api/?name=Aris&background=E5E7EB&color=374151&size=24&rounded=true"
                  class="avatar"
                  alt="Avatar"
                />
                Assigned by ${task.madeBy || task.madeby || "Unknown"}
              </p>
            </div>
          </div>
          <div class="task-right">
            <span class="priority ${task.priority}">${task.priority.toUpperCase()} PRIORITY</span>
            <span class="date">
              <i class="fa-regular fa-calendar"></i> ${task.deadline}
            </span>
          </div>
        </div>`;
  });

allTasks.innerHTML = html;

const total = teacherTasks.length;
const completed = teacherTasks.filter(
  (task) => task.status === "completed",
).length;
const pending = teacherTasks.filter((task) => task.status === "pending").length;

document.getElementById("total-tasks").textContent = total;
document.getElementById("completed-tasks").textContent = completed;
document.getElementById("pending-tasks").textContent = pending;

const checkboxes = document.querySelectorAll(".task-checkbox");
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", (e) => {
    const task = e.target.closest(".task");
    const taskId = task.getAttribute("data-id");
    const taskIndex = tasks.findIndex((t) => t.id === taskId);
    if (taskIndex !== -1) {
      tasks[taskIndex].status = e.target.checked ? "completed" : "pending";
      tasks[taskIndex].progress = e.target.checked ? 100 : 0;
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    if (e.target.checked) {
      task.classList.add("complete");
    } else {
      task.classList.remove("complete");
    }
  });
});
