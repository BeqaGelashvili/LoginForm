import { validateEmail, validatePassword } from './validation.js';
import { loginUser } from './auth-service.js';
import { initPasswordToggles } from './password-toggle.js';


const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');

initPasswordToggles();

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  emailError.textContent = '';
  passwordError.textContent = '';
  emailInput.classList.remove('error-border');
  passwordInput.classList.remove('error-border');

  const emailValue = emailInput.value;
  const passwordValue = passwordInput.value;
  let hasError = false;

  if (!validateEmail(emailValue)) {
    emailError.textContent = 'Wrong name of email';
    emailInput.classList.add('error-border');
    hasError = true;
  }

  if (!validatePassword(passwordValue)) {
    passwordError.textContent = 'Password must be at least 8 characters';
    passwordInput.classList.add('error-border');
    hasError = true;
  }

  if (hasError) return;

  try {
    const data = await loginUser({ email: emailValue, password: passwordValue });
    alert('Login successful!');
    window.location.reload();
  } catch (err) {
    emailError.textContent = 'Incorrect email or password';
    emailInput.classList.add('error-border');
    passwordInput.classList.add('error-border');
  }
});