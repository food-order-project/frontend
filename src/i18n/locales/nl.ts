import type { Messages } from "../types";

const messages: Messages = {
  common: {
    welcome: "Welkom",
    login: "Inloggen",
    register: "Registreren",
    logout: "Uitloggen",
    email: "E-mail",
    password: "Wachtwoord",
    submit: "Verzenden",
    cancel: "Annuleren",
    home: "Home",
    greeting: "Welkom, {name}",
  },
  auth: {
    login: "Inloggen",
    email: "E-mail",
    password: "Wachtwoord",
    emailPlaceholder: "Voer uw e-mailadres in",
    passwordPlaceholder: "Voer uw wachtwoord in",
    loggingIn: "Bezig met inloggen...",
    loginError: "Inloggen mislukt",
    userNotFound: "Gebruiker niet gevonden",
    invalidCredentials: "Ongeldig e-mailadres of wachtwoord",
  },
  validation: {
    required: "Dit veld is verplicht",
    invalidEmail: "Voer een geldig e-mailadres in",
    passwordLength: "Wachtwoord moet minimaal 6 tekens bevatten",
  },
  messages: {
    loginSuccess: "Succesvol ingelogd",
    logoutSuccess: "Succesvol uitgelogd",
    registerSuccess: "Succesvol geregistreerd",
  },
};

export default messages;
