const footer = document.querySelector(".footer");
const role = localStorage.getItem("role");
let dashboardLink = "";
let year = new Date().getFullYear();

if (role === "admin") {
  dashboardLink = `
    <li><a href="/admin/dashboard.html">Dashboard</a></li>
  `;
} else if (role === "teacher") {
  dashboardLink = `
    <li><a href="/teacher/dashboard.html">Dashboard</a></li>
  `;
} else if (!role) {
  dashboardLink = `
    <li><a href="/shared/login.html">Login</a></li>
    <li><a href="/shared/signup.html">Sign Up</a></li>

  `;
}

footer.innerHTML = `
<footer>
      <div class="footer-container">
        <div class="left">
          <img
        class="logo"
        src="/assets/media/logo/purpleLogo.png"
        alt=""
      />
          <p>
            © ${year} EduFlow Academy. Empowering learners. Shaping the future of education.
            education.
          </p>
        </div>
        <div class="right">
          <div>
            <h3>Platform</h3>
            <ul>
            <li><a href="/">EduFlow</a></li>
            </ul>
          </div>
          <div>
            <h3>Resources</h3>
            <ul>
                <li><a href="/shared/privacy.html">Privacy Policy</a></li>
                   <li><a href="/shared/about.html">About Us</a></li>
            </ul>
          </div>

          ${
            dashboardLink
              ? `
  <div>
    <h3>Explore</h3>
    <ul>
    <li><a href="/">Home</a></li>
      ${dashboardLink}
    </ul>
  </div>
`
              : ""
          }
          <div>
            <h3>Contact Us</h3>
            <ul>
                <li>Location: Cairo, Egypt</li>
                <li>Phone: +20 123 456 789</li>
          
            </ul>
          </div>
        </div>
        <div class="contactAndIcons">
          <div class="contact-links">
            <div class="contact-row">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="contact-icon-link" aria-label="Facebook">
                <i class="fa-brands fa-facebook"></i>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="contact-text-link">EduFlow</a>
            </div>
            <div class="contact-row">
              <a href="mailto:test@gmail.com" target="_blank" class="contact-icon-link" aria-label="Email">
                <i class="fa-solid fa-envelope"></i>
              </a>
              <a href="mailto:test@gmail.com" class="contact-text-link">test@gmail.com</a>
            </div>
            <div class="contact-row">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="contact-icon-link" aria-label="LinkedIn">
                <i class="fa-brands fa-linkedin"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="contact-text-link">EduFlow</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
`;
