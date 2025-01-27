<template>
  <div class="manager-panel">
    <div class="manager-header">
      <h2>Management Console</h2>
    </div>
    <div class="manager-content">
      <div class="team-management panel">
        <h3>Team Management</h3>
        <div class="panel-content">
          <div class="action-buttons">
            <button class="manager-btn">View Team Members</button>
            <button class="manager-btn">Assign Tasks</button>
            <button class="manager-btn">Performance Reviews</button>
          </div>
        </div>
      </div>

      <div class="reports panel">
        <h3>Reports</h3>
        <div class="panel-content">
          <div class="action-buttons">
            <button class="manager-btn">Team Performance</button>
            <button class="manager-btn">Project Status</button>
            <button class="manager-btn">Resource Allocation</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Manager component logic here
</script>

<style scoped>
.manager-panel {
  background-color: var(--panel-bg);
  border-radius: 8px;
  box-shadow: var(--card-shadow);
  padding: 20px;
}

.manager-content {
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .manager-content {
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

.manager-btn {
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

.manager-btn:hover {
  background-color: var(--btn-hover);
}
</style> 