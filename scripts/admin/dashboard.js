const allTasks = document.querySelector(".task-list");
const profile = JSON.parse(localStorage.getItem("profile"));
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
function teacherDisplayName(teacherField) {
  const list = JSON.parse(localStorage.getItem("teachers")) || [];
  const t = list.find(
    (x) => (x.username || x.user) === teacherField || x.name === teacherField,
  );
  return t ? t.name : teacherField;
}
const adminTasks = tasks.filter((task) => task.madeBy === profile.username);
const priorityOrder = {
  high: 0,
  medium: 1,
  low: 2,
};
let html = "";

adminTasks
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
            <div class="task-info">
<h4 id="task-headline"><a href="../shared/task-details.html?id=${task.id}" class="task-headline-link">${task.headline}</a></h4>
              <p id="task-teacher">
                <img
                  src="https://ui-avatars.com/api/?name=Aris&background=E5E7EB&color=374151&size=24&rounded=true"
                  class="avatar"
                  alt="Avatar"
                />
                Assigned to Prof. ${teacherDisplayName(task.teacher)}
              </p>
            </div>
          </div>
          <div class="task-right">
            <span class="priority ${task.priority}">${task.priority.toUpperCase()} PRIORITY</span>
            <span class="date">
              <i class="fa-regular fa-calendar"></i> ${task.deadline}
            </span>
            <div class="actions">
              <a href="edit-task.html?id=${task.id}"><i class="fa-solid fa-pen"></i></a>
              <button class="delete-btn" data-id="${task.id}">
  <i class="fa-solid fa-trash"></i>
</button>
            </div>
          </div>
        </div>`;
  });

if (!html) {
  html = `
            <div class="task-card task-card-empty">
        <h2 class="task-card-title">No tasks found</h2>
      </div>`;
}
allTasks.innerHTML = html;

const total = adminTasks.length;
const completed = adminTasks.filter(
  (task) => task.status === "completed",
).length;
const pending = adminTasks.filter((task) => task.status === "pending").length;
const teachers = JSON.parse(localStorage.getItem("teachers"))?.length || 0;

document.getElementById("total-tasks").textContent = total;
document.getElementById("completed-tasks").textContent = completed;
document.getElementById("pending-tasks").textContent = pending;
document.getElementById("teachers-count").textContent = teachers;
