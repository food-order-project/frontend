<template>
  <div class="login-container">
    <form @submit.prevent="handleLogin" class="login-form">
      <h2>Giriş Yap</h2>

      <div v-if="error" class="error-message">
        {{ error }}
      </div>

      <div class="form-group">
        <label for="email">E-posta</label>
        <input
          type="email"
          id="email"
          v-model="email"
          required
          placeholder="E-posta adresiniz"
        />
      </div>

      <div class="form-group">
        <label for="password">Şifre</label>
        <input
          type="password"
          id="password"
          v-model="password"
          required
          placeholder="Şifreniz"
        />
      </div>

      <button type="submit" class="login-button" :disabled="loading">
        {{ loading ? 'Giriş yapılıyor...' : 'Giriş Yap' }}
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
import { authService } from "../services/auth.service";

export default defineComponent({
  name: "Login",
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();
    const email = ref("");
    const password = ref("");
    const error = ref("");
    const loading = ref(false);

    const handleLogin = async () => {
      error.value = "";
      loading.value = true;

      try {
        const response = await authService.login({
          email: email.value,
          password: password.value
        });

        console.log('Login Response:', response); // Response'u kontrol edelim

        if (response.user) {
          authStore.setToken(response.access_token);
          authStore.setUser({
            id: response.user.id,
            email: response.user.email,
            name: response.user.name,
            role: response.user.role,
            roles: response.user.roles
          });
          router.push("/");
        } else {
          throw new Error('Kullanıcı bilgileri alınamadı');
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
      loading
    };
  },
});
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #b7b1b1;
  margin: auto;
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
  color: #666;
}

input {
  width: 80%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  
}

.login-button {
  width: 50%;
  padding: 0.75rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.1s;

}

.login-button:hover {
  background-color: #45a049;
}

.error-message {
  background-color: #ffebee;
  color: #c62828;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 1rem;
  text-align: center;
}

.login-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>
