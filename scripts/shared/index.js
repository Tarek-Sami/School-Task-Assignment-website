const SEED_ADMIN_USERNAME = "Dr. Kareem Adel";

const PASSWORD_HASH = {
  admin: "790f48e3ba51e2d0762e7d4a74d4076a62cfb34d44e3dfbc43798fe9ff399602",
  teacher1: "773a9ceba0072da19a5ea8432261c98eaa12aa6935047edc60dc5d3fa1d93cb8",
  teacher2: "3ba26032a9eb72f2b52e9a1ff9933610b001cdd51ee45d869a28c67db09e4b48",
};

if (!localStorage.getItem("users")) {
  const initialUsers = [
    {
      id: crypto.randomUUID(),
      name: "Dr. Kareem Adel",
      username: SEED_ADMIN_USERNAME,
      email: "admin@schooltask.local",
      phone: "01000000001",
      password: PASSWORD_HASH.admin,
      role: "admin",
      department: "Administration",
      gender: "male",
      numberOfTasks: 0,
      status: "online",
    },
    {
      id: crypto.randomUUID(),
      name: "Dr. Nadia Hassan",
      username: "nadiahassan",
      email: "nadia.hassan@schooltask.local",
      phone: "01011112222",
      password: PASSWORD_HASH.teacher1,
      role: "teacher",
      department: "Mathematics",
      gender: "female",
      numberOfTasks: 4,
      status: "online",
    },
    {
      id: crypto.randomUUID(),
      name: "Dr. Omar Farid",
      username: "omarfarid",
      email: "omar.farid@schooltask.local",
      phone: "01033334444",
      password: PASSWORD_HASH.teacher2,
      role: "teacher",
      department: "Physics",
      gender: "male",
      numberOfTasks: 4,
      status: "online",
    },
  ];
  localStorage.setItem("users", JSON.stringify(initialUsers));
}

if (!localStorage.getItem("teachers")) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const idFor = (username) =>
    users.find((u) => u.username === username)?.id ?? crypto.randomUUID();

  const initialTeachers = [
    {
      id: idFor("nadiahassan"),
      name: "Dr. Nadia Hassan",
      username: "nadiahassan",
      email: "nadia.hassan@schooltask.local",
      department: "Mathematics",
      phone: "01011112222",
      gender: "Female",
      status: "online",
      numberOfTasks: 4,
    },
    {
      id: idFor("omarfarid"),
      name: "Dr. Omar Farid",
      username: "omarfarid",
      email: "omar.farid@schooltask.local",
      department: "Physics",
      phone: "01033334444",
      gender: "Male",
      status: "online",
      numberOfTasks: 4,
    },
    {
      id: crypto.randomUUID(),
      name: "Dr. Layla Mansour",
      username: "laylamansour",
      email: "layla.mansour@schooltask.local",
      department: "Computer Science",
      phone: "01055556666",
      gender: "Female",
      status: "offline",
      numberOfTasks: 3,
    },
    {
      id: crypto.randomUUID(),
      name: "Dr. Youssef Kamal",
      username: "youssefkamal",
      email: "youssef.kamal@schooltask.local",
      department: "Chemistry",
      phone: "01066667777",
      gender: "Male",
      status: "online",
      numberOfTasks: 0,
    },
    {
      id: crypto.randomUUID(),
      name: "Dr. Hana Ibrahim",
      username: "hanaibrahim",
      email: "hana.ibrahim@schooltask.local",
      department: "Biology",
      phone: "01077778888",
      gender: "Female",
      status: "online",
      numberOfTasks: 0,
    },
    {
      id: crypto.randomUUID(),
      name: "Dr. Karim Nasser",
      username: "karimnasser",
      email: "karim.nasser@schooltask.local",
      department: "English",
      phone: "01088889999",
      gender: "Male",
      status: "offline",
      numberOfTasks: 0,
    },
    {
      id: crypto.randomUUID(),
      name: "Dr. Amira Fouad",
      username: "amirafouad",
      email: "amira.fouad@schooltask.local",
      department: "History",
      phone: "01099990000",
      gender: "Female",
      status: "online",
      numberOfTasks: 0,
    },
    {
      id: crypto.randomUUID(),
      name: "Dr. Tarek Selim",
      username: "tarekselim",
      email: "tarek.selim@schooltask.local",
      department: "Art",
      phone: "01012121212",
      gender: "Male",
      status: "offline",
      numberOfTasks: 0,
    },
  ];
  localStorage.setItem("teachers", JSON.stringify(initialTeachers));
}

