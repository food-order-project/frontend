<template>
  <div class="user-view">
    <h1>User Dashboard</h1>
    <UserPanel />
  </div>
</template>

<script setup lang="ts">
import UserPanel from '../components/UserPanel.vue'
</script>

<style scoped>
.user-view {
  padding: 20px;
}
</style> 