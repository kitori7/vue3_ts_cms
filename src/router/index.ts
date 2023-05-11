import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'
import { firstMenu } from '@/utils/map-menus'
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
  //登录成功有token进入main
  const token = localCache.getCatch(LOGIN_TOKEN)
  if (to.path.startsWith('/main') && !token) {
    return '/login'
  }

  // 进入到main
  if (to.path === '/main') {
    return firstMenu?.url
  }
})

export default router
