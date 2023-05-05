import hyRequest from '..'

import type { IAccount } from '@/types'
//登录接口
export function accountLoginRequest(account: IAccount) {
  return hyRequest.post({
    url: '/login',
    data: account,
  })
}
//查询角色信息接口
export function getUserInfoById(id: number) {
  return hyRequest.get({
    url: `/users/${id}`,
  })
}

//查询菜单接口
export function getUserMenusByRoleId(id: number) {
  return hyRequest.get({
    url: `/role/${id}/menu`,
  })
}
