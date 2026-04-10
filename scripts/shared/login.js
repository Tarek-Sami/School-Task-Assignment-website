const loginButton = document.getElementById("loginButton");

loginButton.addEventListener("click", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  // let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  // Validation
  // if (!email.match(emailPattern)) {
  //   e.preventDefault();
  //   return;
  // }

  // if (password.length < 6) {
  //   e.preventDefault();
  //   return;
  // }

  // setTimeout(() => {
  const role = localStorage.getItem("role");

  if (!role) {
    window.location.href = "/shared/signup.html";
  } else {
    window.location.href = `/${role}/dashboard.html`;
  }
});
//   }, 1000);
// });
