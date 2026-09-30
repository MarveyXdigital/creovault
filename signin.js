const signupForm = document.getElementById("signup-form");
const signInForm = document.getElementById("signin-form");

const validateForm = (form, event) => {
  event.preventDefault();

  const inputs = form.querySelectorAll("input");
  const submitError = form.querySelector(".submit-error");
  let isFormValid = true;

  inputs.forEach((input) => {
    const errorElement = document.getElementById(`${input.id}Error`);
    const value = input.value.trim();
    let errorMessage = "";
    let emailRegex = /\S+@\S+\.\S+/;
    let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (value === "") {
      errorMessage = `${input.id || "Field"} is required`;
    } else if (input.type === "email" && !emailRegex.test(value)) {
      errorMessage = "Invalid email format";
    } else if (input.id === "confirmPassword") {
      const passwordInput = form.querySelector("#password");
      if (value !== passwordInput.value) {
        errorMessage = "Passwords do not match";
      } else if (input.type !== passwordRegex.test(value)) {
        errorMessage = "Input a stronger Password";
      }
    }

    // adding and removing error styling
    if (errorMessage) {
      if (errorElement) errorElement.textContent = errorMessage;
      input.classList.add("input-error");
      isFormValid = false;
    } else {
      if (errorElement) errorElement.textContent = "";
      input.classList.remove("input-error");
    }
  });

  if (!isFormValid) {
    if (submitError)
      submitError.textContent = "! Please fill in the information correctly";
    return false;
  }

  if (submitError) submitError.textContent = "";
  alert();
  (`${form.id === "signup-form" ? "Registration" : "Sign In"} successful!`,
    (window.location.href = "signin.html"));
  return true;
};

if (signupForm) {
  signupForm.addEventListener("submit", (e) => validateForm(signupForm, e));
}
if (signInForm) {
  signInForm.addEventListener("submit", (e) => validateForm(signInForm, e));
}
