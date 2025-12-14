import { createRouter, createWebHistory } from 'vue-router'
import AuthLayout from '@/layouts/AuthLayout.vue'
import ErrorLayout from '@/layouts/ErrorLayout.vue'
import { isAuthenticated } from '@/composables/useAuth'
import { clearToken } from '@/composables/useAuth'
import { useUserStore } from '@/store/user.store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
    {
      path: '/verification',
      component: () => import('@/layouts/DashboardLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: 'step-1',
          name: 'verification-step-1',
          component: () => import('@/views/verification/Step1.vue')
        },
        {
          path: 'step-2',
          name: 'verification-step-2',
          component: () => import('@/views/verification/Step2.vue')
        },
      ]
    },
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
          path: 'profile',
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
    {
      path: '/:pathMatch(.*)*',
      component: ErrorLayout,
      children: [
        {
          path: '',
          name: 'error-404',
          component: () => import('@/views/error/Error404.vue')
        },
        {
          path: 'error',
          name: 'error-500',
          component: () => import('@/views/error/Error500.vue')
        }
      ]
    }
  ],
})

// Navigation Guard
router.beforeEach(async (to, from, next) => {
  const userIsAuthenticated = isAuthenticated();

  // Check if route requires authentication
  if (to.meta.requiresAuth && !userIsAuthenticated) {
    return next({ name: 'login' });
  } 

  if(to.meta.requiresGuest && userIsAuthenticated) {
    return next({ name: 'dashboard' });
  }

  if(to.meta.requiresAuth && userIsAuthenticated) {
    const store = useUserStore();
    await store.loadProfile();
    if(!store.user) {
      return next({ name: 'login' });
    }

    if(store.isFailed) {
      console.log(1);
      return next({ name: 'error-500' });
    }
    
    const isVerificationRoute = to.name && to.name.startsWith('verification-');
    if(store.user.is_verified == false && !isVerificationRoute) {
      return next({ name: 'verification-step-1' });
    }

    if(store.user.is_verified == true && isVerificationRoute) {
      return next({ name: 'dashboard' });
    }
  }

  return next();
});

export default router