if (!localStorage.getItem("tasks")) {
  const initialTasks = [
    {
      id: crypto.randomUUID(),
      headline: "Midterm examination materials",
      title: "Calculus II midterm prep",
      description: "Draft exam questions and a solution key for chapters 4-6.",
      priority: "high",
      teacher: "nadiahassan",
      deadline: "2026-05-10",
      status: "pending",
      madeBy: SEED_ADMIN_USERNAME,
      progress: 0,
    },
    {
      id: crypto.randomUUID(),
      headline: "Weekly problem set",
      title: "Mechanics homework set 7",
      description:
        "Prepare problems on rotational motion and angular momentum.",
      priority: "medium",
      teacher: "omarfarid",
      deadline: "2026-04-22",
      status: "pending",
      madeBy: SEED_ADMIN_USERNAME,
      progress: 0,
    },
    {
      id: crypto.randomUUID(),
      headline: "Lab session review",
      title: "Mathematics lab checklist",
      description:
        "Verify software versions and worksheet copies for next lab.",
      priority: "low",
      teacher: "nadiahassan",
      deadline: "2026-04-08",
      status: "pending",
      madeBy: SEED_ADMIN_USERNAME,
      progress: 0,
    },
    {
      id: crypto.randomUUID(),
      headline: "Department meeting deck",
      title: "Math curriculum Q2 update",
      description:
        "Slides summarizing syllabus changes and assessment weights.",
      priority: "medium",
      teacher: "nadiahassan",
      deadline: "2026-04-18",
      status: "pending",
      madeBy: SEED_ADMIN_USERNAME,
      progress: 0,
    },
    {
      id: crypto.randomUUID(),
      headline: "Student consultation hours",
      title: "Extra office hours April",
      description:
        "Post the revised schedule on the portal and notify advisees.",
      priority: "low",
      teacher: "nadiahassan",
      deadline: "2026-04-12",
      status: "pending",
      madeBy: SEED_ADMIN_USERNAME,
      progress: 0,
    },
    {
      id: crypto.randomUUID(),
      headline: "Lab equipment audit",
      title: "Physics lab inventory",
      description: "Check sensors and carts; report any items needing repair.",
      priority: "high",
      teacher: "omarfarid",
      deadline: "2026-04-25",
      status: "pending",
      madeBy: SEED_ADMIN_USERNAME,
      progress: 0,
    },
    {
      id: crypto.randomUUID(),
      headline: "Exam proctoring",
      title: "Spring finals coverage",
      description:
        "Confirm proctor slots and share the roster with the admin office.",
      priority: "high",
      teacher: "omarfarid",
      deadline: "2026-05-01",
      status: "pending",
      madeBy: SEED_ADMIN_USERNAME,
      progress: 0,
    },
    {
      id: crypto.randomUUID(),
      headline: "Thermodynamics unit",
      title: "Lecture notes refresh",
      description:
        "Update PDF notes for entropy and heat engines to match the new textbook.",
      priority: "medium",
      teacher: "omarfarid",
      deadline: "2026-05-05",
      status: "pending",
      madeBy: SEED_ADMIN_USERNAME,
      progress: 0,
    },
    {
      id: crypto.randomUUID(),
      headline: "Intro programming project",
      title: "Final project rubric",
      description:
        "Publish rubric and starter code for the data-structures mini project.",
      priority: "high",
      teacher: "laylamansour",
      deadline: "2026-04-30",
      status: "pending",
      madeBy: SEED_ADMIN_USERNAME,
      progress: 0,
    },
    {
      id: crypto.randomUUID(),
      headline: "Grading pipeline",
      title: "Autograder smoke tests",
      description:
        "Run tests on the server and fix any failing assignment batches.",
      priority: "medium",
      teacher: "laylamansour",
      deadline: "2026-04-15",
      status: "pending",
      madeBy: SEED_ADMIN_USERNAME,
      progress: 0,
    },
    {
      id: crypto.randomUUID(),
      headline: "Workshop announcement",
      title: "Git & GitHub refresher",
      description:
        "Prepare announcement text and book the lab for the weekend session.",
      priority: "low",
      teacher: "laylamansour",
      deadline: "2026-04-28",
      status: "pending",
      madeBy: SEED_ADMIN_USERNAME,
      progress: 0,
    },
  ];

  localStorage.setItem("tasks", JSON.stringify(initialTasks));
}

let role = localStorage.getItem("role");
const heroButtons = document.querySelector(".hero-btns");
const ctaButtons = document.querySelector(".cta-btns");
const hero = document.querySelector(".hero");
const p = document.querySelector(".words");

if (!role) {
  heroButtons.innerHTML = `
          <a href="/shared/login.html" class="btn btn-primary">Log in</a>
            <a href="/shared/signup.html" class="btn btn-outline text-primary"
              >Sign up</a
            >
  `;
  ctaButtons.innerHTML = `
    <a href="/shared/login.html" class="btn btn-primary">Log in</a>
    <a href="/shared/signup.html" class="btn btn-outline text-primary">Sign up</a>
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
