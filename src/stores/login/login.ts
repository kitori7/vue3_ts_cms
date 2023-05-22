import { defineStore } from 'pinia'
import { accountLoginRequest, getUserInfoById, getUserMenusByRoleId } from '@/service/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import router from '@/router'
import { LOGIN_TOKEN } from '@/global/constants'
import { mapMenusToRoutes } from '@/utils/map-menus'
import useMainStore from '../main/main'

interface ILoginState {
  token: string
  userInfo: any
  userMenu: any[]
}
const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: '',
    userInfo: {},
    userMenu: [],
  }),
  actions: {
    //登录action
    async loginAccountAction(account: IAccount) {
      //登录获取token
      const loginResult = await accountLoginRequest(account)
      const id = loginResult.data.id
      this.token = loginResult.data.token
      localCache.setCache(LOGIN_TOKEN, this.token)
      //获取登录用户详细信息
      const userInfoRes = await getUserInfoById(id)
      const userInfo = userInfoRes.data
      this.userInfo = userInfo

      //根据角色请求权限
      const userMenusRes = await getUserMenusByRoleId(this.userInfo.role.id)
      const userMenu = userMenusRes.data
      this.userMenu = userMenu

      //  本地储存
      localCache.setCache('userInfo', this.userInfo)
      localCache.setCache('userMenu', this.userMenu)

      // 请求所有roles、departments
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()

      //页面跳转
      router.push('/main')
    },
    loadLocalCacheAction() {
      // 刷新默认加载数据
      const token = localCache.getCatch(LOGIN_TOKEN)
      const userInfo = localCache.getCatch('userInfo')
      const userMenu = localCache.getCatch('userMenu')
      if (token && userInfo && userMenu) {
        this.token = token
        this.userInfo = userInfo
        this.userMenu = userMenu

        // 请求所有roles、departments
        const mainStore = useMainStore()
        mainStore.fetchEntireDataAction()

        // 动态添加路由
        const routes = mapMenusToRoutes(userMenu)
        routes.forEach((route) => router.addRoute('main', route))
      }
    },
  },
})
export default useLoginStore
