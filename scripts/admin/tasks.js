const allTasks = document.querySelector(".tasks-grid");
const searchInput = document.querySelector(".search-wrap input");
const filterButtons = document.querySelectorAll(".filter-pill");

const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";
let currentSearch = "";

function sortTasks(tasksArray) {
  const order = { high: 1, medium: 2, low: 3 };

  return tasksArray.sort((a, b) => {
    return order[a.priority] - order[b.priority];
  });
}


function renderTasks(tasksArray) {
  let html = "";

  tasksArray.forEach((task) => {
    html += `
      <article class="task-card">
        <div class="task-card-top">
          <span class="priority-badge priority-badge-${task.priority}">
            ${task.priority.toUpperCase()} PRIORITY
          </span>
          <button type="button" class="task-card-menu">
            <i class="fa-solid fa-ellipsis-vertical"></i>
          </button>
        </div>

        <h2 class="task-card-title">${task.headline}</h2>

        <p class="task-card-assignee">
          <i class="fa-regular fa-user"></i>
          Prof. ${task.teacher}
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
        </div>
      </article>`
    ;
  });

  allTasks.innerHTML = html;
}

function updateTasks() {
  let result = [...tasks];

  if (currentFilter !== "all") {
    result = result.filter(task => task.priority === currentFilter);
  }

  if (currentSearch !== "") {
    result = result.filter(task =>
      task.headline.toLowerCase().includes(currentSearch) ||
      task.teacher.toLowerCase().includes(currentSearch) ||
      task.priority.toLowerCase().includes(currentSearch)
    );
  }

  result = sortTasks(result);

  renderTasks(result);
}

searchInput.addEventListener("input", () => {
  currentSearch = searchInput.value.toLowerCase();
  updateTasks();
});

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    currentFilter = btn.textContent.toLowerCase();
    updateTasks();
  });
});

updateTasks();
