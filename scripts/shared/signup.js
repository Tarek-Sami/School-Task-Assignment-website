const signupForm = document.querySelector("form");
const roleSelect = document.getElementById("role");

if (signupForm && roleSelect) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const selectedRole = roleSelect.value.trim();

    if (!selectedRole) {
      alert("Please select a role");
      return;
    }
    localStorage.setItem("role", selectedRole);
    window.location.href = "../../shared/login.html";
  });
}
