const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("loginError");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const hashedPassword = CryptoJS.SHA256(password).toString();
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const users = JSON.parse(localStorage.getItem("users")) || [];
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

    const user = users.find(
      (u) => u.email === email && u.password === hashedPassword,
    );
    if (!user) {
      setLoginError("Invalid email or password.");
      emailInput.classList.add("input-error");
      passwordInput.classList.add("input-error");
      return;
    }
    let teachersLocal = JSON.parse(localStorage.getItem("teachers")) || [];
    if (user.role === "teacher")
      if (!teachersLocal.find((t) => t.id === user.id)) {
        teachersLocal.push(user);
        localStorage.setItem("teachers", JSON.stringify(teachersLocal));
      }
    {
      clearLoginError();
      clearLoginFieldState();
      localStorage.setItem("profile", JSON.stringify(user));
      localStorage.setItem("role", user.role);

      window.location.href = `/${user.role}/dashboard.html`;
    }
  });
}
