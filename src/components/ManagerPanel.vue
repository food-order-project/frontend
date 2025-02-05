<template>
  <div class="manager-panel">
    <div class="manager-header">
      <h2>Management Console</h2>
    </div>
    <div class="manager-content">
      <div class="panel">
        <h3>Meal Management</h3>
        <div class="action-buttons">
          <router-link to="/manager/meal-register" class="manager-btn">
            <v-icon>mdi-plus</v-icon>
            Add New Meal
          </router-link>
          <button class="manager-btn" @click="showMealsList = true">
            <v-icon>mdi-format-list-bulleted</v-icon>
            View All Meals
          </button>
        </div>

        <ManagerMealsList v-if="showMealsList" />
      </div>

      <div class="panel">
        <h3>Orders</h3>
        <div class="action-buttons">
          <button class="manager-btn">
            <v-icon>mdi-clipboard-text</v-icon>
            Today's Orders
          </button>
          <button class="manager-btn">
            <v-icon>mdi-history</v-icon>
            Order History
          </button>
        </div>
      </div>
    </div>
    <ManagerMealsList />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ManagerMealsList from "./ManagerMealsList.vue";

const showMealsList = ref(false);
</script>

<style scoped>
.manager-panel {
  background-color: var(--panel-bg);
  border-radius: 8px;
  box-shadow: var(--card-shadow);
  padding: 20px;
}

.manager-header {
  margin-bottom: 20px;
}

.manager-header h2 {
  color: var(--text-primary);
  font-size: 1.5rem;
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

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.manager-btn {
  background-color: var(--btn-primary);
  color: white;
  border: none;
  padding: 12px 15px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  font-size: 1rem;
}

.manager-btn:hover {
  background-color: var(--btn-hover);
}
</style>
