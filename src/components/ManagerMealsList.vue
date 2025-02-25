<template>
  <div class="manager-panel">
    <div class="manager-header">
      <div class="header-left">
        <h2>Foods</h2>
        <div class="subtitle">{{ mealsStore.meals.length }} Menus</div>
      </div>
      <div class="view-toggle">
        <v-btn-toggle v-model="viewMode" mandatory>
          <v-btn value="grid">
            <v-icon>mdi-grid</v-icon>
          </v-btn>
          <v-btn value="table">
            <v-icon>mdi-table</v-icon>
          </v-btn>
        </v-btn-toggle>
      </div>
    </div>

    <!-- Grid View -->
    <div v-if="viewMode === 'grid'" class="meals-grid">
      <div v-for="meal in mealsStore.meals" :key="meal.id" class="meal-card">
        <div class="meal-image">
          <img :src="meal.imageUrl || '/default-meal.png'" :alt="meal.name" />
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
              <span class="value">{{ meal.category || "Uncategorized" }}</span>
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

    <!-- Table View -->
    <v-data-table
      v-else
      :headers="headers"
      :items="mealsStore.meals"
      :items-per-page="10"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Foods Management</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ props }">
              <v-btn color="primary" v-bind="props" class="mb-2">
                Add New Meals
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.name"
                        label="Meal Name*"
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                      <v-textarea
                        v-model="editedItem.description"
                        label="Description*"
                        required
                      ></v-textarea>
                    </v-col>

                    <v-col cols="12" sm="6">
                      <v-select
                        v-model="editedItem.category"
                        label="Category*"
                        :items="categories"
                        item-title="text"
                        item-value="value"
                        required
                      ></v-select>
                    </v-col>

                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="editedItem.preparationTime"
                        label="Preparation Time (minutes)"
                        type="number"
                        min="0"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="editedItem.calories"
                        label="Calories"
                        type="number"
                        min="0"
                        :rules="[
                          (v) =>
                            (!isNaN(Number(v)) && Number(v) >= 0) ||
                            'Calories must be a valid positive number',
                        ]"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.imageUrl"
                        label="Image URL*"
                        type="url"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                      <v-label>Dietary Types</v-label>
                      <v-checkbox
                        v-for="type in dietaryTypes"
                        :key="type"
                        v-model="editedItem.dietaryType[type.toLowerCase()]"
                        :label="type"
                      ></v-checkbox>
                    </v-col>

                    <v-col cols="12">
                      <v-label>Allergens</v-label>
                      <v-checkbox
                        v-for="allergen in allergens"
                        :key="allergen"
                        v-model="editedItem.allergens"
                        :label="allergen"
                        :value="allergen"
                      ></v-checkbox>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue-darken-1"
                  variant="text"
                  @click="closeDialog"
                >
                  Cancel
                </v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="saveItem">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.imageUrl`]="{ item }">
        <img
          :src="item.imageUrl || '/default-meal.png'"
          :alt="item.name"
          class="table-thumbnail"
        />
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn icon small color="primary" @click="editMeal(item)" class="mr-2">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon small color="error" @click="deleteMeal(item)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>

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
import { ref, onMounted, computed, nextTick } from "vue";
import { useMealsStore } from "../stores/meals";

const mealsStore = useMealsStore();
const isLoading = ref(true);
const showMenu = ref(false);
const menuX = ref(0);
const menuY = ref(0);
const selectedMeal = ref(null);
const viewMode = ref("grid");
const dialog = ref(false);
const editedIndex = ref(-1);
const editedItem = ref({
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

const defaultItem = {
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

const allergens = computed(() => mealsStore.allergens || []);
const categories = computed(() => mealsStore.mealCategories || []);
const dietaryTypes = computed(() => mealsStore.dietaryTypes || []);

const formTitle = computed(() => {
  return editedIndex.value === -1 ? "New Item" : "Edit Item";
});

const snackbar = ref({
  show: false,
  text: "",
  color: "success",
});

const headers = [
  {
    title: "Image",
    key: "imageUrl",
    sortable: false,
    align: "center" as const,
  },
  { title: "Name", key: "name", align: "start" as const },
  { title: "Category", key: "category", align: "start" as const },
  { title: "Calories", key: "calories", align: "start" as const },
  { title: "Description", key: "description", align: "start" as const },
  {
    title: "Actions",
    key: "actions",
    sortable: false,
    align: "center" as const,
  },
];

const showOptions = (meal: any, event?: MouseEvent) => {
  selectedMeal.value = meal;
  if (event) {
    menuX.value = event.clientX;
    menuY.value = event.clientY;
  }
  showMenu.value = true;
};

const showMessage = (text: string, color: "success" | "error" = "success") => {
  snackbar.value = {
    show: true,
    text,
    color,
  };
};

const editMeal = (item: any) => {
  editedIndex.value = mealsStore.meals.indexOf(item);
  editedItem.value = Object.assign({}, item);
  dialog.value = true;
  showMenu.value = false;
};

const deleteMeal = async (item: any) => {
  if (confirm("Are you sure you want to delete this meal?")) {
    try {
      const result = await mealsStore.deleteMeal(item.id);
      if (result?.success) {
        await mealsStore.fetchMeals();
        showMessage("Meal deleted successfully");
      } else {
        showMessage(result?.error || "Error deleting meal", "error");
      }
    } catch (error) {
      showMessage("Error deleting meal", "error");
    }
  }
  showMenu.value = false;
};

const closeDialog = () => {
  dialog.value = false;
  nextTick(() => {
    editedItem.value = { ...defaultItem };
    editedIndex.value = -1;
  });
};

const saveItem = async () => {
  try {
    const calories = Number(editedItem.value.calories);
    if (isNaN(calories) || calories < 0) {
      showMessage("Calories must be a valid positive number", "error");
      return;
    }

    const mealData = {
      name: editedItem.value.name,
      description: editedItem.value.description,
      category: editedItem.value.category,
      dietaryType: editedItem.value.dietaryType,
      imageUrl: editedItem.value.imageUrl,
      preparationTime: editedItem.value.preparationTime,
      calories: calories,
      allergens: editedItem.value.allergens,
      isActive: editedItem.value.isActive,
    };

    if (editedIndex.value > -1) {
      const mealId = mealsStore.meals[editedIndex.value]._id;
      const result = await mealsStore.updateMeal(mealId, mealData);

      if (result?.success) {
        await mealsStore.fetchMeals();
        showMessage("Meal updated successfully");
      } else {
        showMessage(result?.error || "Error updating meal", "error");
      }
    } else {
      const result = await mealsStore.createMeal(mealData);

      if (result?.success) {
        await mealsStore.fetchMeals();
        showMessage("Meal created successfully");
      } else {
        showMessage(result?.error || "Error creating meal", "error");
      }
    }
    closeDialog();
  } catch (error) {
    showMessage("Error saving item", "error");
  }
};

onMounted(async () => {
  try {
    await mealsStore.fetchMeals();
    await mealsStore.fetchConfig();
  } catch (error) {
    showMessage("Error loading meals", "error");
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.header-left {
  flex: 1;
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
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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
  background: rgba(255, 255, 255, 0.9) !important;
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

.table-thumbnail {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
}

.view-toggle {
  margin-left: 16px;
}
</style>
