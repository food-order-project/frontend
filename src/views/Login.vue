<template>
  <div class="login-container">
    <div class="language-switcher-wrapper">
      <LanguageSwitcher />
    </div>

    <form @submit.prevent="handleLogin" class="login-form">
      <h2>{{ $t("auth.login") }}</h2>

      <div v-if="error" class="error-message">
        {{ error }}
      </div>

      <div class="form-group">
        <label for="email">{{ $t("auth.email") }}</label>
        <input
          type="email"
          id="email"
          v-model="email"
          required
          :placeholder="$t('auth.emailPlaceholder')"
        />
      </div>

      <div class="form-group">
        <label for="password">{{ $t("auth.password") }}</label>
        <input
          type="password"
          id="password"
          v-model="password"
          required
          :placeholder="$t('auth.passwordPlaceholder')"
        />
      </div>

      <button type="submit" class="login-button" :disabled="loading">
        {{ loading ? $t("auth.loggingIn") : $t("auth.login") }}
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
import { authService } from "../services/auth.service";
import LanguageSwitcher from "../components/LanguageSwitcher.vue";

export default defineComponent({
  name: "Login",
  components: {
    LanguageSwitcher,
  },
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();

    const email = ref("manager@example.com");
    const password = ref("123456");
    const error = ref("");
    const loading = ref(false);

    const handleLogin = async () => {
      error.value = "";
      loading.value = true;

      try {
        const response = await authService.login({
          email: email.value,
          password: password.value,
        });

        if (response.user) {
          authStore.setToken(response.access_token);
          authStore.setUser({
            id: response.user.id,
            email: response.user.email,
            name: response.user.name,
            role: response.user.role,
            roles: response.user.roles,
          });
          router.push("/");
        } else {
          throw new Error("User information could not be retrieved");
        }
      } catch (err: any) {
        error.value = err.message;
      } finally {
        loading.value = false;
      }
    };

    return {
      email,
      password,
      handleLogin,
      error,
      loading,
    };
  },
});
</script>

<style scoped>
.login-container {
  position: relative;
  background-color: var(--panel-bg);
  border-radius: 8px;
  box-shadow: var(--card-shadow);
  padding: 2rem;
  max-width: 400px;
  margin: 2rem auto;
}

.language-switcher-wrapper {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 1000;
}

.login-form {
  background: rgb(246, 246, 246);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  margin: auto;
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--input-border);
  border-radius: 4px;
  background-color: var(--input-bg);
  color: var(--input-text);
}

input:focus {
  outline: none;
  border-color: var(--btn-primary);
}

.login-button {
  background-color: var(--btn-primary);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s;
}

.login-button:hover {
  background-color: var(--btn-hover);
}

.error-message {
  color: #dc3545;
  margin-top: 1rem;
  text-align: center;
}

.login-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>
