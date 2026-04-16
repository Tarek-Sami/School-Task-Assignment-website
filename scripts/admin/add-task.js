// get existing tasks from local storage or initialize an empty array
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const createTaskBtn = document.getElementById("btn-create");
const cancelBtn = document.getElementById("btn-cancel");
const radios = document.querySelectorAll('input[name="priority"]');
const modal = document.querySelector(".modal");
const currentUserName =
  localStorage.getItem("currentUserName") || "Unknown User";
// variables for the form inputs
const headlineInput = document.getElementById("headline");
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const teacherSelect = document.getElementById("teacher");
const deadlineInput = document.getElementById("due-date");
const madeBy = document.getElementById("creator-name");
const creatorAvatar = document.querySelector(".creator-avatar");
const closeBtn = document.getElementById("close-btn");
const okBtn = document.getElementById("modal-ok");

//get all teacher names from local storage and populate the select input (assigned to)
function populateTeacherSelect() {
  let teachers = [];
  try {
    teachers = JSON.parse(localStorage.getItem("teachers")) || [];
  } catch {
    teachers = [];
  }
  const teacherNames = [
    ...new Set(teachers.map((t) => t?.name).filter(Boolean)),
  ];
  teacherSelect.innerHTML = '<option value="">Select a teacher...</option>';

  teacherNames.forEach((name) => {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    teacherSelect.appendChild(option);
  });

  if (teacherNames.length === 0) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "No teachers available";
    option.disabled = true;
    teacherSelect.appendChild(option);
  }
}

populateTeacherSelect();


// button to edit the style of the description
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

// priority radio buttons
radios.forEach((radio) => {
  radio.addEventListener("change", () => {
    document.querySelectorAll(".priority").forEach((label) => {
      label.classList.remove("checked");
    });
    radio.closest("label").classList.add("checked");
  });
});

// form validation
function validateForm() {
  const headline = headlineInput.value.trim();
  const title = titleInput.value.trim();
  const description = (descriptionInput.innerText || "").trim();
  const teacher = teacherSelect.value;
  const deadline = deadlineInput.value;
  const priority = document.querySelector('input[name="priority"]:checked');

  if (
    !headline ||
    !title ||
    !description ||
    !teacher ||
    !deadline ||
    !priority
  ) {
    modal.classList.add("show");
    return false;
  }

  return true;
}

// modal functionality
function closeModal() {
  modal.classList.remove("show");
}

closeBtn?.addEventListener("click", closeModal);
okBtn?.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// create task button functionality
createTaskBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  const newTask = {
    id: crypto.randomUUID(),
    headline: headlineInput.value,
    title: titleInput.value,
    description: descriptionInput.innerHTML,
    teacher: teacherSelect.value,
    deadline: deadlineInput.value,
    priority: document.querySelector('input[name="priority"]:checked').value,
    status: "pending",
    madeBy: currentUserName,
    progress: 0,
  };
  console.log(newTask);
  tasks.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  window.location.href = "/admin/tasks.html";
});

cancelBtn.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "/admin/tasks.html";
});
