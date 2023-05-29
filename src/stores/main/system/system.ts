import {
  deleteUserById,
  postUsersListData,
  newUserData,
  editUserData,
  postPageListData,
  deletePageById,
  newPageData,
  editPageData,
} from '@/service/main/system/system'
import { defineStore } from 'pinia'
import useMainStore from '../main'

interface ISystemState {
  usersList: any[]
  usersTotalCount: number
  pageList: any[]
  pageTotalCount: number
}
const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount: 0,
    pageList: [],
    pageTotalCount: 0,
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
    async newUserDataAction(userInfo: any) {
      const newRes = await newUserData(userInfo)
      this.postUsersListAction({ size: 10, offset: 0 })
      console.log(newRes.data)
    },
    async editUserDataAction(id: number, userInfo: any) {
      const editRes = await editUserData(id, userInfo)
      this.postUsersListAction({ size: 10, offset: 0 })
    },

    //页面数据的增删改查
    async postPageListAction(pageName: string, queryInfo: any) {
      const pageListRes = await postPageListData(pageName, queryInfo)
      const { totalCount, list } = pageListRes.data
      this.pageList = list
      this.pageTotalCount = totalCount
    },

    async deletePageByIdAction(pageName: string, id: number) {
      const deleteRes = await deletePageById(pageName, id)
      this.postPageListAction(pageName, { offset: 0, size: 10 })
    },

    async newPageDataAction(pageName: string, pageInfo: any) {
      const newRes = await newPageData(pageName, pageInfo)
      this.postPageListAction(pageName, { size: 10, offset: 0 })
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    },

    async editPageDataAction(pageName: string, id: number, pageInfo: any) {
      const editRes = await editPageData(pageName, id, pageInfo)
      this.postPageListAction(pageName, { size: 10, offset: 0 })
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    },
  },
})

export default useSystemStore
