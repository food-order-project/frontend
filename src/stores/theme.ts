import { defineStore } from 'pinia'

interface ThemeState {
  isDark: boolean
}

export const useThemeStore = defineStore('theme', {
  state: (): ThemeState => ({
    isDark: localStorage.getItem('theme') === 'dark'
  }),

  actions: {
    toggleTheme() {
      this.isDark = !this.isDark
      localStorage.setItem('theme', this.isDark ? 'dark' : 'light')
      this.applyTheme()
    },

    initTheme() {
      this.applyTheme()
    },

    applyTheme() {
      document.documentElement.setAttribute('data-theme', this.isDark ? 'dark' : 'light')
    }
  }
}) 