let role = localStorage.getItem("role");
const params = new URLSearchParams(window.location.search);
let taskId = params.get("id");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let task = tasks.find((t) => t.id === taskId);
let taskPage = document.querySelector(".task-page");
let roleButton = "";
let roleProgressControls = "";

if (role === "admin") {
  roleProgressControls = "";
} else if (role === "teacher") {
  roleProgressControls = ` <div class="progress-controls">
              <div class="quick-select">
                <button class="percent-btn" type="button">25%</button>
                <button class="percent-btn" type="button">50%</button>
                <button class="percent-btn " type="button">75%</button>
                <button class="percent-btn" type="button">100%</button>
              </div>

              <input type="range" min="0" max="100" value="${task.progress}" />
            </div>`;
}
if (role === "admin") {
  roleButton = `<button id="editBtn" class="edit-btn" type="button">
    <i class="fa-solid fa-pen-to-square" aria-hidden="true"></i>
    Edit Task
  </button>`;
} else if (role === "teacher") {
  roleButton = `<button id="completeBtn" class="complete-btn" type="button">
    <i class="fa-regular fa-circle-check" aria-hidden="true"></i>
    Mark as Completed
  </button>`;
}

taskPage.innerHTML = ` <section class="task-hero">
        <div class="hero-content">
          <div class="badge-row">
            <span class="badge badge-priority">${task.priority} Priority</span>
          </div>

          <h1 class="task-title">
            ${task.headline}
          </h1>

          <div class="meta-row">
            <div class="meta-item">
              <div class="meta-avatar">
                <i class="fa-solid fa-user-tie" aria-hidden="true"></i>
              </div>
              <div>
                <p class="meta-label">Assigned By</p>
                <p class="meta-value">${task.madeBy}</p>
              </div>
            </div>

            <div class="meta-item with-border">
              <div>
                <p class="meta-label">Due Date</p>
                <p class="meta-value">${task.deadline}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="hero-actions">
        </div>
      </section>
      <section class="content-grid">
        <div class="main-col">
          <article class="card progress-card">
            <div class="progress-head">
              <p class="section-label">Progress</p>
              <div class="progress-value">
                <p class="progress-number">${task.progress}%</p>
                <span class="badge badge-status">${task.status === "pending" ? "Pending" : "Completed"}</span>
              </div>
            </div>

            <div class="progress-track">
              <div class="progress-fill" style="width: ${task.progress}%"></div>
            </div>

            <p class="progress-note">
              Keep up the great work! You're almost there.
            </p>
          ${role === "teacher" ? roleProgressControls : ""}
     
          </article>

          <section class="description-section">
            <h2>Project Description</h2>
            <article class="card description-card">
              <p>
               ${task.description}
              </p>
            </article>
          </section>
        </div>

        <aside class="side-col">
          <article class="card assets-card">
            <p class="section-label">Assets &amp; Links</p>
            <a class="link-row" href="#">
              <span class="link-icon"
                ><i class="fa-regular fa-folder-open"></i
              ></span>
              <span>bauhaus_assets_v2.zip</span>
            </a>
            <a class="link-row" href="#" aria-label="Open design guidelines">
              <span class="link-icon"><i class="fa-solid fa-link"></i></span>
              <span>Design Guidelines PDF</span>
            </a>
          </article>
          <div class="complete-wrap">
          ${roleButton}
          </div>
        </aside>
      </section>`;

const completeBtn = document.getElementById("completeBtn");
const editBtn = document.querySelector(".edit-btn");
const progressNumber = document.querySelector(".progress-number");
const progressFill = document.querySelector(".progress-fill");
const statusBadge = document.querySelector(".badge-status");
const rangeInput = document.querySelector('input[type="range"]');
const percentButtons = document.querySelectorAll(".percent-btn");
const quickSelectButtons = document.querySelectorAll(".percent-btn");
function editButtonHandler() {
  window.location.href = `../admin/edit-task.html?id=${task.id}`;
}
editBtn?.addEventListener("click", editButtonHandler);
function updateStatus(percentage) {
  if (percentage === 100) {
    task.status = "completed";
    statusBadge.textContent = "Completed";
  } else {
    task.status = "pending";
    statusBadge.textContent = "Pending";
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

quickSelectButtons.forEach((button) => {
  button.addEventListener("click", () => {
    quickSelectButtons.forEach((btn) => btn.classList.remove("active"));

    button.classList.add("active");

    const percentage = parseInt(button.textContent);

    rangeInput.value = percentage;
    progressNumber.textContent = `${percentage}%`;
    progressFill.style.width = `${percentage}%`;

    task.progress = percentage;

    updateStatus(percentage);
  });
});

rangeInput.addEventListener("input", () => {
  const percentage = parseInt(rangeInput.value);
  progressNumber.textContent = `${percentage}%`;
  progressFill.style.width = `${percentage}%`;
  task.progress = percentage;
  updateStatus(percentage);
});

completeBtn?.addEventListener("click", () => {
  if (task.status === "pending") {
    task.status = "completed";
    statusBadge.textContent = "Completed";
    task.progress = 100;
    progressNumber.textContent = "100%";
    progressFill.style.width = "100%";
    rangeInput.value = 100;
    quickSelectButtons.forEach((btn) => btn.classList.remove("active"));
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
