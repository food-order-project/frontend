import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import { useAuthStore } from '../stores/auth'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { guest: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const isAuthenticated = authStore.isAuthenticated

  // Eğer sayfa auth gerektiriyorsa ve kullanıcı giriş yapmamışsa
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  }
  // Eğer login sayfasına gidiyorsa ve zaten giriş yapmışsa
  else if (to.meta.guest && isAuthenticated) {
    next('/')
  }
  // Diğer durumlar
  else {
    next()
  }
})

export default router 