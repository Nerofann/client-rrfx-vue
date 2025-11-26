import { createRouter, createWebHistory } from 'vue-router'
import AuthLayout from '@/layouts/AuthLayout.vue'
import ErrorLayout from '@/layouts/ErrorLayout.vue'
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
        },
        {
          path: 'signup',
          name: "signup",
          component: () => import('@/views/auth/AuthSignup.vue'),
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
          path: '/verification/step-1',
          name: 'verification-step-1',
          component: () => import('@/views/verification/Step1.vue')
        },
        {
          path: '/verification/step-2',
          name: 'verification-step-2',
          component: () => import('@/views/verification/Step2.vue')
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
      component: ErrorLayout,
      children: [
        {
          path: '',
          component: () => import('@/views/NotFound.vue')
        }
      ]
    }
  ],
})

// Navigation Guard
router.beforeEach((to, from, next) => {
  const userIsAuthenticated = isAuthenticated();

  // Check if route requires authentication
  if (to.meta.requiresAuth && !userIsAuthenticated) {
    next({ name: 'login' });
  } 

  if(to.meta.requiresGuest && userIsAuthenticated) {
    next({ name: 'dashboard' });
  }

  next();
});

export default router
