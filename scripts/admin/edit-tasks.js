// getting task id from URL
const params = new URLSearchParams(window.location.search);
const taskId = params.get("id");

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
const saveBtn = document.getElementById("save-btn");
const cancelBtn = document.getElementById("cancel-btn");
const chooseTeacherSelect = document.getElementById("teacher");

// filling the teacher select options dynamically based on the teachers in tasks
const uniqueTeachers = [...new Set(teachers.map((t) => t.name))];
uniqueTeachers.forEach((teacher) => {
  const option = document.createElement("option");
  option.value = teacher;
  option.textContent = teacher;
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
    window.location.href = "dashboard.html";
  });
  okBtn?.addEventListener("click", () => {
    window.location.href = "dashboard.html";
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      window.location.href = "dashboard.html";
    }
  });
} else {
  // if task exists, fill the form with its data from localStorage
  headlineInput.value = task.headline;
  titleInput.value = task.title;
  descriptionInput.value = task.description;
  teacherSelect.value = task.teacher;
  deadlineInput.value = task.deadline;
  madeByInput.textContent = task.madeBy;

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
  window.location.href = "dashboard.html";
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
    !descriptionInput.value.trim() ||
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
    description: descriptionInput.value,
    teacher: teacherSelect.value,
    deadline: deadlineInput.value,
    madeBy: madeByInput.textContent,
    status: "pending",
    priority: selectedPriority.value,
  });

  // saving the updated tasks array back to localStorage
  localStorage.setItem("tasks", JSON.stringify(tasks));

  window.location.href = "/admin/dashboard.html";
}

saveBtn?.addEventListener("click", handleSave);
