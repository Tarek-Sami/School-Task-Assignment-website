const completeBtn = document.getElementById("completeBtn");
const progressNumber = document.querySelector(".progress-number");
const progressFill = document.querySelector(".progress-fill");
const statusBadge = document.querySelector(".badge-status");
const rangeInput = document.querySelector('input[type="range"]');
const percentButtons = document.querySelectorAll(".percent-btn");

function completeTask() {
  progressNumber.textContent = "100%";
  progressFill.style.width = "100%";
  statusBadge.textContent = "Completed";
  rangeInput.value = 100;

  percentButtons.forEach(btn => {
  btn.classList.remove("is-active");

  if (btn.textContent === "100%") {
    btn.classList.add("is-active");
  }
});

  completeBtn.innerHTML = "Completed ✔";
  completeBtn.disabled = true;

  localStorage.setItem("taskCompleted", "true");
}

completeBtn.addEventListener("click", completeTask);


window.addEventListener("DOMContentLoaded", () => {
  const isCompleted = localStorage.getItem("taskCompleted");

  if (isCompleted === "true") {
    completeTask();
  }
});
