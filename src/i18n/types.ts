export interface Messages {
  common: {
    welcome: string;
    login: string;
    register: string;
    logout: string;
    email: string;
    password: string;
    submit: string;
    cancel: string;
    home: string;
    greeting: string;
  };
  auth: {
    login: string;
    email: string;
    password: string;
    emailPlaceholder: string;
    passwordPlaceholder: string;
    loggingIn: string;
    loginError: string;
    userNotFound: string;
    invalidCredentials: string;
  };
  validation: {
    required: string;
    invalidEmail: string;
    passwordLength: string;
  };
  messages: {
    loginSuccess: string;
    logoutSuccess: string;
    registerSuccess: string;
  };
}
