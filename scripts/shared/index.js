if (!localStorage.getItem("tasks")) {
  const initialTasks = [
    {
      id: crypto.randomUUID(),
      headline: "Prepare Midterm Exam",
      title: "Math Exam Setup",
      description: "Prepare questions and review topics",
      priority: "high",
      teacher: "Ahmed",
      deadline: "2026-05-10",
      status: "pending",
      madeBy: "Ahmed",
      progress: 0,
    },
    {
      id: crypto.randomUUID(),
      headline: "Weekly Assignment",
      title: "Physics Homework",
      description: "Chapter 3 problems",
      priority: "medium",
      teacher: "Sara",
      deadline: "2026-04-20",
      status: "pending",
      madeBy: "Ahmed",
      progress: 0,
    },
    {
      id: crypto.randomUUID(),
      headline: "Project Review",
      title: "AI Project",
      description: "Review student submissions",
      teacher: "Mohamed",
      deadline: "2026-04-05",
      priority: "low",
      status: "pending",
      madeBy: "Ahmed",
      progress: 0,
    },
  ];

  localStorage.setItem("tasks", JSON.stringify(initialTasks));
}

let initialTeachers = [
  {
    id: crypto.randomUUID(),
    name: "Dr. John Doe",
    user: "johndoe",
    email: "john.doe@example.com",
    department: "Mathematics",
    phone: "123-456-7890",
    gender: "Male",
    status: "online",
    numberOfTasks: 18,
  },
  {
    id: crypto.randomUUID(),
    name: "Dr. Sarah Ahmed",
    user: "sarahahmed",
    email: "sarah.ahmed@example.com",
    department: "Physics",
    phone: "010-1234-5678",
    gender: "Female",
    status: "online",
    numberOfTasks: 15,
  },
  {
    id: crypto.randomUUID(),
    name: "Dr. Michael Smith",
    user: "michaelsmith",
    email: "michael.smith@example.com",
    department: "Chemistry",
    phone: "011-9876-5432",
    gender: "Male",
    status: "offline",
    numberOfTasks: 20,
  },
  {
    id: crypto.randomUUID(),
    name: "Dr. Emily Johnson",
    user: "emilyjohnson",
    email: "emily.johnson@example.com",
    department: "Biology",
    phone: "012-3456-7890",
    gender: "Female",
    status: "online",
    numberOfTasks: 12,
  },
  {
    id: crypto.randomUUID(),
    name: "Dr. Ahmed Hassan",
    user: "ahmedhassan",
    email: "ahmed.hassan@example.com",
    department: "Computer Science",
    phone: "015-2222-3333",
    gender: "Male",
    status: "online",
    numberOfTasks: 25,
  },
  {
    id: crypto.randomUUID(),
    name: "Dr. Mona Ali",
    user: "monaali",
    email: "mona.ali@example.com",
    department: "English",
    phone: "010-4444-5555",
    gender: "Female",
    status: "offline",
    numberOfTasks: 10,
  },
];

if (!localStorage.getItem("teachers")) {
  localStorage.setItem("teachers", JSON.stringify(initialTeachers));
}

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

window.addEventListener("load", () => {
  hero.classList.add("show");
  p.classList.add("show");
  hero.classList.remove("hidden");
  p.classList.remove("hidden");
});
