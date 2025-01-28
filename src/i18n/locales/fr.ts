import type { Messages } from "../types";

const messages: Messages = {
  common: {
    welcome: "Bienvenue",
    login: "Connexion",
    register: "S'inscrire",
    logout: "Déconnexion",
    email: "E-mail",
    password: "Mot de passe",
    submit: "Envoyer",
    cancel: "Annuler",
    home: "Accueil",
    greeting: "Bienvenue, {name}",
  },
  auth: {
    login: "Connexion",
    email: "E-mail",
    password: "Mot de passe",
    emailPlaceholder: "Entrez votre e-mail",
    passwordPlaceholder: "Entrez votre mot de passe",
    loggingIn: "Connexion en cours...",
    loginError: "Échec de la connexion",
    userNotFound: "Utilisateur non trouvé",
    invalidCredentials: "E-mail ou mot de passe invalide",
  },
  validation: {
    required: "Ce champ est obligatoire",
    invalidEmail: "Veuillez entrer un e-mail valide",
    passwordLength: "Le mot de passe doit contenir au moins 6 caractères",
  },
  messages: {
    loginSuccess: "Connexion réussie",
    logoutSuccess: "Déconnexion réussie",
    registerSuccess: "Inscription réussie",
  },
};

export default messages;
