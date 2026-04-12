// getting task id from URL
const params = new URLSearchParams(window.location.search);
const taskId = params.get("id");
const profile = JSON.parse(localStorage.getItem("profile"));
// getting tasks from localStorage
const teachers = JSON.parse(localStorage.getItem("teachers")) || [];
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const task = tasks.find((t) => t.id === taskId);

// Html elements
const modal = document.querySelector(".modal");
const headlineInput = document.getElementById("headline");
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const teacherSelect = document.getElementById("teacher");
const deadlineInput = document.getElementById("due-date");
const madeByInput = document.getElementById("creator-name");

const priorityRadios = document.querySelectorAll('input[name="priority"]');

const closeBtn = document.getElementById("close-btn");
const okBtn = document.getElementById("modal-ok");
const cancelBtn = document.querySelector(".btn-cancel");
const saveBtn = document.querySelector(".btn-create");
const chooseTeacherSelect = document.getElementById("teacher");

// filling the teacher select options dynamically based on the teachers in tasks
const boldBtn = document.querySelector(".bold-btn");
const italicBtn = document.querySelector(".italic-btn");
const underlineBtn = document.querySelector(".underline-btn");
const listBtn = document.querySelector(".list-btn");
const numberedListBtn = document.querySelector(".numbered-list-btn");

function execOnDescription(command, value = null) {
  descriptionInput.focus();
  document.execCommand(command, false, value);
}

function bindToolbar(btn, command, value = null) {
  btn?.addEventListener("mousedown", (e) => {
    e.preventDefault();
    if (btn === listBtn) {
      numberedListBtn.classList.remove("active");
      btn.classList.toggle("active");
    } else if (btn === numberedListBtn) {
      listBtn.classList.remove("active");
      btn.classList.toggle("active");
    } else {
      btn.classList.toggle("active");
    }
    execOnDescription(command, value);
  });
}

bindToolbar(boldBtn, "bold");
bindToolbar(italicBtn, "italic");
bindToolbar(underlineBtn, "underline");
bindToolbar(listBtn, "insertUnorderedList");
bindToolbar(numberedListBtn, "insertOrderedList");

teachers.forEach((t) => {
  const value = t.username || t.user;
  if (!value) return;
  const option = document.createElement("option");
  option.value = value;
  option.textContent = t.name;
  chooseTeacherSelect.appendChild(option);
});

// modal close function
function closeModal() {
  modal.classList.remove("show");
}

closeBtn?.addEventListener("click", closeModal);
okBtn?.addEventListener("click", closeModal);

// test if task exists
if (!task) {
  modal.classList.add("show");
  closeBtn?.addEventListener("click", () => {
    window.location.href = "/admin/dashboard.html";
  });
  okBtn?.addEventListener("click", () => {
    window.location.href = "/admin/dashboard.html";
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      window.location.href = "/admin/dashboard.html";
    }
  });
} else {
  // if task exists, fill the form with its data from localStorage
  headlineInput.value = task.headline;
  titleInput.value = task.title;
  descriptionInput.textContent = task.description;
  teacherSelect.value = task.teacher;
  deadlineInput.value = task.deadline;
  madeByInput.textContent = profile ? profile.name : "Unknown User";

  // filling the priority radios based on the task priority
  priorityRadios.forEach((radio) => {
    radio.closest("label").classList.remove("checked");

    if (radio.value === task.priority) {
      radio.checked = true;
      radio.closest("label").classList.add("checked");
    }
  });
}

// cancel button redirects to dashboard
cancelBtn?.addEventListener("click", () => {
  window.location.href = "/admin/dashboard.html";
});

// handling the save button click
function handleSave(e) {
  e.preventDefault();

  const selectedPriority = document.querySelector(
    'input[name="priority"]:checked',
  );

  // checking if all fields are filled before saving
  if (
    !headlineInput.value.trim() ||
    !titleInput.value.trim() ||
    !descriptionInput.textContent.trim() ||
    !teacherSelect.value ||
    !deadlineInput.value ||
    !selectedPriority
  ) {
    document.querySelector(".head-text").textContent = "⚠️ Missing Information";
    document.querySelector(".body-text").textContent =
      "Please fill in all required fields before saving the task.";

    modal.classList.add("show");
    return;
  }

  // assigning the new values to the task object
  Object.assign(task, {
    headline: headlineInput.value,
    title: titleInput.value,
    description: descriptionInput.textContent,
    teacher: teacherSelect.value,
    deadline: deadlineInput.value,
    madeBy: profile ? profile.username : "Unknown User",
    status: "pending",
    priority: selectedPriority.value,
  });

  // saving the updated tasks array back to localStorage
  localStorage.setItem("tasks", JSON.stringify(tasks));

  window.location.href = "/admin/dashboard.html";
}

saveBtn?.addEventListener("click", handleSave);
