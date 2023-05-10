import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/main',
    },
    {
      path: '/login',
      component: () => import('@/views/login/login.vue'),
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('@/views/main/main.vue'),
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('@/views/not-found/NotFound.vue'),
    },
  ],
})

//导航守卫
router.beforeEach((to) => {
  const token = localCache.getCatch(LOGIN_TOKEN)
  if (to.path.startsWith('/main') && !token) {
    return '/login'
  }
})

export default router
