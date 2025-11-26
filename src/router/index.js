import { createRouter, createWebHistory } from 'vue-router'
import AuthLayout from '@/layouts/AuthLayout.vue'
import { isAuthenticated } from '@/composables/useAuth'
import { clearToken } from '@/composables/useAuth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Auth Routes (Guest Only) - menggunakan AuthLayout
    {
      path: '/',
      component: AuthLayout,
      meta: { requiresGuest: true },
      children: [
        {
          path: '',
          name: "login",
          component: () => import('@/views/auth/AuthLogin.vue'),
          meta: { requiresGuest: true }
        },
        {
          path: 'signup',
          name: "signup",
          component: () => import('@/views/auth/AuthSignup.vue'),
          meta: { requiresGuest: true }
        }
      ]
    },

    // Dashboard Area Routes (Authenticated Only) - menggunakan DashboardLayout
    {
      path: '/dashboard',
      component: () => import('@/layouts/DashboardLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('@/views/dashboard/Dashboard.vue')
        },
        {
          path: '/profile',
          name: 'profile',
          component: () => import('@/views/profile/Profile.vue')
        }
      ]
    },
    {
      path: '/logout',
      name: 'logout',
      beforeEnter: async () => {
        await clearToken();
        window.location.href = '/';
      }
    },

    // 404 Not Found
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('@/views/NotFound.vue')
    }
  ],
})

// Navigation Guard
router.beforeEach((to, from, next) => {
  const userIsAuthenticated = isAuthenticated();

  // Check if route requires authentication
  if (to.meta.requiresAuth && !userIsAuthenticated) {
    // Redirect to login if not authenticated
    next({ name: 'login' });
  } 
  // Check if route requires guest (not authenticated)
  // else if (to.meta.requiresGuest && userIsAuthenticated) {
  //   // Redirect to dashboard if already authenticated
  //   next({ name: 'dashboard' });
  // } 
  // Allow navigation
  else {
    next();
  }
});

export default router
