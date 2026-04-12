let teachers = JSON.parse(localStorage.getItem("teachers")) || [];

let filterState = { department: "All", gender: "all" };
let currentPage = 1;
const teachersPerPage = 4;

function renderTeachers(teacherArray = teachers) {
  const teacherList = document.querySelector(".teacher-list");

  const start = (currentPage - 1) * teachersPerPage;
  const end = start + teachersPerPage;
  const paginatedTeachers = teacherArray.slice(start, end);

  let html = "";

  paginatedTeachers.forEach((teacher) => {
    html += `
                 <article class="teacher-row">
            <div class="teacher-row-avatar">
              <img
                src="../assets/media/images/image.jpg"
                alt="Dr. Sarah Jenkins"
                width="56"
                height="56"
              />
              <span
                class="teacher-row-dot teacher-row-dot-${teacher.status}"
                title="${teacher.status === "online" ? "Online" : "Offline"}"
              ></span>
            </div>
            <div class="teacher-row-info">
              <h3 class="teacher-row-name">${teacher.name}</h3>
              <p class="teacher-row-role">
               ${teacher.department} Department
              </p>
            </div>
            <div class="teacher-row-workload">
              <p class="teacher-row-workload-label">CURRENT WORKLOAD</p>
              <div class="teacher-row-workload-bar">
                <div class="progress">
                  <div
                    class="progress-bar progress-bar-${teacher.numberOfTasks > 20 ? "teal" : teacher.numberOfTasks > 10 ? "blue" : "red"}"
                    style="width: ${teacher.numberOfTasks * 3}%"
                  ></div>
                </div>
                <span class="teacher-row-tasks">${teacher.numberOfTasks} Tasks</span>
              </div>
            </div>
            <div class="teacher-row-status">
              <p class="teacher-row-status-label">STATUS</p>
              <div class="status-pill status-pill-${teacher.status}">
                <span class="status-pill-dot"></span>
                ${teacher.status === "online" ? "ONLINE" : "OFFLINE"}
              </div>
            </div>
          </article>`;
  });

  teacherList.innerHTML = html;

  renderPagination(teacherArray);
}

function renderPagination(teacherArray) {
  let pagination = document.querySelector(".pagination");

  if (!pagination) {
    pagination = document.createElement("div");
    pagination.className = "pagination";
    document.querySelector(".teacher-list").after(pagination);
  }

  pagination.innerHTML = "";

  const totalPages = Math.ceil(teacherArray.length / teachersPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;

    if (i === currentPage) {
      btn.classList.add("active");
    }

    btn.addEventListener("click", () => {
      currentPage = i;
      renderTeachers(teacherArray);
    });

    pagination.appendChild(btn);
  }
}
function computeFilteredTeachers() {
  const searchInput = document.getElementById("teacher-search");
  const query = searchInput.value.toLowerCase().trim();
  return teachers.filter((teacher) => {
    const nameOk =
      !query ||
      teacher.name.toLowerCase().includes(query) ||
      teacher.department.toLowerCase().includes(query);
    const deptOk =
      filterState.department === "All" ||
      teacher.department === filterState.department;
    const genderOk =
      filterState.gender === "all" ||
      teacher.gender.toLowerCase() === filterState.gender;
    return nameOk && deptOk && genderOk;
  });
}

function applyListFilter() {
  const filteredTeachers = computeFilteredTeachers();

  currentPage = 1; // 🔥 مهم جدًا

  if (filteredTeachers.length === 0) {
    document.querySelector(".teacher-list").innerHTML =
      "<p class='no-results'>No teachers found</p>";
    return;
  }

  renderTeachers(filteredTeachers);
}

function openFilterModal() {
  const filterModal = document.getElementById("filterModal");
  const filterModalSearch = document.getElementById("filter-modal-search");
  const filterModalDepartment = document.getElementById(
    "filter-modal-department",
  );
  const searchInput = document.getElementById("teacher-search");

  filterModalSearch.value = searchInput.value;
  filterModalDepartment.value = filterState.department;
  const genderRadio = filterModal.querySelector(
    `input[name="filter-gender"][value="${filterState.gender}"]`,
  );
  if (genderRadio) genderRadio.checked = true;
  filterModal.classList.add("show");
  filterModal.setAttribute("aria-hidden", "false");
  filterModalSearch.focus();
}

function closeFilterModal() {
  const filterModal = document.getElementById("filterModal");
  filterModal.classList.remove("show");
  filterModal.setAttribute("aria-hidden", "true");
}

/* DOM references, listeners, and initial render */
const searchInput = document.getElementById("teacher-search");
const filterModal = document.getElementById("filterModal");
const filterModalSearch = document.getElementById("filter-modal-search");
const filterModalDepartment = document.getElementById(
  "filter-modal-department",
);
const filterBtn = document.querySelector(".filter-btn");
const filterApplyBtn = filterModal?.querySelector(".modal-btn-apply");
const filterResetBtn = filterModal?.querySelector(".modal-btn-reset");
const filterCloseBtn = filterModal?.querySelector(".modal-close");

searchInput.addEventListener("input", () => {
  applyListFilter();
});

filterBtn?.addEventListener("click", () => openFilterModal());

filterModal?.addEventListener("click", (e) => {
  if (e.target === filterModal) closeFilterModal();
});

filterCloseBtn?.addEventListener("click", () => closeFilterModal());

filterApplyBtn?.addEventListener("click", () => {
  searchInput.value = filterModalSearch.value;
  filterState.department = filterModalDepartment.value;
  const checked = filterModal.querySelector(
    'input[name="filter-gender"]:checked',
  );
  filterState.gender = checked ? checked.value : "all";
  applyListFilter();
  closeFilterModal();
});

filterResetBtn?.addEventListener("click", () => {
  filterModalSearch.value = "";
  filterModalDepartment.value = "All";
  const allGender = filterModal.querySelector(
    'input[name="filter-gender"][value="all"]',
  );
  if (allGender) allGender.checked = true;
  searchInput.value = "";
  filterState = { department: "All", gender: "all" };
  applyListFilter();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && filterModal?.classList.contains("show")) {
    closeFilterModal();
  }
});

applyListFilter();
