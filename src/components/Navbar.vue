<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <router-link to="/" class="logo">Logo</router-link>
    </div>

    <div class="navbar-menu">
      <router-link to="/" class="nav-link">{{ $t("common.home") }}</router-link>
      <div v-if="authStore.isAuthenticated" class="nav-right">
        <span class="username"
          >{{ $t("common.greeting", { name: authStore.userName }) }}
        </span>
        <LanguageSwitcher />
        <button @click="themeStore.toggleTheme" class="theme-button">
          {{ themeStore.isDark ? "☀️" : "🌙" }}
        </button>

        <button @click="handleLogout" class="logout-button">
          {{ $t("common.logout") }}
        </button>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
import { useThemeStore } from "../stores/theme";
import LanguageSwitcher from "./LanguageSwitcher.vue";

export default defineComponent({
  name: "Navbar",
  components: {
    LanguageSwitcher,
  },
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();
    const themeStore = useThemeStore();

    const handleLogout = () => {
      authStore.clearAuth();
      router.push("/login");
    };

    return {
      authStore,
      themeStore,
      handleLogout,
    };
  },
});
</script>

<style scoped>
.navbar {
  background-color: var(--navbar-bg);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.navbar-brand {
  display: flex;
  align-items: center;
}

.logo {
  color: var(--navbar-text);
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold;
}

.navbar-menu {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-link {
  color: var(--navbar-text);
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.3s;
}

.nav-link:hover {
  color: var(--btn-primary);
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.username {
  color: var(--navbar-text);
  font-weight: 500;
}

.theme-button {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background-color 0.3s;
}

.theme-button:hover {
  background-color: var(--bg-secondary);
}

.logout-button {
  background-color: var(--btn-primary);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.logout-button:hover {
  background-color: var(--btn-hover);
}

.user-menu-btn {
  color: var(--navbar-text);
}

.user-menu-btn:hover {
  background-color: var(--bg-secondary);
}

.user-info {
  padding: 8px;
  font-weight: 500;
}

.menu-logout {
  color: rgb(var(--v-theme-error));
}
</style>
