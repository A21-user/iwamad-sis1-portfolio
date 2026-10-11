const root = document.documentElement;
const themeButton = document.querySelector("#theme-toggle");
const menuButton = document.querySelector("#menu-toggle");
const navLinks = document.querySelector("#nav-links");

function setTheme(theme) {
  root.dataset.theme = theme;
  const isDark = theme === "dark";
  themeButton.innerHTML = isDark ? "☀ <span>Theme</span>" : "☾ <span>Theme</span>";
  themeButton.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
}

themeButton.addEventListener("click", () => {
  setTheme(root.dataset.theme === "dark" ? "light" : "dark");
});

menuButton.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  menuButton.textContent = isOpen ? "✕" : "☰";
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
    menuButton.textContent = "☰";
  });
});

const form = document.querySelector("#contact-form");
const status = document.querySelector("#form-status");
const fields = {
  name: document.querySelector("#name"),
  email: document.querySelector("#email"),
  message: document.querySelector("#message")
};
const errors = {
  name: document.querySelector("#name-error"),
  email: document.querySelector("#email-error"),
  message: document.querySelector("#message-error")
};
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function showError(fieldName, message) {
  errors[fieldName].textContent = message;
  fields[fieldName].setAttribute("aria-invalid", message ? "true" : "false");
}

Object.keys(fields).forEach((fieldName) => {
  fields[fieldName].addEventListener("input", () => {
    showError(fieldName, "");
    status.textContent = "";
    status.className = "form-status";
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let firstInvalidField = null;
  let valid = true;

  Object.keys(fields).forEach((fieldName) => {
    const value = fields[fieldName].value.trim();
    let message = "";

    if (!value) {
      const labels = { name: "name", email: "email address", message: "message" };
      message = `Please enter your ${labels[fieldName]}.`;
    } else if (fieldName === "email" && !emailPattern.test(value)) {
      message = "Please enter a valid email address, for example name@example.com.";
    }

    showError(fieldName, message);
    if (message) {
      valid = false;
      firstInvalidField ??= fields[fieldName];
    }
  });

  if (!valid) {
    status.textContent = "Please correct the highlighted fields.";
    status.className = "form-status error";
    firstInvalidField.focus();
    return;
  }

  status.textContent = "Thank you! The form is valid. This demo does not send your message.";
  status.className = "form-status success";
  form.reset();
  Object.keys(fields).forEach((fieldName) => showError(fieldName, ""));
});
