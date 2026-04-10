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

// 🔥 open modal
function openDeleteModal(id) {
  selectedTaskId = id;
  deleteModal.classList.add("show");
}

// 🔥 close modal
function closeDeleteModal() {
  deleteModal.classList.remove("show");
  selectedTaskId = null;
}

// 🔥 buttons
cancelDeleteBtn?.addEventListener("click", closeDeleteModal);
closeDeleteBtn?.addEventListener("click", closeDeleteModal);

// 🔥 click outside
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
  task.classList.add("removing");

  setTimeout(() => {
    task.remove();
    const newItems = document.querySelectorAll(".task");

    newItems.forEach((item) => {
      const first = firstPositions.get(item);
      const last = item.getBoundingClientRect();
      if (!first) return;

      const deltaY = first.top - last.top;

      // ✅ الـ transition تبقى none الأول عشان الـ jump يحصل فورًا
      item.style.transition = "none";
      item.style.transform = `translateY(${deltaY}px)`;
      item.offsetHeight; // force reflow

      // ✅ دلوقتي حط الـ transition وارجع للـ position الطبيعي
      item.style.transition = "transform 0.3s ease";
      item.style.transform = "";
    });
  }, 350);
}

// 🔥 confirm delete
confirmDeleteBtn?.addEventListener("click", () => {
  if (!selectedTaskId) return;

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks = tasks.filter((task) => task.id !== selectedTaskId);

  localStorage.setItem("tasks", JSON.stringify(tasks));
  animateDelete(selectedTaskId);
  closeDeleteModal();
});
