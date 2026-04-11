let role = localStorage.getItem("role");
const heroButtons = document.querySelector(".hero-btns");
const ctaButtons = document.querySelector(".cta-btns");

if (!role) {
  heroButtons.innerHTML = `
          <a href="/shared/login.html" class="btn btn-primary">Login</a>
            <a href="/shared/signup.html" class="btn btn-outline text-primary"
              >Sign Up</a
            >
  `;
  ctaButtons.innerHTML = `
    <a href="/shared/login.html" class="btn btn-primary">Login</a>
    <a href="/shared/signup.html" class="btn btn-outline text-primary">Sign Up</a>
  `;
} else {
  heroButtons.innerHTML = `
    <a href="/${role}/dashboard.html" class="btn btn-primary">Dashboard</a>
    <a href="/${role}/${role === "teacher" ? "my-tasks" : "tasks"}.html" class="btn btn-primary">Tasks</a>

  `;
  ctaButtons.innerHTML = `
    <a href="/shared/about.html" class="btn btn-primary">About Us</a>
  `;
}
