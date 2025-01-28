<template>
  <div id="app" :class="{ 'dark-mode': themeStore.isDark }">
    <Navbar />
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import Navbar from './components/Navbar.vue'
import { useThemeStore } from './stores/theme'

const themeStore = useThemeStore()

onMounted(() => {
  themeStore.initTheme()
})
</script>

<style>
:root {
  /* Light theme variables */
  --bg-primary: #ffffff;
  --bg-secondary: #f8f9fa;
  --bg-tertiary: #e9ecef;
  --text-primary: #2c3e50;
  --text-secondary: #6c757d;
  --text-tertiary: #495057;
  --border-color: #dee2e6;
  --navbar-bg: #333;
  --navbar-text: #ffffff;
  --btn-primary: #4CAF50;
  --btn-hover: #45a049;
  --card-bg: #ffffff;
  --card-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  --input-bg: #ffffff;
  --input-border: #ced4da;
  --input-text: #495057;
  --panel-bg: #ffffff;
  --hover-bg: #f8f9fa;
}

[data-theme="dark"] {
  /* Dark theme variables */
  --bg-primary: #1a1a1a;
  --bg-secondary: #2d2d2d;
  --bg-tertiary: #404040;
  --text-primary: #ffffff;
  --text-secondary: #b3b3b3;
  --text-tertiary: #888888;
  --border-color: #404040;
  --navbar-bg: #000000;
  --navbar-text: #ffffff;
  --btn-primary: #45a049;
  --btn-hover: #4CAF50;
  --card-bg: #2d2d2d;
  --card-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  --input-bg: #333333;
  --input-border: #404040;
  --input-text: #ffffff;
  --panel-bg: #2d2d2d;
  --hover-bg: #363636;
}

#app {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--text-primary);
  margin: auto;
  background-color: var(--bg-primary);
  min-height: 100vh;
  transition: all 0.3s ease;
}

nav {
  padding: 30px;
  background-color: var(--navbar-bg);
}

nav a {
  font-weight: bold;
  color: var(--navbar-text);
  text-decoration: none;
}

nav a.router-link-exact-active {
  color: var(--btn-primary);
}

.content {
  margin-top: 64px;
  padding: 20px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: var(--bg-primary);
}
</style>
