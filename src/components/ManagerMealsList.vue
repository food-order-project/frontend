<template>
  <div class="manager-panel">
    <div class="manager-header">
      <h2>Foods</h2>
      <div class="subtitle">{{ mealsStore.meals.length }} Menus</div>
    </div>

    <div class="meals-grid">
      <div v-for="meal in mealsStore.meals" :key="meal.id" class="meal-card">
        <div class="meal-image">
          <img :src="meal.imageUrl || '/default-meal.png'" :alt="meal.name">
          <v-btn
            icon
            small
            class="more-options"
            @click.stop="showOptions(meal)"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </div>
        
        <div class="meal-content">
          <h3 class="meal-title">{{ meal.name }}</h3>
          <p class="meal-description">{{ meal.description }}</p>
          
          <div class="meal-stats">
            <div class="stat">
              <span>Category:</span>
              <span class="value">{{ meal.category || 'Uncategorized' }}</span>
            </div>
            <div class="stat">
              <span>Calories:</span>
              <span class="value">{{ meal.calories || 0 }} kcal</span>
            </div>
          </div>

          <div class="action-buttons">
            <v-btn
              color="primary"
              small
              @click="editMeal(meal)"
              class="action-btn"
            >
              UPDATE
            </v-btn>
            <v-btn
              color="error"
              small
              @click="deleteMeal(meal)"
              class="action-btn"
            >
              DELETE
            </v-btn>
          </div>
        </div>
      </div>
    </div>

    <!-- Options Menu -->
    <v-menu
      v-model="showMenu"
      :position-x="menuX"
      :position-y="menuY"
      absolute
      offset-y
    >
      <v-list>
        <v-list-item @click="editMeal(selectedMeal)">
          <v-list-item-title>Edit</v-list-item-title>
        </v-list-item>
        <v-list-item @click="deleteMeal(selectedMeal)">
          <v-list-item-title class="error--text">Delete</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <!-- Snackbar for notifications -->
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="3000">
      {{ snackbar.text }}
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useMealsStore } from '../stores/meals';

const mealsStore = useMealsStore();
const isLoading = ref(true);
const showMenu = ref(false);
const menuX = ref(0);
const menuY = ref(0);
const selectedMeal = ref(null);

const snackbar = ref({
  show: false,
  text: '',
  color: 'success'
});

const showOptions = (meal: any, event?: MouseEvent) => {
  selectedMeal.value = meal;
  if (event) {
    menuX.value = event.clientX;
    menuY.value = event.clientY;
  }
  showMenu.value = true;
};

const showMessage = (text: string, color: 'success' | 'error' = 'success') => {
  snackbar.value = {
    show: true,
    text,
    color
  };
};

const editMeal = (item: any) => {
  // TODO: Implement edit functionality
  console.log('Edit meal:', item);
  showMenu.value = false;
};

const deleteMeal = async (item: any) => {
  if (confirm('Are you sure you want to delete this meal?')) {
    try {
      console.log('delete meal item.id :', item._id);
      const result = await mealsStore.deleteMeal(item._id);
      if (result?.success) {
        await mealsStore.fetchMeals();
        showMessage('Meal deleted successfully');
      } else {
        showMessage(result?.error || 'Error deleting meal', 'error');
      }
    } catch (error) {
      showMessage('Error deleting meal', 'error');
    }
  }
  showMenu.value = false;
};

onMounted(async () => {
  try {
    await mealsStore.fetchMeals();
  } catch (error) {
    showMessage('Error loading meals', 'error');
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped>
.manager-panel {
  padding: 20px;
}

.manager-header {
  margin-bottom: 24px;
}

.manager-header h2 {
  font-size: 1.5rem;
  margin-bottom: 4px;
}

.subtitle {
  color: #666;
  font-size: 0.9rem;
}

.meals-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 10px;
}

.meal-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  position: relative;
}

.meal-image {
  position: relative;
  height: 160px;
}

.meal-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.more-options {
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(255,255,255,0.9) !important;
}

.meal-content {
  padding: 16px;
}

.meal-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 8px;
}

.meal-description {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 16px;
  line-height: 1.4;
}

.meal-stats {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 0.9rem;
}

.stat {
  color: #666;
}

.stat .value {
  color: #333;
  font-weight: 500;
  margin-left: 4px;
}

.action-buttons {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  margin-top: 12px;
}

.action-btn {
  flex: 1;
}
</style>
