import { request } from 'umi'
import type { userParamProps, userProps, postListProps, roleListProps } from '@/services/types'
import { paramsToPageParams } from '@/utils/base'

const url = '/system/user'

/** 获取用户列表 */
export async function getUserList(params: userParamProps) {
  return request<{ rows: userProps[]; total: number }>(`${url}/list`, {
    params: paramsToPageParams(params),
  })
}

/** 获取用户部门和岗位 */
export async function getUser() {
  return request<{ posts: postListProps[]; roles: roleListProps[] }>(`${url}/`)
}

/** 新增编辑用户 */
export async function addUser(data: userProps) {
  return request(`${url}`, {
    method: data.userId ? 'put' : 'post',
    data,
  })
}
/** 删除用户 */
export async function deleteUser(id: number | string) {
  return request(`${url}/${id}`, {
    method: 'delete',
  })
}
/** 获取用户详情 */
export async function userDetail(id: number) {
  return request<{ data: userProps; postIds: number[]; roleIds: number[] }>(`${url}/${id}`)
}

/** 改变用户状态 */
export async function changeUserStatus(data: { status: string; userId: number }) {
  return request(`${url}/changeStatus`, {
    data,
    method: 'put',
  })
}

/** 重置密码 */
export async function resetPass(data: { password: string; userId: number }) {
  return request(`${url}/resetPwd`, {
    data,
    method: 'put',
  })
}
