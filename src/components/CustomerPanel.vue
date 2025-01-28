<template>
  <div class="customer-panel">
    <div class="customer-header">
      <h2>Customer Portal</h2>
    </div>
    <div class="customer-content">
      <div class="orders panel">
        <h3>My Orders</h3>
        <div class="panel-content">
          <div class="action-buttons">
            <button class="customer-btn">View Orders</button>
            <button class="customer-btn">Track Shipments</button>
            <button class="customer-btn">Order History</button>
          </div>
        </div>
      </div>

      <div class="support panel">
        <h3>Support</h3>
        <div class="panel-content">
          <div class="action-buttons">
            <button class="customer-btn">Contact Support</button>
            <button class="customer-btn">Submit Ticket</button>
            <button class="customer-btn">FAQs</button>
          </div>
        </div>
      </div>

      <div class="account panel">
        <h3>Account Settings</h3>
        <div class="panel-content">
          <div class="action-buttons">
            <button class="customer-btn">Update Profile</button>
            <button class="customer-btn">Billing Information</button>
            <button class="customer-btn">Preferences</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Customer component logic here
</script>

<style scoped>
.customer-panel {
  background-color: var(--panel-bg);
  border-radius: 8px;
  box-shadow: var(--card-shadow);
  padding: 20px;
}

.customer-content {
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .customer-content {
    grid-template-columns: repeat(3, 1fr);
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

.customer-btn {
  background-color: var(--btn-primary);
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  margin-bottom: 10px;
  text-align: left;
  transition: background-color 0.3s;
}

.customer-btn:hover {
  background-color: var(--btn-hover);
}
</style> 