document.getElementById("searchInput").addEventListener("keyup", function() {
  let value = this.value.toLowerCase();

  let tasks = document.querySelectorAll(".task-card");

  tasks.forEach(function(task) {
    let text = task.innerText.toLowerCase();

    if (text.includes(value)) {
      task.style.display = "flex";
    } else {
      task.style.display = "none";
    }
  });
});
