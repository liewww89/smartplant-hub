// header.js

/**
 * Updates the header area to show user info if logged in,
 * or show Login/Register links if not.
 */
function updateHeaderUser() {
  const headerIcons = document.querySelector('.header-icons');
  if (!headerIcons) return;

  const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
  let user = null;

  try {
    user = JSON.parse(localStorage.getItem('loggedInUser'));
  } catch {
    user = null;
  }

  if (isLoggedIn && user) {
    const userName = sanitizeHTML(user.name || "User");

    headerIcons.innerHTML = `
      <span style="margin-right: 15px;">Welcome, ${userName}</span>
      <button id="logout-btn" class="btn-logout">Logout</button>
    `;

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', logoutUser);
    }
  } else {
    headerIcons.innerHTML = `
      <a href="login.html" class="login-btn">Login</a>
      <a href="register.html" class="register-btn">Register</a>
    `;
  }
}

/**
 * Logs out the user and redirects to homepage.
 */
function logoutUser() {
  localStorage.removeItem('loggedIn');
  localStorage.removeItem('loggedInUser');
  alert("You have been logged out.");
  window.location.href = "index.html";
}

/**
 * Sanitizes a string to prevent HTML injection.
 * @param {string} str - Text to sanitize.
 * @returns {string} Safe HTML string.
 */
function sanitizeHTML(str) {
  const temp = document.createElement('div');
  temp.textContent = str;
  return temp.innerHTML;
}

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', updateHeaderUser);

// Optional: Expose logout function globally for use elsewhere
window.logoutUser = logoutUser;
