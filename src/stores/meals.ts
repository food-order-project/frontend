import { defineStore } from 'pinia';
import axios from 'axios';
import type { Meal } from '@/types';
import { useAuthStore } from './auth';

interface MealState {
  meals: Meal[];
  loading: boolean;
  error: string | null;
}

export const useMealsStore = defineStore('meals', {
  state: (): MealState => ({
    meals: [],
    loading: false,
    error: null,
  }),

  actions: {
    async createMeal(mealData: Partial<Meal>) {
      this.loading = true;
      this.error = null;
      try {
        const authStore = useAuthStore();
        console.log(mealData);
        
        const response = await axios.post('http://localhost:3000/meals', mealData, {
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        });
        
        console.log('store meals res :',response);
        
        if (response.status === 201) {
          this.meals.push(response.data);
          return { success: true, data: response.data };
        }
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Error creating meal';
        return { success: false, error: this.error };
      } finally {
        this.loading = false;
      }
    },
  },
}); 