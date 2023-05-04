import { defineStore } from 'pinia'
import { accountLoginRequest } from '@/service/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'

const LOGIN_TOKEN = 'login/token'
const useLoginStore = defineStore('login', {
  state: () => ({
    id: '',
    token: localCache.getCatch(LOGIN_TOKEN) ?? '',
    name: '',
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      const loginResult = await accountLoginRequest(account)
      this.id = loginResult.data.id
      this.token = loginResult.data.token
      this.name = loginResult.data.name

      localCache.setCache(LOGIN_TOKEN, this.token)
    },
  },
})
export default useLoginStore
