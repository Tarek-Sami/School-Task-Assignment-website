if (!localStorage.getItem("tasks")) {
  const initialTasks = [
    {
      id: crypto.randomUUID(),
      headline: "Prepare Midterm Exam",
      title: "Math Exam Setup",
      description: "Prepare questions and review topics",
      priority: "high",
      teacher: "Ahmed",
      deadline: "2026-05-10",
      status: "pending",
      madeBy: "Ahmed Ali",
      proggress: 0,
    },
    {
      id: crypto.randomUUID(),
      headline: "Weekly Assignment",
      title: "Physics Homework",
      description: "Chapter 3 problems",
      priority: "medium",
      teacher: "Sara",
      deadline: "2026-04-20",
      status: "pending",
      madeBy: "Alex Johnson",
      proggress: 0,
    },
    {
      id: crypto.randomUUID(),
      headline: "Project Review",
      title: "AI Project",
      description: "Review student submissions",
      teacher: "Mohamed",
      deadline: "2026-04-25",
      priority: "low",
      status: "pending",
      madeBy: "Alex Johnson",
      proggress: 0,
    },
  ];

  localStorage.setItem("tasks", JSON.stringify(initialTasks));
}

// start of the code

const allTasks = document.querySelector(".task-list");

const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const priorityOrder = {
  high: 0,
  medium: 1,
  low: 2,
};

let html = "";

tasks
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
    html += `<div class="task" data-id="${task.id}">
          <div class="task-left">
            <div class="task-info">
              <h4 id="task-headline">${task.headline}</h4>
              <p id="task-teacher">
                <img
                  src="https://ui-avatars.com/api/?name=Aris&background=E5E7EB&color=374151&size=24&rounded=true"
                  class="avatar"
                  alt="Avatar"
                />
                Assigned to Prof. ${task.teacher}
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

allTasks.innerHTML = html;

const total = tasks.length;
const completed = tasks.filter((task) => task.status === "completed").length;
const pending = tasks.filter((task) => task.status === "pending").length;
const teachers = [...new Set(tasks.map((task) => task.teacher))].length;

document.getElementById("total-tasks").textContent = total;
document.getElementById("completed-tasks").textContent = completed;
document.getElementById("pending-tasks").textContent = pending;
document.getElementById("teachers-count").textContent = teachers;
