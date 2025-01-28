import type { Messages } from "../types";

const messages: Messages = {
  common: {
    welcome: "مرحباً",
    login: "تسجيل الدخول",
    register: "تسجيل",
    logout: "تسجيل الخروج",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    submit: "إرسال",
    cancel: "إلغاء",
    home: "الرئيسية",
    greeting: "مرحباً، {name}",
  },
  auth: {
    login: "تسجيل الدخول",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    emailPlaceholder: "أدخل بريدك الإلكتروني",
    passwordPlaceholder: "أدخل كلمة المرور",
    loggingIn: "جاري تسجيل الدخول...",
    loginError: "فشل تسجيل الدخول",
    userNotFound: "المستخدم غير موجود",
    invalidCredentials: "البريد الإلكتروني أو كلمة المرور غير صحيحة",
  },
  validation: {
    required: "هذا الحقل مطلوب",
    invalidEmail: "يرجى إدخال بريد إلكتروني صحيح",
    passwordLength: "يجب أن تحتوي كلمة المرور على 6 أحرف على الأقل",
  },
  messages: {
    loginSuccess: "تم تسجيل الدخول بنجاح",
    logoutSuccess: "تم تسجيل الخروج بنجاح",
    registerSuccess: "تم التسجيل بنجاح",
  },
};

export default messages;
