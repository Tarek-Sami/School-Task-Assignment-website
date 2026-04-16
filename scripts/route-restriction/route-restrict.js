const path = window.location.pathname;
const profileLocalStorage = localStorage.getItem("profile");
if (!path.includes("/error-pages/")) {
  const role = localStorage.getItem("role");
  if (
    !role &&
    (path.includes("/admin/") ||
      path.includes("/teacher/") ||
      path.includes("/task-details.html") ||
      path.includes("/profile.html") ||
      path.includes("/edit-profile.html"))
  ) {
    window.location.href = "/error-pages/unauthorized.html";
  } else if (role === "teacher" && path.includes("/admin/")) {
    window.location.href = "/error-pages/unauthorized.html";
  } else if (role === "admin" && path.includes("/teacher/")) {
    window.location.href = "/error-pages/not-found.html";
  } else if (
    !path.includes("/teacher/") &&
    !path.includes("/admin/") &&
    !path.includes("/shared/") &&
    !path.includes("/index.html") &&
    path !== "/"
  ) {
    window.location.href = "/error-pages/not-found.html";
  }
}

if (
  profileLocalStorage &&
  (path.endsWith("login.html") || path.endsWith("signup.html"))
) {
  window.location.href = `/index.html`;
}
