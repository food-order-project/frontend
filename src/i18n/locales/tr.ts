import type { Messages } from "../types";

const messages: Messages = {
  common: {
    welcome: "Hoş Geldiniz",
    login: "Giriş Yap",
    register: "Kayıt Ol",
    logout: "Çıkış Yap",
    email: "E-posta",
    password: "Şifre",
    submit: "Gönder",
    cancel: "İptal",
    home: "Ana Sayfa",
    greeting: "Hoş geldin, {name}",
  },
  auth: {
    login: "Giriş Yap",
    email: "E-posta",
    password: "Şifre",
    emailPlaceholder: "E-posta adresinizi girin",
    passwordPlaceholder: "Şifrenizi girin",
    loggingIn: "Giriş yapılıyor...",
    loginError: "Giriş başarısız",
    userNotFound: "Kullanıcı bulunamadı",
    invalidCredentials: "Geçersiz e-posta veya şifre",
  },
  validation: {
    required: "Bu alan zorunludur",
    invalidEmail: "Lütfen geçerli bir e-posta adresi girin",
    passwordLength: "Şifre en az 6 karakter olmalıdır",
  },
  messages: {
    loginSuccess: "Başarıyla giriş yapıldı",
    logoutSuccess: "Başarıyla çıkış yapıldı",
    registerSuccess: "Başarıyla kayıt olundu",
  },
};

export default messages;
