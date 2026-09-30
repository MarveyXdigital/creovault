const signupForm = document.getElementById("signup-form");
const signInForm = document.getElementById("signin-form");

function validateFirstName() {
  const firstNameInput = document.getElementById("firstName");
  const firstNameError = document.getElementById("firstNameError");
  const firstName = firstNameInput.value.trim();
  if (firstName === "") {
    firstNameError.textContent = "First Name required";
    firstNameInput.classList.add("input-error");
    return false;
  } else {
    firstNameError.textContent = "";
    firstNameInput.classList.remove("input-error");
    return true;
  }
}

function validateLastName() {
  const lastNameInput = document.getElementById("lastName");
  const lastNameError = document.getElementById("lastNameError");
  const lastName = lastNameInput.value.trim();
  if (lastName === "") {
    lastNameError.textContent = "Last Name required";
    lastNameInput.classList.add("input-error");
    return false;
  } else {
    lastNameError.textContent = "";
    lastNameInput.classList.remove("input-error");
    return true;
  }
}

// Email validation
function validateEmail() {
  const emailInput = document.getElementById("email");
  const emailError = document.getElementById("emailError");
  const email = emailInput.value.trim();
  if (email === "") {
    emailError.textContent = "Email required";
    emailInput.classList.add("input-error");
    return false;
  } else {
    emailError.textContent = "";
    emailInput.classList.remove("input-error");
    return true;
  }
}

// password validation
function validatePassword() {
  const passwordInput = document.getElementById("password");
  const passwordError = document.getElementById("passwordError");
  const password = passwordInput.value.trim();
  if (password === "") {
    passwordError.textContent = "Password required";
    passwordInput.classList.add("input-error");
    return false;
  } else {
    passwordError.textContent = "";
    passwordInput.classList.remove("input-error");
    return true;
  }
}

function validateConfirmPassword() {
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const confirmPasswordError = document.getElementById("confirmPasswordError");
  const passwordInput = document.getElementById("password");
  const confirmPassword = confirmPasswordInput.value.trim();
  const password = passwordInput.value.trim();
  if (confirmPassword === "") {
    confirmPasswordError.textContent = "Please confirm your password";
    confirmPasswordInput.classList.add("input-error");
    return false;
  }
  if (confirmPassword !== password) {
    confirmPasswordError.textContent = "Passwords do not match";
    confirmPasswordInput.classList.add("input-error");
    return false;
  }
  confirmPasswordError.textContent = "";
  confirmPasswordInput.classList.remove("input-error");
  return true;
}

// BUTTON VALIDATION
if (signupForm) {
  signupForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const submitError = document.getElementById("submit-error");
    const firstNameValid = validateFirstName();
    const lastNameValid = validateLastName();
    const emailValid = validateEmail();
    const passwordValid = validatePassword();
    const confirmPasswordValid = validateConfirmPassword();

    if (
      !firstNameValid ||
      !lastNameValid ||
      !emailValid ||
      !passwordValid ||
      !confirmPasswordValid
    ) {
      submitError.textContent = "! Please fill in the informations above";
      return;
    }

    submitError.textContent = "";
    alert("Registration successful!");
  });
}
// SIGN IN
function validateLoginMail() {
  const loginEmailInput = document.getElementById("loginEmail");
  const emailError = document.getElementById("loginEmailError");
  const loginEmail = loginEmailInput.value.trim();

  if (loginEmail === "") {
    emailError.textContent = "Enter a valid email";
    loginEmailInput.classList.add("input-error");
    return false;
  } else {
    emailError.textContent = "";
    loginEmailInput.classList.remove("input-error");
    return true;
  }
}

function validateLoginPassword() {
  const loginPasswordInput = document.getElementById("loginPassword");
  const passwordErrorInput = document.getElementById("loginPasswordError");
  const loginPassword = loginPasswordInput.value.trim();
  if (loginPassword === "") {
    passwordErrorInput.textContent = "wrong credientials";
    loginPasswordInput.classList.add("input-error");
    return false;
  } else {
    passwordErrorInput.textContent = "";
    loginPasswordInput.classList.remove("input-error");
    return true;
  }
}
// sign in button
if (signInForm) {
  signInForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const submitError = document.getElementById("submit-error");
    const emailValid = validateLoginMail();
    const passwordValid = validateLoginPassword();

    if (!emailValid || !passwordValid) {
      submitError.textContent = "! Please fill in the informations above";
      return;
    }
    submitError.textContent = "";
    alert("Login successful");
  });
}
