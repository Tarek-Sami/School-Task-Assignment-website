const profile = JSON.parse(localStorage.getItem("profile"));
const teachers = JSON.parse(localStorage.getItem("teachers")) || [];
const container = document.querySelector(".container");

function teacherDisplayName(teacherField) {
  const t = teachers.find(
    (x) => (x.username || x.user) === teacherField || x.name === teacherField,
  );
  return t ? t.name : teacherField;
}
const title = document.querySelector("title");
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const adminTasks = tasks.filter((task) => task.madeBy === profile.username);
const teacherTasks = tasks.filter((task) => task.teacher === profile.username);
if (profile) {
  title.textContent = `${profile.username} - Profile`;
}

let adminCompeletedTasks = adminTasks.filter(
  (task) => task.status.toLowerCase() === "completed",
);
let teacherCompeletedTasks = teacherTasks.filter(
  (task) => task.status.toLowerCase() === "completed",
);
let completedTasks =
  profile.role === "admin" ? adminCompeletedTasks : teacherCompeletedTasks;

const priorityColors = {
  high: "red",
  medium: "blue",
  low: "cyan",
};
let tasksHtmlForTeacher =
  teacherTasks.length > 0
    ? teacherTasks
        .slice(0, 3)
        .map((task) => {
          const color = priorityColors[task.priority?.toLowerCase()] || "cyan";
          return `
          <div class="task">
            <div class="task-main">
              <i class="fa-solid fa-square-poll-horizontal text-red"></i>
              <div class="task-det">
                <h4>${task.title}</h4>
                <p>
                  <i class="fa-solid fa-user task-user-ic"></i> ${teacherDisplayName(task.teacher)}
                </p>
              </div>
            </div>
            <div class="task-meta">
              <div class="tags">
                <span class="tag bg-${color} text-${color}">
                  ${task.priority}
                </span>
                <span class="tag bg-purple text-purple">
                  ${task.status}
                </span>
              </div>
              <div class="task-pct">${task.progress}%</div>
            </div>
          </div>
        `;
        })
        .join("")
    : "<p>No tasks available.</p>";
let tasksHtmlForAdmin =
  adminTasks.length > 0
    ? adminTasks
        .slice(0, 3)
        .map((task) => {
          const color = priorityColors[task.priority?.toLowerCase()] || "cyan";

          return `
          <div class="task">
            <div class="task-main">
              <i class="fa-solid fa-square-poll-horizontal text-red"></i>
              <div class="task-det">
                <h4>${task.title}</h4>
                <p>
                  <i class="fa-solid fa-user task-user-ic"></i> ${teacherDisplayName(task.teacher)}
                </p>
              </div>
            </div>
            <div class="task-meta">
              <div class="tags">
                <span class="tag bg-${color} text-${color}">
                  ${task.priority}
                </span>
                <span class="tag bg-purple text-purple">
                  ${task.status}
                </span>
              </div>
              <div class="task-pct">${task.progress}%</div>
            </div>
          </div>
        `;
        })
        .join("")
    : "<p>No tasks available.</p>";
let html = ``;
let imageName = profile.name.split(" ");
if (profile) {
  html = `<div class="hero card">
        <div class="hero-info-box">
          <div class="avatar-ring">
            <img
              src="https://ui-avatars.com/api/?name=${imageName[1]}+${imageName[2] || ""}&background=f0e6ff&color=6142db&size=150"
              alt="Profile photo"
              class="avatar-img"
            />
          </div>
          <div class="hero-details">
            <h1>${profile.name}</h1>
            <div class="tags">
              <span class="tag tag-purple">${profile.role}</span>
            </div>
            <p class="email">
              <i class="fa-regular fa-envelope"></i> ${profile.email}
            </p>
          </div>
        </div>
        <div class="hero-actions">
          <a href="edit-profile.html" class="btn btn-primary"
            ><i class="fa-solid fa-pen"></i> Edit Profile</a
          >
          <a href="/${profile.role}/dashboard.html" class="btn btn-secondary"
            ><i class="fa-solid fa-house"></i> Home</a
          >
        </div>
      </div>

      <div class="stats">
        <div class="stat card">
          <div class="icon-box bg-purple">
            <i class="fa-solid fa-file-lines text-purple"></i>
          </div>
          <div class="stat-values">
            <h3><a href="/admin/tasks.html"> ${profile.role === "admin" ? adminTasks.length : teacherTasks.length} Tasks</a></h3>

          </div>
        </div>
        ${
          profile.role === "admin"
            ? `
        <div class="stat card">
          <div class="icon-box bg-blue">
            <i class="fa-solid fa-circle-check text-blue"></i>
          </div>
          <div class="stat-values"> 
            <h3><a href="/admin/manage-teachers.html">${teachers.length} Teachers</a></h3>
          </div>
        </div>`
            : ""
        }
        <div class="stat card stat-prog">
          <div class="icon-box bg-purple-light">
            <i class="fa-solid fa-user text-purple"></i>
          </div>
          <div class="prog-data">
            <div class="prog-head">
              <span>Completed Tasks</span>
              <strong>${(completedTasks.length / (profile.role === "admin" ? adminTasks.length : teacherTasks.length)) * 100}%</strong>
            </div>
            <div class="prog-track">
              <div class="prog-fill" style="width: ${(completedTasks.length / (profile.role === "admin" ? adminTasks.length : teacherTasks.length)) * 100}%"></div>
            </div>
          </div>
        </div>
      </div>


        <div class="col">
          <div class="card info">
            <div class="card-header">
              <i class="fa-solid fa-user"></i>
              <h2>Personal Information</h2>
            </div>
            <div class="info-list">
              <div class="info-row">
                <span class="info-label">Full Name</span>
                <div class="info-val">${profile.name}</div>
              </div>
              <div class="info-row">
                <span class="info-label">Email</span>
                <div class="info-val">${profile.email}</div>
              </div>
              <div class="info-row">
                <span class="info-label">Username</span>
                <div class="info-val">${profile.username}</div>
              </div>
              <div class="info-row">
                <span class="info-label">Role</span>
                <div class="info-val val-flex">
                  <span class="tag tag-admin">${profile.role}</span>
                </div>
              </div>
            </div>
          </div>


        <div class="col">
          <div class="card security">
            <div class="card-header">
              <i class="fa-solid fa-shield-halved"></i>
              <h2>Security</h2>
            </div>
            <div class="sec-top">
              <a
                href="../shared/change-password.html"
                class="btn btn-primary btn-sm"
                >Change Password</a
              >

            </div>
          </div>

          <div class="card my-tasks-card">
            <div class="card-header header-split">
              <div class="header-left">
                <i class="fa-solid fa-list-check"></i>
                <h2>My Tasks</h2>
              </div>
              ${
                profile.role === "admin"
                  ? `
              <a href="/admin/add-task.html" class="add-task-btn" title="Add New Task">
                <i class="fa-solid fa-plus"></i>
              </a>`
                  : ""
              }
            </div>
            <div class="tasks-list">
              ${profile.role === "admin" ? tasksHtmlForAdmin : tasksHtmlForTeacher}
            </div>
            <a href="/${profile.role}/${profile.role === "admin" ? "tasks" : "my-tasks"}.html" class="view-all"
              >View All Tasks <i class="fa-solid fa-chevron-right"></i
            ></a>
          </div>
        </div>
`;
}

container.innerHTML = html;
