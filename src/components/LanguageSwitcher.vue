<template>
  <div class="language-switcher">
    <v-menu
      v-model="showLangMenu"
      :close-on-content-click="false"
      location="bottom end"
    >
      <template v-slot:activator="{ props }">
        <v-btn variant="text" v-bind="props" class="lang-button" size="small">
          {{ getFlag(currentLanguage) }}
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="lang in languages"
          :key="lang.code"
          @click="changeLanguage(lang.code)"
          :active="currentLanguage === lang.code"
          :value="lang.code"
        >
          <v-list-item-title>{{ lang.flag }} {{ lang.name }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";

interface Language {
  code: string;
  name: string;
  flag: string;
}

export default defineComponent({
  name: "LanguageSwitcher",
  setup() {
    const { locale } = useI18n();
    const showLangMenu = ref(false);
    const currentLanguage = ref(locale.value);

    const languages: Language[] = [
      { code: "tr-TR", name: "Türkçe", flag: "🇹🇷" },
      { code: "en-US", name: "English", flag: "🇺🇸" },
      { code: "de-DE", name: "Deutsch", flag: "🇩🇪" },
      { code: "nl-NL", name: "Nederlands", flag: "🇳🇱" },
      { code: "fr-FR", name: "Français", flag: "🇫🇷" },
      { code: "ar-SA", name: "العربية", flag: "🇸🇦" },
    ];

    const getFlag = (langCode: string): string => {
      const lang = languages.find((l) => l.code === langCode);
      return lang ? lang.flag : "🌐";
    };

    const changeLanguage = (lang: string) => {
      locale.value = lang;
      currentLanguage.value = lang;
      localStorage.setItem("app-lang", lang);
      showLangMenu.value = false;
    };

    return {
      showLangMenu,
      currentLanguage,
      changeLanguage,
      languages,
      getFlag,
    };
  },
});
</script>

<style scoped>
.language-switcher {
  display: inline-flex;
  align-items: center;
}

.lang-button {
  min-width: 0;
  padding: 0.5rem;
}
</style>
