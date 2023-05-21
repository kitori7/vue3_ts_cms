import { deleteUserById, postUsersListData } from '@/service/main/system/system'
import { defineStore } from 'pinia'

interface ISystemState {
  usersList: any[]
  usersTotalCount: number
}
const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount: 0,
  }),
  actions: {
    async postUsersListAction(queryInfo: any) {
      const usersListRes = await postUsersListData(queryInfo)
      const { totalCount, list } = usersListRes.data
      this.usersList = list
      this.usersTotalCount = totalCount
    },
    async deleteUserByIdAction(id: number) {
      const deleteRes = await deleteUserById(id)
      console.log(deleteRes.data)
      this.postUsersListAction({ size: 10, offset: 0 })
    },
  },
})

export default useSystemStore
