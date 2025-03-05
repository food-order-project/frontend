<template>
    <div class="menu-planning">
      <!-- Sol taraf: Yemek Listesi -->
      <div class="food-list">
        <h2>Yemek Listesi</h2>
        <draggable 
          :list="foodList" 
          :group="{ name: 'meals', pull: 'clone', put: false }"
          :clone="cloneItem"
          item-key="id"
        >
          <template #item="{ element }">
            <div class="food-item">{{ element.name }}</div>
          </template>
        </draggable>
      </div>
  
      <!-- Orta kısım: Takvim -->
      <div class="calendar-container">
        <div class="calendar-header">
          <button class="nav-btn" @click="previousMonth">&lt;</button>
          <h2>{{ currentMonthYear }}</h2>
          <button class="nav-btn" @click="nextMonth">&gt;</button>
        </div>
        
        <div class="calendar">
          <div class="weekdays">
            <div class="weekday weekend-header">Sun</div>
            <div class="weekday">Mon</div>
            <div class="weekday">Tue</div>
            <div class="weekday">Wed</div>
            <div class="weekday">Thu</div>
            <div class="weekday">Fri</div>
            <div class="weekday weekend-header">Sat</div>
          </div>
  
          <div class="days">
            <div 
              v-for="day in daysInMonth" 
              :key="day.date"
              class="day"
              :class="{ 
                'current-month': day.currentMonth,
                'has-meals': getMealList(day.date).length > 0,
                'weekend': isWeekend(day.date)
              }"
            >
              <div class="day-number">{{ day.dayNumber }}</div>
              <draggable 
                :list="getMealList(day.date)"
                group="meals"
                item-key="id"
                class="meal-container"
                :disabled="isWeekend(day.date)"
              >
                <template #item="{ element }">
                  <div class="meal-item">
                    {{ element.name }}
                    <button 
                      class="delete-btn"
                      @click="removeMeal(day.date, element)"
                    >
                      ×
                    </button>
                  </div>
                </template>
              </draggable>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed } from 'vue'
  import draggable from 'vuedraggable'
  
  export default {
    name: 'MenuPlanning',
    components: {
      draggable,
    },
    setup() {
      const foodList = ref([
        { id: 1, name: 'Mercimek Çorbası' },
        { id: 2, name: 'Pilav' },
        { id: 3, name: 'Kuru Fasulye' },
        { id: 4, name: 'Izgara Tavuk' },
        { id: 5, name: 'Zeytinyağlı Fasulye' },
        { id: 6, name: 'Mantı' },
      ])
  
      const mealPlan = ref({})
      const currentDate = ref(new Date())
  
      // Yemek klonlama fonksiyonu
      const cloneItem = (item) => {
        return {
          ...item,
          id: Date.now() // Benzersiz ID oluştur
        }
      }
  
      // Belirli bir tarih için yemek listesini al veya oluştur
      const getMealList = (date) => {
        if (!mealPlan.value[date]) {
          mealPlan.value[date] = []
        }
        return mealPlan.value[date]
      }
  
      // Yemek silme fonksiyonu
      const removeMeal = (date, meal) => {
        mealPlan.value[date] = mealPlan.value[date].filter(m => m.id !== meal.id)
      }
  
      // Ay ve yıl başlığı
      const currentMonthYear = computed(() => {
        return currentDate.value.toLocaleString('default', { month: 'long', year: 'numeric' })
      })
  
      // Önceki ve sonraki ay fonksiyonları
      const previousMonth = () => {
        currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1)
      }
  
      const nextMonth = () => {
        currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1)
      }
  
      // Takvim günlerini hesapla
      const daysInMonth = computed(() => {
        const year = currentDate.value.getFullYear()
        const month = currentDate.value.getMonth()
        const firstDay = new Date(year, month, 1)
        const lastDay = new Date(year, month + 1, 0)
        const days = []
  
        // Önceki ayın günlerini ekle
        const firstDayOfWeek = firstDay.getDay()
        for (let i = firstDayOfWeek - 1; i >= 0; i--) {
          const date = new Date(year, month, -i)
          days.push({
            date: date.toISOString().split('T')[0],
            dayNumber: date.getDate(),
            currentMonth: false
          })
        }
  
        // Mevcut ayın günlerini ekle
        for (let i = 1; i <= lastDay.getDate(); i++) {
          days.push({
            date: new Date(year, month, i).toISOString().split('T')[0],
            dayNumber: i,
            currentMonth: true
          })
        }
  
        // Sonraki ayın günlerini ekle
        const remainingDays = 42 - days.length
        for (let i = 1; i <= remainingDays; i++) {
          const date = new Date(year, month + 1, i)
          days.push({
            date: date.toISOString().split('T')[0],
            dayNumber: i,
            currentMonth: false
          })
        }
  
        return days
      })
  
      // Sadece Cumartesi ve Pazar günlerini kontrol et
      const isWeekend = (dateStr) => {
        const date = new Date(dateStr);
        const day = date.getDay();
        return day === 5 || day === 6; // 0=Pazar, 6=Cumartesi
      }
  
      return {
        foodList,
        mealPlan,
        currentMonthYear,
        daysInMonth,
        previousMonth,
        nextMonth,
        getMealList,
        cloneItem,
        removeMeal,
        isWeekend,
      }
    }
  }
  </script>
  
  <style scoped>
  .menu-planning {
    display: flex;
    gap: 20px;
    padding: 20px;
  }
  
  .food-list {
    width: 250px;
    border: 1px solid #ddd;
    padding: 15px;
    background: white;
  }
  
  .calendar-container {
    flex: 1;
    border: 1px solid #ddd;
    background: white;
  }
  
  .calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    border-bottom: 1px solid #ddd;
  }
  
  .nav-btn {
    padding: 5px 10px;
    border: 1px solid #ddd;
    background: white;
    cursor: pointer;
  }
  
  .weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    border-bottom: 1px solid #ddd;
  }
  
  .weekday {
    padding: 10px;
    text-align: center;
    color: #666;
    font-weight: 500;
  }
  
  .days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-auto-rows: minmax(100px, auto);
  }
  
  .day {
    border: 1px solid #ddd;
    padding: 5px;
    min-height: 100px;
    background: #f8f9fa;
  }
  
  .day-number {
    font-size: 14px;
    margin-bottom: 5px;
  }
  
  .current-month {
    background: white;
  }
  
  .food-item, .meal-item {
    padding: 8px;
    margin: 5px 0;
    background: #f5f5f5;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: move;
    font-size: 14px;
  }
  
  .meal-container {
    min-height: 60px;
  }
  
  .meal-item {
    padding: 8px;
    margin: 5px 0;
    background: #f5f5f5;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: move;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .delete-btn {
    background: none;
    border: none;
    color: #ff4444;
    cursor: pointer;
    font-size: 16px;
    padding: 0 5px;
  }
  
  .delete-btn:hover {
    color: #cc0000;
  }
  
  .day.current-month {
    background: white;
  }
  
  .day:not(.current-month) {
    background: #f8f9fa;
    color: #aaa;
  }
  
  .meal-container {
    min-height: 60px;
    padding: 5px;
  }
  
  .food-list {
    background: white;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  .calendar-container {
    background: white;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  .has-meals {
    background-color: #e8f5e9 !important; /* Pastel yeşil */
  }
  
  /* Önceki ve sonraki ayların yemekli günleri için daha soluk ton */
  .day:not(.current-month).has-meals {
    background-color: #f1f8f1 !important;
  }
  
  .weekend-header {
    color: #d0291e; /* Kırmızı renk */
  }
  
  .weekend {
    background-color: #ffebee !important; /* Pastel kırmızı */
    cursor: not-allowed;
  }
  
  .weekend .meal-container {
    opacity: 0.7;
    pointer-events: none;
  }
  
  .day:not(.current-month).weekend {
    background-color: #fff5f5 !important;
  }
  
  .weekend.has-meals {
    background-color: #ffe0e0 !important;
  }
  </style>