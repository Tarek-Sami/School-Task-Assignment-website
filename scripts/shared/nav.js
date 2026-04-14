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

  if (role === "admin") {
    navLinks = `
        <h2 class="section-title">Main</h2>
        <a href="/index.html" class="link">Home <i class="fa-solid fa-house"></i></a>
        <a href="/admin/dashboard.html" class="link">Dashboard <i class="fa-solid fa-chart-bar"></i></a>
        <h2 class="section-title">Tasks</h2>
        <a href="/admin/add-task.html" class="link">Add Task <i class="fa-solid fa-plus"></i></a>
        <a href="/admin/tasks.html" class="link">All Tasks <i class="fa-solid fa-list"></i></a>
        <h2 class="section-title">Management</h2>
        <a href="/admin/manage-teachers.html" class="link">Manage Teachers <i class="fa-solid fa-user-group"></i></a>
        <h2 class="section-title">Profile</h2>
        <a href="#" class="link logout">Log out <i class="fa-solid fa-sign-out"></i></a>
    `;
  } else if (role === "teacher") {
    navLinks = `
        <h2 class="section-title">Main</h2>
        <a href="/index.html" class="link">Home <i class="fa-solid fa-house"></i></a>
        <a href="/teacher/dashboard.html" class="link">Dashboard <i class="fa-solid fa-chart-bar"></i></a>
        <h2 class="section-title">Tasks</h2>
        <a href="/teacher/my-tasks.html" class="link">My Tasks <i class="fa-solid fa-list"></i></a>
        <h2 class="section-title">Profile</h2>
        <a href="#" class="link logout">Log out <i class="fa-solid fa-sign-out"></i></a>
    `;
  } else {
    navLinks = `
        <h2 class="section-title">Main</h2>
        <a href="/index.html" class="link">Home <i class="fa-solid fa-house"></i></a>
        <h2 class="section-title">Account</h2>
        <a href="/shared/login.html" class="link">Log in <i class="fa-solid fa-sign-in"></i></a>
        <a href="/shared/signup.html" class="link">Sign up <i class="fa-solid fa-user-plus"></i></a>
    `;
  }

  sidebarLinks.innerHTML = navLinks;

  const icon = document.querySelector(".icon");
  const overlay = document.querySelector(".overlay");
  const linksContainer = document.querySelector(".links-container");
  const logout = document.querySelector(".logout");
  const profile = document.getElementById("profile");
  const logo = document.querySelector(".logo");
  const linkElemnets = document.querySelectorAll(".link");
  console.log(linkElemnets);
  const path = window.location.pathname;

  linkElemnets.forEach((link) => {
    const href = link.getAttribute("href");
    if (path.includes(href)) {
      link.classList.add("link-active");
    } else if (path === "/" && href === "/index.html") {
      link.classList.add("link-active");
    } else {
      link.classList.remove("link-active");
    }
  });
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
      window.location.href = `/shared/profile.html`;
    };
  }
});
