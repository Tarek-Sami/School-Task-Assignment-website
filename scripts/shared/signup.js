const signupForm = document.getElementById("signupForm");
const roleSelect = document.getElementById("role");

if (signupForm && roleSelect) {
  signupForm.addEventListener("submit", (e) => {
    console.log("Signup submitted"); // confirmation

    const name = document.getElementById("name").value.trim();
    const user = document.getElementById("user").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirm = document.getElementById("confirm-password").value;

    let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (name.length < 3) {
      e.preventDefault();
      alert("Name must be at least 3 characters");
      return;
    }

    if (user.length < 4) {
      e.preventDefault();
      alert("Username must be at least 4 characters");
      return;
    }

    if (!email.match(emailPattern)) {
      e.preventDefault();
      alert("Enter a valid email");
      return;
    }

    if (password.length < 6) {
      e.preventDefault();
      alert("Password must be at least 6 characters");
      return;
    }

    if (password !== confirm) {
      e.preventDefault();
      alert("Passwords do not match");
      return;
    }

    const selectedRole = roleSelect.value.trim();

    if (!selectedRole) {
      e.preventDefault();
      alert("Please select a role");
      return;
    }

    e.preventDefault();

    localStorage.setItem("role", selectedRole);

    setTimeout(() => {
      window.location.href = "/shared/login.html";
    }, 1000);
  });
}
