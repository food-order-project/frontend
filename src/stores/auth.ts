import { defineStore } from 'pinia'

type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'MANAGER' | 'USER' | 'CUSTOMER'

interface User {
  id: string
  email: string
  name: string
  role: string
  roles: string[]
}

interface AuthState {
  token: string | null
  role: UserRole | null
  user: User | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: null,
    role: null,
    user: null
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    userRole: (state) => state.role,
    userName: (state) => state.user?.name
  },

  actions: {
    setToken(token: string) {
      this.token = token
      localStorage.setItem('token', token)
    },

    setUser(user: User) {
      this.user = user
      this.role = user.role.toUpperCase() as UserRole
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('role', user.role.toUpperCase())
    },

    setAuth(token: string, role: string) {
      this.token = token
      this.role = role.toUpperCase() as UserRole
      localStorage.setItem('token', token)
      localStorage.setItem('role', role.toUpperCase())
    },

    clearAuth() {
      this.token = null
      this.role = null
      this.user = null
      localStorage.removeItem('token')
      localStorage.removeItem('role')
      localStorage.removeItem('user')
    },

    initializeAuth() {
      const token = localStorage.getItem('token')
      const role = localStorage.getItem('role') as UserRole | null
      const userStr = localStorage.getItem('user')
      
      if (token) {
        this.token = token
      }
      
      if (role) {
        this.role = role
      }
      
      if (userStr) {
        this.user = JSON.parse(userStr)
      }
    }
  }
}) 