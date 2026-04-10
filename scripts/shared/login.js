const form = document.querySelector("form");

if (form) {
  form.addEventListener("submit", (e) => {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const error = document.getElementById("loginError");

    error.innerText = "";
    error.style.color = "red";

    let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    // Validation
    if (!email.match(emailPattern)) {
      e.preventDefault();
      error.innerText = "Enter a valid email";
      return;
    }

    if (password.length < 6) {
      e.preventDefault();
      error.innerText = "Password must be at least 6 characters";
      return;
    }

    // if correct
    error.style.color = "green";
    error.innerText = "Login successful!";

    e.preventDefault(); //stop temp to show msg

    setTimeout(() => {
      const role = localStorage.getItem("role");

      if (!role) {
        window.location.href = "/shared/signup.html";
      } else {
        window.location.href = `/${role}/dashboard.html`;
      }
    }, 1000);
  });
}
