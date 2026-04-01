const form = document.querySelector("form");

if (form) {
  form.addEventListener("submit", () => {
    const role = localStorage.getItem("role");

    if (!role) {
      localStorage.setItem("role", "teacher");
    }
  });
}
