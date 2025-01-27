<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <router-link to="/" class="logo">Logo</router-link>
    </div>

    <div class="navbar-menu">
      <router-link to="/" class="nav-link">Ana Sayfa</router-link>
      <div v-if="authStore.isAuthenticated" class="nav-right">
        <span class="username">Sayın  {{ authStore.userName }}  Hoş geldiniz</span>
        <button @click="handleLogout" class="logout-button">Çıkış Yap</button>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

export default defineComponent({
  name: 'Navbar',
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()

    const handleLogout = () => {
      authStore.clearToken()
      router.push('/login')
    }

    return {
      authStore,
      handleLogout
    }
  }
})
</script>

<style scoped>
.navbar {
  background-color: #333;
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
  color: white;
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
  color: white;
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #4CAF50;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.username {
  color: white;
  font-weight: 500;
}

.logout-button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.logout-button:hover {
  background-color: #45a049;
}
</style> 