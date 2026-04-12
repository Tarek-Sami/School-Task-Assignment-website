const profile = JSON.parse(localStorage.getItem("profile"));
const container = document.querySelector(".container");
const Allusers = JSON.parse(localStorage.getItem("users"));
const user = Allusers.find((u) => u.username === profile.username);
const teachers = JSON.parse(localStorage.getItem("teachers")) || [];
let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (profile) {
  container.innerHTML = `
       <div class="back-btn-box">
        <a href="profile.html" class="back-btn"
          ><i class="fa-solid fa-arrow-left"></i> Back to Profile</a
        >
      </div>
     <div class="error-alert"></div>
      <div class="card edit-card">
        <div class="card-header">
          <i class="fa-solid fa-user-pen"></i>
          <h2>Edit Profile Information</h2>
        </div>

        <form class="edit-form" action="profile.html">
          <div class="edit-avatar-box">
            <img
              src="https://ui-avatars.com/api/?name=Ahmed+Tolba&background=f0e6ff&color=6142db&size=100"
              alt="Avatar"
              class="edit-avatar"
            />
            <button type="button" class="btn btn-secondary btn-sm">
              Upload New Photo
            </button>
          </div>

          <div class="form-grp">
            <label>Full Name</label>
            <input type="text" class="form-inp name" value="${profile.name}" />
          </div>

          <div class="form-grp">
            <label>Username</label>
            <input type="text" class="form-inp username" value="${profile.username}" />
          </div>

          <div class="form-grp">
            <label>Email Address</label>
            <input
              type="email"
              class="form-inp email"
              value="${profile.email}"
            />
          </div>
          <div class="form-grp">
            <label>Department</label>
            <select class="form-inp">
              <option value="computer science" ${profile.department == "computer science" ? "selected" : ""}>Computer Science</option>
              <option value="mathematics" ${profile.department == "mathematics" ? "selected" : ""}>Mathematics</option> 
                <option value="physics" ${profile.department == "physics" ? "selected" : ""}>Physics</option>
                    <option value="chemistry" ${profile.department == "chemistry" ? "selected" : ""}>Chemistry</option> 
            </select>
          </div>
          <div class="form-acts">
            <a href="profile.html" class="btn btn-secondary">Cancel</a>
            <button type="submit" class="btn btn-primary save-btn">Save Changes</button>
          </div>
        </form>
      </div>`;
}

const saveBtn = document.querySelector(".save-btn");
const emailInput = document.querySelector(".form-inp.email");
const userNameInput = document.querySelector(".form-inp.username");
saveBtn.addEventListener("click", (e) => {
  emailInput.classList.remove("input-error");
  userNameInput.classList.remove("input-error");
  e.preventDefault();
  if (
    Allusers.find(
      (u) => u.email === emailInput.value && u.email !== profile.email,
    )
  ) {
    document.querySelector(".error-alert").textContent =
      "An account with this email already exists.";
    emailInput.classList.add("input-error");
    emailInput.focus();
    return;
  } else if (
    Allusers.find(
      (u) =>
        u.username === userNameInput.value && u.username !== profile.username,
    )
  ) {
    document.querySelector(".error-alert").textContent =
      "An account with this username already exists.";
    userNameInput.classList.add("input-error");
    userNameInput.focus();
    return;
  }
  if (!emailRegex.test(emailInput.value)) {
    emailInput.classList.add("input-error");
    document.querySelector(".error-alert").textContent =
      "Please enter a valid email address.";
    return;
  }
  // Here you would typically gather the form data and save it to localStorage or send it to a server
  user.name = document.querySelector(".form-inp.name").value;
  user.email = document.querySelector(".form-inp.email").value;
  user.department = document.querySelector("select").value;
  user.username = document.querySelector(".form-inp.username").value;
  localStorage.setItem("users", JSON.stringify(Allusers));
  profile.name = user.name;
  profile.email = user.email;
  profile.department = user.department;
  profile.username = user.username;
  localStorage.setItem("profile", JSON.stringify(profile));
  if (profile.role === "teacher") {
    const teacherIndex = teachers.findIndex(
      (t) => t.username === profile.username,
    );
    if (teacherIndex !== -1) {
      teachers[teacherIndex].name = user.name;
      teachers[teacherIndex].email = user.email;
      teachers[teacherIndex].department = user.department;
      teachers[teacherIndex].username = user.username;
      localStorage.setItem("teachers", JSON.stringify(teachers));
    }
  }
  window.location.href = "profile.html";
});
