import { createI18n } from "vue-i18n";
import en from "./locales/en";
import tr from "./locales/tr";
import de from "./locales/de";
import fr from "./locales/fr";
import nl from "./locales/nl";
import ar from "./locales/ar";

// Get the stored language from localStorage or default to Turkish
const storedLang = localStorage.getItem("app-lang") || "tr-TR";

const i18n = createI18n({
  legacy: false,
  locale: storedLang, // use stored language
  fallbackLocale: "en-US",
  messages: {
    "en-US": en as any,
    "tr-TR": tr as any,
    "de-DE": de as any,
    "fr-FR": fr as any,
    "nl-NL": nl as any,
    "ar-SA": ar as any,
  },
} as any);

export default i18n;
