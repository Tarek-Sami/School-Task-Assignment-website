const allTasks = document.querySelector(".tasks-grid");
const searchInput = document.getElementById("task-search");
const filterButtons = document.querySelectorAll(".filter-pill");

const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let activePriority = "all";
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

function getFilteredTasks() {
  return tasks
    .filter((task) => {
      const priorityMatches =
        activePriority === "all" || task.priority === activePriority;

      return priorityMatches && matchesSearch(task, searchQuery);
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
        <p class="task-card-assignee">Try another priority filter or search term.</p>
      </div>
    `;
    return;
  }

  let html = "";

  filteredTasks.forEach((task) => {
    const priority = task.priority || "low";

    html += `
        <article class="task-card">
          <div class="task-card-top">
            <span class="priority-badge priority-badge-${priority}"
              >${priority.toUpperCase()} PRIORITY</span
            >
            <button
              type="button"
              class="task-card-menu"
              aria-label="Task options"
            >
              <i class="fa-solid fa-ellipsis-vertical"></i>
            </button>
          </div>
          <h2 class="task-card-title">${task.headline}</h2>
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

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activePriority = button.dataset.priority || "all";

    filterButtons.forEach((filterButton) => {
      filterButton.classList.toggle(
        "active",
        filterButton.dataset.priority === activePriority,
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
