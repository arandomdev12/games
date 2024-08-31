// Get elements
const loginForm = document.getElementById('login-form');
const passwordInput = document.getElementById('password');
const usernameInput = document.getElementById('username');
const loginScreenContainer = document.getElementById('login-screen-container');
const desktop = document.getElementById('desktop');

// Handle login functionality
function handleLogin(event) {
  event.preventDefault();
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  // Replace with your actual authentication logic
  if (username === 'WEBOSB3TA' && password === 'WEBOS') {
    // Successful login
    loginScreenContainer.style.opacity = '0';
    setTimeout(() => {
      loginScreenContainer.style.display = 'none';
      desktop.style.display = 'block';
    }, 500);
  } else {
    // Incorrect credentials
    showError('Incorrect username or password.');
  }
}

function showError(message) {
  const errorElement = document.getElementById('login-error');
  if (!errorElement) {
    const error = document.createElement('p');
    error.id = 'login-error';
    error.style.color = '#d93025';
    error.style.marginTop = '10px';
    loginForm.appendChild(error);
  }
  errorElement.textContent = message;
}

// Add event listener
loginForm.addEventListener('submit', handleLogin);
