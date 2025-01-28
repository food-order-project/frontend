import type { Messages } from "../types";

const messages: Messages = {
  common: {
    welcome: "Willkommen",
    login: "Anmelden",
    register: "Registrieren",
    logout: "Abmelden",
    email: "E-Mail",
    password: "Passwort",
    submit: "Absenden",
    cancel: "Abbrechen",
    home: "Startseite",
    greeting: "Willkommen, {name}",
  },
  auth: {
    login: "Anmelden",
    email: "E-Mail",
    password: "Passwort",
    emailPlaceholder: "E-Mail eingeben",
    passwordPlaceholder: "Passwort eingeben",
    loggingIn: "Anmeldung läuft...",
    loginError: "Anmeldung fehlgeschlagen",
    userNotFound: "Benutzer nicht gefunden",
    invalidCredentials: "Ungültige E-Mail oder Passwort",
  },
  validation: {
    required: "Dieses Feld ist erforderlich",
    invalidEmail: "Bitte geben Sie eine gültige E-Mail-Adresse ein",
    passwordLength: "Das Passwort muss mindestens 6 Zeichen lang sein",
  },
  messages: {
    loginSuccess: "Erfolgreich angemeldet",
    logoutSuccess: "Erfolgreich abgemeldet",
    registerSuccess: "Erfolgreich registriert",
  },
};

export default messages;
