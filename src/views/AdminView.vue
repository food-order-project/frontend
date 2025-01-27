<template>
  <div class="admin-view">
    <h1>Admin Dashboard</h1>
    <AdminPanel />
  </div>
</template>

<script setup lang="ts">
import AdminPanel from '../components/AdminPanel.vue'
</script>

<style scoped>
.admin-view {
  padding: 20px;
}
</style> 