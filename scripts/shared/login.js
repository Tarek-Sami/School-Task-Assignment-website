const form = document.querySelector("form");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const role = localStorage.getItem("role");

    if (!role) {
      return (window.location.href = "/shared/signup.html");
    }

    window.location.href = `/${role}/dashboard.html`;
  });
}
