const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("loginError");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function setLoginError(message) {
  loginError.textContent = message;
}

function clearLoginError() {
  loginError.textContent = "";
}

function clearLoginFieldState() {
  emailInput.classList.remove("input-error");
  passwordInput.classList.remove("input-error");
}

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    clearLoginError();
    clearLoginFieldState();

    if (!email) {
      setLoginError("Email address is required.");
      emailInput.classList.add("input-error");
      emailInput.focus();
      return;
    }

    if (!emailPattern.test(email)) {
      setLoginError("Enter a valid email address.");
      emailInput.classList.add("input-error");
      emailInput.focus();
      return;
    }

    if (!password) {
      setLoginError("Password is required.");
      passwordInput.classList.add("input-error");
      passwordInput.focus();
      return;
    }

    if (password.length < 6) {
      setLoginError("Password must be at least 6 characters.");
      passwordInput.classList.add("input-error");
      passwordInput.focus();
      return;
    }

    const role = localStorage.getItem("role");

    if (!role) {
      window.location.href = "/shared/signup.html";
      return;
    }

    window.location.href = `/${role}/dashboard.html`;
  });
}
