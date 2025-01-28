<template>
  <div class="super-admin-panel">
    <div class="super-admin-header">
      <h2>Super Admin Control Panel</h2>
    </div>

    <div class="super-admin-content">
      <div class="system-management panel">
        <h3>System Management</h3>
        <div class="panel-content">
          <div class="action-buttons">
            <button class="admin-btn">System Settings</button>
            <button class="admin-btn">Database Management</button>
            <button class="admin-btn">Security Settings</button>
          </div>
        </div>
      </div>

      <div class="user-management panel">
        <h3>User Management</h3>
        <div class="panel-content">
          <div class="action-buttons">
            <button class="admin-btn">Manage Admins</button>
            <button class="admin-btn">User Roles</button>
            <button class="admin-btn">Access Control</button>
          </div>
        </div>
      </div>

      <div class="analytics panel">
        <h3>Advanced Analytics</h3>
        <div class="panel-content">
          <div class="action-buttons">
            <button class="admin-btn">System Metrics</button>
            <button class="admin-btn">User Activity</button>
            <button class="admin-btn">Performance Stats</button>
          </div>
        </div>
      </div>

      <div class="maintenance panel">
        <h3>System Maintenance</h3>
        <div class="panel-content">
          <div class="action-buttons">
            <button class="admin-btn">Backup System</button>
            <button class="admin-btn">Clear Cache</button>
            <button class="admin-btn">System Logs</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Super admin component logic here
</script>

<style scoped>
.super-admin-panel {
  background-color: var(--panel-bg);
  border-radius: 8px;
  box-shadow: var(--card-shadow);
  padding: 20px;
  margin: 20px 0;
}

.super-admin-header {
  margin-bottom: 20px;
  border-bottom: 2px solid #2c3e50;
  padding-bottom: 10px;
}

.super-admin-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

@media (min-width: 768px) {
  .super-admin-content {
    grid-template-columns: repeat(2, 1fr);
  }
}

.panel {
  background-color: var(--bg-secondary);
  border-radius: 8px;
  padding: 20px;
  border: 1px solid var(--border-color);
}

.panel h3 {
  color: var(--text-primary);
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--border-color);
}

.action-buttons {
  display: grid;
  gap: 10px;
}

.admin-btn {
  background-color: var(--btn-primary);
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  margin-bottom: 10px;
  text-align: left;
}

.admin-btn:hover {
  background-color: var(--btn-hover);
}

.panel-content {
  margin-top: 15px;
}
</style> 