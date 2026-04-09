const allTasks = document.querySelector(".tasks-grid");

const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let html = "";

tasks.forEach((task) => {
  html += `
        <article class="task-card">
          <div class="task-card-top">
            <span class="priority-badge priority-badge-${task.priority}"
              >${task.priority.toUpperCase()} PRIORITY</span
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
          <div class="task-card-progress">
            <div class="progress-head">
              <span class="progress-label">PROGRESS</span>
              <span class="progress-value">84%</span>
            </div>
            <div class="progress-track">
              <div
                class="progress-fill progress-fill-cyan"
                style="width: 84%"
              ></div>
            </div>
          </div>
        </article>
    `;
});

allTasks.innerHTML = html;
