const allTasks = document.querySelector(".tasks-grid");
const searchInput = document.getElementById("task-search");
const priorityFilterButtons = document.querySelectorAll(
  ".filter-pill[data-priority]",
);
const completedFilterButtons = document.querySelectorAll(
  ".filter-pill[data-completed]",
);
const profile = JSON.parse(localStorage.getItem("profile"));
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let teacherTasks = [];
tasks.forEach((task) => {
  if (task.teacher === profile.name) {
    teacherTasks.push(task);
  }
});
let activePriority = "all";
let activeCompleted = "all";
let searchQuery = "";

function getPriorityRank(priority) {
  const order = {
    high: 0,
    medium: 1,
    low: 2,
  };

  return order[priority] ?? 3;
}

function matchesSearch(task, query) {
  if (!query) return true;

  const searchableText = [
    task.headline,
    task.title,
    task.description,
    task.teacher,
    task.status,
    task.priority,
    task.madeBy,
    task.madeby,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return searchableText.includes(query);
}

function isTaskCompleted(task) {
  const status = task.status;
  const progress = Number(task.progress);

  return status === "completed" || progress >= 100;
}

function getFilteredTasks() {
  return teacherTasks
    .filter((task) => {
      const priorityMatches =
        activePriority === "all" || task.priority === activePriority;
      const completedMatches =
        activeCompleted === "all" ||
        (activeCompleted === "completed" && isTaskCompleted(task)) ||
        (activeCompleted === "pending" && !isTaskCompleted(task));

      return (
        priorityMatches && completedMatches && matchesSearch(task, searchQuery)
      );
    })
    .sort((firstTask, secondTask) => {
      const priorityDifference =
        getPriorityRank(firstTask.priority) -
        getPriorityRank(secondTask.priority);

      if (priorityDifference !== 0) {
        return priorityDifference;
      }

      return (firstTask.headline || "").localeCompare(
        secondTask.headline || "",
      );
    });
}

function renderTasks() {
  const filteredTasks = getFilteredTasks();

  if (!filteredTasks.length) {
    allTasks.innerHTML = `
      <div class="task-card task-card-empty">
        <h2 class="task-card-title">No tasks found</h2>
        <p class="task-card-assignee">Try another priority/status filter or search term.</p>
      </div>
    `;
    return;
  }

  let html = "";

  filteredTasks.forEach((task) => {
    const priority = task.priority || "low";

    html += `
        <article class="task-card" data-id="${task.id}">
          <div class="task-card-top">
            <span class="priority-badge priority-badge-${priority}"
              >${priority.toUpperCase()} PRIORITY</span
            >
            <button class= "mark-completed ${isTaskCompleted(task) ? "done" : ""}" data-id="${task.id}">${isTaskCompleted(task) ? "Mark as Pending" : "Mark as Completed"}</button>
          </div>
          <h2 class="task-card-title" data-id="${task.id}">
            ${task.headline}
          </h2>
          <p class="task-card-assignee">
            <i class="fa-regular fa-user" aria-hidden="true"></i>
            Prof. ${task.teacher}
          </p>
          
        <p class="task-card-created">
            Created by: ${task.madeBy || task.madeby || "Unknown"}
          </p>

        <div class="task-card-progress">
          <div class="progress-head">
            <span class="progress-label">PROGRESS</span>
            <span class="progress-value">${task.progress || 0}%</span>
          </div>
          <div class="progress-track">
            <div class="progress-fill progress-fill-cyan"
              style="width: ${task.progress || 0}%">
            </div>
          </div>
        </article>
    `;
  });

  allTasks.innerHTML = html;
}

priorityFilterButtons.forEach((button) =>
  button.addEventListener("click", () => {
    activePriority = button.getAttribute("data-priority") || "all";

    priorityFilterButtons.forEach((btn) =>
      btn.classList.toggle(
        "active",
        btn.getAttribute("data-priority") === activePriority,
      ),
    );

    renderTasks();
  }),
);
completedFilterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeCompleted = button.getAttribute("data-completed") || "all";

    completedFilterButtons.forEach((filterButton) => {
      filterButton.classList.toggle(
        "active",
        filterButton.getAttribute("data-completed") === activeCompleted,
      );
    });

    renderTasks();
  });
});
searchInput?.addEventListener("input", () => {
  searchQuery = searchInput.value.trim().toLowerCase();
  renderTasks();
});

renderTasks();

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("task-card-title")) {
    const taskId = e.target.getAttribute("data-id");
    window.location.href = `/shared/task-details.html?id=${taskId}`;
  }
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("mark-completed")) {
    const taskId = e.target.getAttribute("data-id");
    const taskIndex = tasks.findIndex((t) => t.id === taskId);

    if (taskIndex !== -1) {
      if (tasks[taskIndex].status === "completed") {
        tasks[taskIndex].status = "pending";
        tasks[taskIndex].progress = 0;
      } else {
        tasks[taskIndex].status = "completed";
        tasks[taskIndex].progress = 100;
      }

      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
    }
  }
});
