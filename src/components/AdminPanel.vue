<template>
  <div class="admin-panel">
    <div class="admin-header">
      <h2>Admin Panel</h2>
    </div>
    <div class="admin-content">
      <!-- Add your admin functionality here -->
      <div class="admin-stats">
        <h3>Statistics</h3>
        <!-- Add statistics components -->
      </div>
      
      <div class="admin-controls">
        <h3>Controls</h3>
        <!-- Add control components -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Add your component logic here
</script>

<style scoped>
.admin-panel {
  background-color: var(--panel-bg);
  border-radius: 8px;
  box-shadow: var(--card-shadow);
  padding: 20px;
  margin: 20px 0;
}

.admin-header {
  margin-bottom: 20px;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 10px;
  color: var(--text-primary);
}

.admin-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

@media (min-width: 768px) {
  .admin-content {
    grid-template-columns: 1fr 1fr;
  }
}

.admin-stats,
.admin-controls {
  padding: 15px;
  background-color: var(--bg-secondary);
  border-radius: 6px;
  color: var(--text-primary);
}
</style> 