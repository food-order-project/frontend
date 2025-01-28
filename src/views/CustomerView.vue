<template>
  <div class="customer-view">
    <h1>Customer Dashboard</h1>
    <CustomerPanel />
  </div>
</template>

<script setup lang="ts">
import CustomerPanel from '../components/CustomerPanel.vue'
</script>

<style scoped>
.customer-view {
  padding: 20px;
}
</style> 