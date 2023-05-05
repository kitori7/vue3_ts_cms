import { defineStore } from 'pinia'
import { accountLoginRequest, getUserInfoById, getUserMenusByRoleId } from '@/service/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import router from '@/router'
import { LOGIN_TOKEN } from '@/global/constants'

interface ILoginState {
  token: string
  userInfo: any
  userMenu: any[]
}
const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: localCache.getCatch(LOGIN_TOKEN) ?? '',
    userInfo: {},
    userMenu: [],
  }),
  actions: {
    //登录action
    async loginAccountAction(account: IAccount) {
      const loginResult = await accountLoginRequest(account)
      const id = loginResult.data.id
      this.token = loginResult.data.token
      //  本地储存
      localCache.setCache(LOGIN_TOKEN, this.token)
      //获取登录用户详细信息
      const userInfoRes = await getUserInfoById(id)
      this.userInfo = userInfoRes.data

      //根据角色请求权限
      const userMenusRes = await getUserMenusByRoleId(this.userInfo.role.id)
      this.userMenu = userMenusRes.data

      //页面跳转
      router.push('/main')
    },
  },
})
export default useLoginStore
