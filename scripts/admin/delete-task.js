const container = document.querySelector(".task-list");

container.addEventListener("click", (e) => {
  const btn = e.target.closest(".delete-btn");

  if (!btn) return;

  const id = btn.dataset.id;

  openDeleteModal(id);
});

const deleteModal = document.getElementById("deleteModal");
const confirmDeleteBtn = document.getElementById("confirm-delete");
const cancelDeleteBtn = document.getElementById("cancel-delete");
const closeDeleteBtn = document.getElementById("delete-close");

let selectedTaskId = null;

//  open modal
function openDeleteModal(id) {
  selectedTaskId = id;
  deleteModal.classList.add("show");
}

//  close modal
function closeDeleteModal() {
  deleteModal.classList.remove("show");
  selectedTaskId = null;
}

//  buttons
cancelDeleteBtn?.addEventListener("click", closeDeleteModal);
closeDeleteBtn?.addEventListener("click", closeDeleteModal);

//  click outside
deleteModal.addEventListener("click", (e) => {
  if (e.target === deleteModal) {
    closeDeleteModal();
  }
});

function animateDelete(id) {
  const items = document.querySelectorAll(".task");
  const firstPositions = new Map();

  items.forEach((item) => {
    firstPositions.set(item, item.getBoundingClientRect());
  });

  const task = document.querySelector(`[data-id="${id}"]`);
  if (!task) return;
  task.classList.add("removing");

  setTimeout(() => {
    const scrollY = window.scrollY;
    task.remove();
    // When the list is short, removing a row can change scroll height / scrollbar
    // and the browser may adjust scroll (anchoring), which looks like the whole page shifts down.
    window.scrollTo(0, scrollY);

    requestAnimationFrame(() => {
      const newItems = document.querySelectorAll(".task");

      newItems.forEach((item) => {
        const first = firstPositions.get(item);
        const last = item.getBoundingClientRect();
        if (!first) return;

        const deltaY = first.top - last.top;
        if (Math.abs(deltaY) < 0.5) return;

        item.style.transition = "none";
        item.style.transform = `translateY(${deltaY}px)`;
        item.offsetHeight;

        item.style.transition = "transform 0.3s ease";
        item.style.transform = "";
      });

      requestAnimationFrame(() => {
        window.scrollTo(0, scrollY);
      });
    });
  }, 300);
}

const totalTasks = document.getElementById("total-tasks");
const compeletedTasks = document.getElementById("completed-tasks");
const pendingTasks = document.getElementById("pending-tasks");
//  confirm delete
confirmDeleteBtn?.addEventListener("click", () => {
  if (!selectedTaskId) return;

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks = tasks.filter((task) => task.id !== selectedTaskId);

  localStorage.setItem("tasks", JSON.stringify(tasks));

  totalTasks.textContent = parseInt(totalTasks.textContent) - 1;
  if (tasks.find((t) => t.id === selectedTaskId)?.status === "completed") {
    compeletedTasks.textContent = parseInt(compeletedTasks.textContent) - 1;
  } else {
    pendingTasks.textContent = parseInt(pendingTasks.textContent) - 1;
  }

  animateDelete(selectedTaskId);
  closeDeleteModal();
});
