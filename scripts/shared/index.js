let role = localStorage.getItem("role");
const heroButtons = document.querySelector(".hero-btns");
const ctaButtons = document.querySelector(".cta-btns");
const hero = document.querySelector(".hero");
const p = document.querySelector(".words");

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

window.onload = () => {
  hero.classList.add("show");
  p.classList.add("show");
  hero.classList.remove("hidden");
  p.classList.remove("hidden");
};

const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  {
    threshold: 0.2,
  },
);

reveals.forEach((el, index) => {
  el.style.transitionDelay = `${(index % 3) * 0.1}s`;
  observer.observe(el);
});
