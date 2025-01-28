import type { Messages } from "../types";

const messages: Messages = {
  common: {
    welcome: "Welcome",
    login: "Login",
    register: "Register",
    logout: "Logout",
    email: "Email",
    password: "Password",
    submit: "Submit",
    cancel: "Cancel",
    home: "Home",
    greeting: "Welcome, {name}",
  },
  auth: {
    login: "Login",
    email: "Email",
    password: "Password",
    emailPlaceholder: "Enter your email",
    passwordPlaceholder: "Enter your password",
    loggingIn: "Logging in...",
    loginError: "Login failed",
    userNotFound: "User not found",
    invalidCredentials: "Invalid email or password",
  },
  validation: {
    required: "This field is required",
    invalidEmail: "Please enter a valid email",
    passwordLength: "Password must be at least 6 characters",
  },
  messages: {
    loginSuccess: "Successfully logged in",
    logoutSuccess: "Successfully logged out",
    registerSuccess: "Successfully registered",
  },
};

export default messages;
