import { createRouter, createWebHistory } from 'vue-router'
import AuthLogin from '@/components/authentication/AuthLogin.vue'
import AuthSignup from '@/components/authentication/AuthSignup.vue'
import AuthLayout from '@/components/authentication/AuthLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AuthLayout,
      children: [
        {
          path: '',
          component: AuthLogin
        },
        {
          path: 'signup',
          component: AuthSignup
        }
      ]
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
})

export default router
