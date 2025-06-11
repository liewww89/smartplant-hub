// userController.js

/**
 * Retrieve all users from localStorage.
 * @returns {Array} Array of user objects.
 */
function getUsers() {
  try {
    const users = JSON.parse(localStorage.getItem('users'));
    return Array.isArray(users) ? users : [];
  } catch {
    return [];
  }
}

/**
 * Save the users array to localStorage.
 * @param {Array} users - Array of user objects.
 */
function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

/**
 * Get the currently logged-in user from localStorage.
 * @returns {Object|null} The logged-in user object or null.
 */
function getLoggedInUser() {
  try {
    return JSON.parse(localStorage.getItem('loggedInUser'));
  } catch {
    return null;
  }
}

/**
 * Check if a user is currently logged in.
 * @returns {boolean} True if logged in, false otherwise.
 */
function isLoggedIn() {
  return localStorage.getItem('loggedIn') === 'true' && getLoggedInUser() !== null;
}

/**
 * Log out the current user.
 * Clears login data and redirects to index.html.
 */
function logout() {
  localStorage.removeItem('loggedIn');
  localStorage.removeItem('loggedInUser');
  alert('You have been logged out.');
  window.location.href = 'index.html';
}

/**
 * Validate email format.
 * @param {string} email
 * @returns {boolean}
 */
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email.toLowerCase());
}

// ----- Registration Form Handler -----
const registerForm = document.getElementById('register-form');
if (registerForm) {
  registerForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim().toLowerCase();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
      alert('Please fill out all fields.');
      return;
    }

    if (!isValidEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const users = getUsers();
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      alert("A user with this email already exists.");
      return;
    }

    const newUser = { name, email, password }; // Note: Password stored as plain text — insecure!
    users.push(newUser);
    saveUsers(users);

    alert("Registration successful! You can now log in.");
    window.location.href = "login.html";
  });
}

// ----- Login Form Handler -----
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim().toLowerCase();
    const password = document.getElementById('password').value;

    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }

    if (!isValidEmail(email)) {
      alert('Please enter a valid email.');
      return;
    }

    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      localStorage.setItem('loggedIn', 'true');
      alert(`Welcome, ${user.name}!`);
      window.location.href = "account.html";
    } else {
      alert("Invalid email or password.");
    }
  });
}

// Expose functions to global scope if needed
window.logout = logout;
window.getLoggedInUser = getLoggedInUser;
window.isLoggedIn = isLoggedIn;
