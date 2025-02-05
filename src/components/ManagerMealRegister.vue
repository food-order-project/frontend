<template>
    <div class="manager-panel">
      <div class="manager-header">
        <h2>Management Console</h2>
      </div>
      <div class="manager-content">
        <div class="meal-management panel">
          <h3>Meal Management</h3>
          <div class="panel-content">
            <form @submit.prevent="handleSubmit" class="meal-form">
              <div class="form-group">
                <label for="name">Meal Name*</label>
                <input id="name" v-model="mealForm.name" type="text" required />
              </div>
  
              <div class="form-group">
                <label for="description">Description*</label>
                <textarea
                  id="description"
                  v-model="mealForm.description"
                  required
                ></textarea>
              </div>
  
              <div class="form-group">
                <label for="category">Category*</label>
                <select id="category" v-model="mealForm.category" required>
                  <option value="main_course">Main Course</option>
                  <option value="soup">Soup</option>
                  <option value="salad">Salad</option>
                  <option value="dessert">Dessert</option>
                  <option value="beverage">Beverage</option>
                </select>
              </div>
  
              <div class="form-group">
                <label>Dietary Type</label>
                <div class="checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      v-model="mealForm.dietaryType.vegetarian"
                    />
                    Vegetarian
                  </label>
                  <label>
                    <input type="checkbox" v-model="mealForm.dietaryType.vegan" />
                    Vegan
                  </label>
                </div>
              </div>
  
              <div class="form-group">
                <label for="imageUrl">Image URL</label>
                <input id="imageUrl" v-model="mealForm.imageUrl" type="url" />
              </div>
  
              <div class="form-group">
                <label for="preparationTime">Preparation Time (minutes)</label>
                <input
                  id="preparationTime"
                  v-model="mealForm.preparationTime"
                  type="number"
                  min="0"
                />
              </div>
  
              <div class="form-group">
                <label for="calories">Calories</label>
                <input
                  id="calories"
                  v-model="mealForm.calories"
                  type="number"
                  min="0"
                />
              </div>
  
              <div class="form-group">
                <label>Allergens</label>
                <div class="checkbox-group">
                  <label v-for="allergen in allergens" :key="allergen">
                    <input
                      type="checkbox"
                      :value="allergen"
                      v-model="mealForm.allergens"
                    />
                    {{ allergen }}
                  </label>
                </div>
              </div>
  
              <button type="submit" class="submit-btn" :disabled="isLoading">
                <v-progress-circular
                  v-if="isLoading"
                  indeterminate
                  size="20"
                  width="2"
                  color="white"
                  class="mr-2"
                />
                {{ isLoading ? "Adding Meal..." : "Add Meal" }}
              </button>
            </form>
          </div>
        </div>
      </div>
  
      <!-- Snackbar for notifications -->
      <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="3000">
        {{ snackbar.text }}
      </v-snackbar>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from "vue";
  import { useMealsStore } from "../stores/meals";
  
  const mealsStore = useMealsStore();
  const allergens = ["milk", "nuts", "eggs", "gluten", "fish"];
  const isLoading = ref(false);
  const snackbar = ref({
    show: false,
    text: "",
    color: "success",
  });
  
  const mealForm = ref({
    name: "",
    description: "",
    category: "",
    dietaryType: {
      vegetarian: false,
      vegan: false,
    },
    imageUrl: "",
    preparationTime: 0,
    isActive: true,
    calories: 0,
    allergens: [] as string[],
  });
  
  const showMessage = (text: string, color: "success" | "error" = "success") => {
    snackbar.value = {
      show: true,
      text,
      color,
    };
  };
  
  const handleSubmit = async () => {
    if (isLoading.value) return;
  
    isLoading.value = true;
    try {
      const result = await mealsStore.createMeal(mealForm.value);
  
      if (result?.success) {
        showMessage("Meal added successfully!");
        // Reset form
        mealForm.value = {
          name: "",
          description: "",
          category: "",
          dietaryType: {
            vegetarian: false,
            vegan: false,
          },
          imageUrl: "",
          preparationTime: 0,
          isActive: true,
          calories: 0,
          allergens: [],
        };
      } else {
        showMessage(result?.error || "Error adding meal", "error");
      }
    } catch (error: any) {
      console.error("Error submitting meal:", error);
      showMessage("Error adding meal", "error");
    } finally {
      isLoading.value = false;
    }
  };
  </script>
  
  <script lang="ts">
  export default {
    name: "ManagerMealRegister",
  };
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
  
  .meal-form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  
  .form-group label {
    color: var(--text-primary);
    font-weight: 500;
  }
  
  .form-group input[type="text"],
  .form-group input[type="url"],
  .form-group input[type="number"],
  .form-group select,
  .form-group textarea {
    padding: 8px;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    background-color: var(--bg-primary);
    color: var(--text-primary);
  }
  
  .form-group textarea {
    min-height: 100px;
    resize: vertical;
  }
  
  .checkbox-group {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  
  .checkbox-group label {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  
  .submit-btn {
    background-color: var(--btn-primary);
    color: white;
    border: none;
    padding: 12px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
  
  .submit-btn:disabled {
    background-color: var(--btn-disabled, #cccccc);
    cursor: not-allowed;
    opacity: 0.7;
  }
  
  .submit-btn:hover:not(:disabled) {
    background-color: var(--btn-hover);
  }
  </style>
  