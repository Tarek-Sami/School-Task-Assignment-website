const role = localStorage.getItem("role");

let navbarFile = "../shared/main-nav.html";

if (role === "admin") {
  navbarFile = "../shared/admin-nav.html";
} else if (role === "teacher") {
  navbarFile = "../shared/teacher-nav.html";
}

fetch(navbarFile)
  .then((res) => res.text())
  .then((data) => {
    document.getElementById("navbar").innerHTML = data;

    const icon = document.querySelector(".icon");
    const linksContainer = document.querySelector(".links-container");
    const overlay = document.querySelector(".overlay");

    icon.addEventListener("click", () => {
      linksContainer.classList.toggle("show");
      overlay.classList.toggle("active");
      icon.classList.toggle("clicked");
    });

    overlay.addEventListener("click", () => {
      linksContainer.classList.remove("show");
      overlay.classList.remove("active");
      icon.classList.remove("clicked");
    });
  });

function logout() {
  localStorage.removeItem("role");
  window.location.href = "/index.html";
}
