import { request } from 'umi'
import type { loginProps, userRoleProps, userProps } from '@/services/types'

/** 登录 */
export async function login(data: loginProps) {
  return request('/auth/login', {
    method: 'POST',
    data,
  })
}

/** 退出登录 */
export async function outLogin() {
  return request('/auth/logout', {
    method: 'delete',
  })
}

/** 获取验证码 */
export async function getCaptcha() {
  return request('/code')
}

/** 获取登录信息 */
export async function queryCurrentUser() {
  return request<userRoleProps>('/system/user/getInfo')
}

/** 获取个人信息 */
export async function queryUserCenter(data?: userProps) {
  return request<{ data: userProps; roleGroup: string }>('/system/user/profile', {
    method: data ? 'put' : 'get',
    data,
  })
}

/** 修改密码 */
export async function updatePassWord(params: { oldPassword: string; newPassword: string }) {
  return request('/system/user/profile/updatePwd', {
    method: 'put',
    params,
  })
}
