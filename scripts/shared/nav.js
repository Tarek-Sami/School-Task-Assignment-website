document.addEventListener("DOMContentLoaded", () => {
  const role = localStorage.getItem("role");
  const navbar = document.getElementById("navbar");
  navbar.innerHTML = `
  <div class="links-container">
    <div class="links" id="sidebar-links"></div>
  </div>
  <div class="overlay"></div>
  <div class="nav">
    <div class="container">
      <img
        class="logo"
        src="/assets/media/logo/purpleLogo.png"
        alt=""
      />
      <div class="profile-and-burger">
        <div class="profile" id="profile-div"></div> 
  
        <div class="icon">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  </div>
`;

  const sidebarLinks = document.getElementById("sidebar-links");
  const profileContainer = document.getElementById("profile-div");
  let navLinks = "";

  if (role === "admin" || role === "teacher") {
    profileContainer.innerHTML = `
    <i class="fa-solid fa-circle-user fa-2xl" id="profile"></i>
  `;
  }

  if (
    window.location.pathname.includes("/login.html") ||
    window.location.pathname.includes("/signup.html")
  ) {
    navLinks = `
        <a href="/index.html" class="link">Home</a>
        <a href="/shared/login.html" class="link">Log in</a>
        <a href="/shared/signup.html" class="link">Sign up</a>
    `;
    profileContainer.innerHTML = "";
  } else if (role === "admin") {
    navLinks = `
        <a href="/index.html" class="link">Home</a>
        <a href="/admin/dashboard.html" class="link">Dashboard</a>
        <a href="/admin/manage-teachers.html" class="link">Manage Teachers</a>
        <a href="/admin/add-task.html" class="link">Add Task</a>
        <a href="/admin/tasks.html" class="link">All Tasks</a>
        <a href="#" class="link logout">Log out</a>
    `;
  } else if (role === "teacher") {
    navLinks = `
  
        <a href="/index.html" class="link">Home</a>
        <a href="/teacher/dashboard.html" class="link">Dashboard</a>
        <a href="/teacher/my-tasks.html" class="link">My Tasks</a>
        <a href="#" class="link logout">Log out</a>
    `;
  } else {
    navLinks = `
        <a href="/index.html" class="link">Home</a>
        <a href="/shared/login.html" class="link">Log in</a>
        <a href="/shared/signup.html" class="link">Sign up</a>
    `;
  }

  sidebarLinks.innerHTML = navLinks;

  const icon = document.querySelector(".icon");
  const overlay = document.querySelector(".overlay");
  const linksContainer = document.querySelector(".links-container");
  const logout = document.querySelector(".logout");
  const profile = document.getElementById("profile");
  const logo = document.querySelector(".logo");

  // logo
  if (logo) {
    logo.onclick = () => {
      window.location.href = "/index.html";
    };
  }

  // menu toggle
  if (icon) {
    icon.onclick = () => {
      linksContainer.classList.toggle("show");
      overlay.classList.toggle("active");
      icon.classList.toggle("clicked");
    };
  }

  // overlay
  if (overlay) {
    overlay.onclick = () => {
      linksContainer.classList.remove("show");
      overlay.classList.remove("active");
      icon.classList.remove("clicked");
    };
  }

  // logout
  if (logout) {
    logout.onclick = () => {
      localStorage.removeItem("role");
      localStorage.removeItem("profile");
      window.location.href = "/index.html";
    };
  }

  // profile
  if (profile) {
    profile.onclick = () => {
      if (!role) return (window.location.href = "/index.html");
      window.location.href = `/${role}/profile.html`;
    };
  }
});
