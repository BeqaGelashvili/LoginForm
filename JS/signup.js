import { validateEmail, validatePassword } from "./validation.js";
import { initPasswordToggles } from "./password-toggle.js";


initPasswordToggles();

const signupForm = document.getElementById("signupForm");
const nameInput = document.getElementById("signupName");
const emailInput = document.getElementById("signupEmail");
const passwordInput = document.getElementById("signupPassword");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("signupEmailError");
const passwordError = document.getElementById("signupPasswordError");

function setError(el, msg) {
  if (!el) return;
  el.textContent = msg || "";
  const input = el.previousElementSibling;
  if (msg) {
    input?.classList.add('error-border');
  } else {
    input?.classList.remove('error-border');
  }
}

signupForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value;

  setError(nameError, "");
  setError(emailError, "");
  setError(passwordError, "");

  let ok = true;

  if (!name) {
    setError(nameError, "Please enter your full name.");
    ok = false;
  }

  if (!validateEmail(email)) {
    setError(emailError, "Please enter a valid email address.");
    ok = false;
  }

  if (!validatePassword(password)) {
    setError(passwordError, "Password must be at least 8 characters.");
    ok = false;
  }


  if (!ok) return;

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const userExists = users.find(u => u.email === email);
  if (userExists) {
    setError(emailError, "Email is already registered.");
    return;
  }

  const newUser = { name, email, password };
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  alert("Account created successfully! Redirecting to login...");
  
  window.location.href = "index.html";
});