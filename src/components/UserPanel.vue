<template>
  <div class="user-panel">
    <div class="user-header">
      <h2>User Profile</h2>
    </div>
    <div class="user-content">
      <div class="profile-section panel">
        <h3>Personal Information</h3>
        <div class="panel-content">
          <div class="profile-info">
            <div class="info-item">
              <label>Name:</label>
              <span>John Doe</span>
            </div>
            <div class="info-item">
              <label>Email:</label>
              <span>john@example.com</span>
            </div>
            <button class="action-btn">Edit Profile</button>
          </div>
        </div>
      </div>

      <div class="activity-section panel">
        <h3>Recent Activity</h3>
        <div class="panel-content">
          <ul class="activity-list">
            <li>Last login: 2 hours ago</li>
            <li>Profile updated: 3 days ago</li>
            <li>Password changed: 1 week ago</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// User component logic here
</script>

<style scoped>
.user-panel {
  background-color: var(--panel-bg);
  border-radius: 8px;
  box-shadow: var(--card-shadow);
  padding: 20px;
}

.panel {
  background-color: var(--bg-secondary);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid var(--border-color);
}

.info-item {
  margin-bottom: 10px;
  color: var(--text-primary);
}

.info-item label {
  font-weight: bold;
  margin-right: 10px;
  color: var(--text-secondary);
}

.action-btn {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

.activity-list {
  list-style: none;
  padding: 0;
  color: var(--text-primary);
}

.activity-list li {
  padding: 8px 0;
  border-bottom: 1px solid var(--border-color);
}
</style> 