const signupForm = document.getElementById("signupForm");
const roleSelect = document.getElementById("role");
const departmentSelect = document.getElementById("department");
const signupError = document.getElementById("signupError");
const nameInput = document.getElementById("name");
const userInput = document.getElementById("user");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");
const genderInputs = document.querySelectorAll('input[name="gender"]');
const hashedPassword = CryptoJS.SHA256(password).toString();

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function setSignupError(message) {
  signupError.textContent = message;
}

function clearSignupError() {
  signupError.textContent = "";
}

function clearSignupFieldState() {
  [
    nameInput,
    userInput,
    emailInput,
    phoneInput,
    passwordInput,
    confirmPasswordInput,
    roleSelect,
  ].forEach((field) => field.classList.remove("input-error"));

  genderInputs.forEach((input) => input.classList.remove("input-error"));
}

if (signupForm && roleSelect) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = nameInput.value;
    const user = userInput.value;
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const password = passwordInput.value.trim();
    const confirm = confirmPasswordInput.value.trim();
    const selectedRole = roleSelect.value.toLowerCase();
    const selectedGender = document.querySelector(
      'input[name="gender"]:checked',
    );

    clearSignupError();
    clearSignupFieldState();

    if (name.trim().length < 7) {
      setSignupError("Full name must be at least 7 characters.");
      nameInput.classList.add("input-error");
      nameInput.focus();
      return;
    }

    if (user.trim().length < 5) {
      setSignupError("Username must be at least 5 characters.");
      userInput.classList.add("input-error");
      userInput.focus();
      return;
    }

    if (!email) {
      setSignupError("Email address is required.");
      emailInput.classList.add("input-error");
      emailInput.focus();
      return;
    }

    if (!emailPattern.test(email)) {
      setSignupError("Enter a valid email address.");
      emailInput.classList.add("input-error");
      emailInput.focus();
      return;
    }

    if (phone && !/^[\d\s+\-()]{10,}$/.test(phone)) {
      setSignupError("Enter a valid phone number.");
      phoneInput.classList.add("input-error");
      phoneInput.focus();
      return;
    }

    if (!password) {
      setSignupError("Password is required.");
      passwordInput.classList.add("input-error");
      passwordInput.focus();
      return;
    }

    if (password.length < 9) {
      setSignupError("Password must be at least 9 characters.");
      passwordInput.classList.add("input-error");
      passwordInput.focus();
      return;
    }

    if (password !== confirm) {
      setSignupError("Passwords do not match.");
      confirmPasswordInput.classList.add("input-error");
      confirmPasswordInput.focus();
      return;
    }

    if (!selectedRole) {
      setSignupError("Please select a role.");
      roleSelect.classList.add("input-error");
      roleSelect.focus();
      return;
    }

    if (!selectedGender) {
      setSignupError("Please select a gender.");
      genderInputs.forEach((input) => input.classList.add("input-error"));
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find((u) => u.username === user)) {
      setSignupError("Username already exists. Please choose another.");
      userInput.classList.add("input-error");
      userInput.focus();
      return;
    } else if (users.find((u) => u.email === email)) {
      setSignupError("Email already registered. Please use another.");
      emailInput.classList.add("input-error");
      emailInput.focus();
      return;
    } else if (users.find((u) => u.phone === phone)) {
      setSignupError("Phone number already registered. Please use another.");
      phoneInput.classList.add("input-error");
      phoneInput.focus();
      return;
    } else {
      users.push({
        id: crypto.randomUUID(),
        name: "Dr ." + name,
        username: user,
        email,
        phone,
        password: hashedPassword,
        role: selectedRole,
        department: departmentSelect.value,
        gender: selectedGender.id === "m" ? "male" : "female",
        numberOfTasks: 0,
        status: "online",
      });
      localStorage.setItem("users", JSON.stringify(users));
    }

    setSignupError("Account created. Redirecting to login...");
    setTimeout(() => {
      window.location.href = "/shared/login.html";
    }, 1000);
  });
}
