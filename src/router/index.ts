import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import { useAuthStore } from '../stores/auth'
import ManagerMealRegister from '@/components/ManagerMealRegister.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/superadmin',
    name: 'SuperAdmin',
    component: () => import('../views/SuperAdminView.vue'),
    meta: { requiresAuth: true, role: 'SUPER_ADMIN' }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/AdminView.vue'),
    meta: { requiresAuth: true, role: 'ADMIN' }
  },
  {
    path: '/manager',
    name: 'Manager',
    component: () => import('../views/ManagerView.vue'),
    meta: { requiresAuth: true, role: 'MANAGER' }
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('../views/UserView.vue'),
    meta: { requiresAuth: true, role: 'USER' }
  },
  {
    path: '/customer',
    name: 'Customer',
    component: () => import('../views/CustomerView.vue'),
    meta: { requiresAuth: true, role: 'CUSTOMER' }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { guest: true }
  },
  {
    path: '/manager/meal-register',
    name: 'ManagerMealRegister',
    component: ManagerMealRegister,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const isAuthenticated = authStore.isAuthenticated
  const userRole = authStore.userRole

  // If route requires auth and user is not authenticated
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
    return
  }

  // If user is authenticated and trying to access login page
  if (to.meta.guest && isAuthenticated) {
    redirectToRoleDashboard(userRole, next)
    return
  }

  // If route has role requirement
  if (to.meta.role && to.meta.role !== userRole) {
    redirectToRoleDashboard(userRole, next)
    return
  }

  // If accessing root path, redirect to role-specific dashboard
  if (to.path === '/' && isAuthenticated) {
    redirectToRoleDashboard(userRole, next)
    return
  }

  next()
})

function redirectToRoleDashboard(role: string | null, next: any) {
  switch (role) {
    case 'SUPER_ADMIN':
      next('/superadmin')
      break
    case 'ADMIN':
      next('/admin')
      break
    case 'MANAGER':
      next('/manager')
      break
    case 'USER':
      next('/user')
      break
    case 'CUSTOMER':
      next('/customer')
      break
    default:
      next('/login')
  }
}

export default router 