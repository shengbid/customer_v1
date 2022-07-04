import { request } from 'umi'
import type { loginProps, userRoleProps, userProps, phoneCodeProps } from '@/services/types'

/** 登录 */
export async function login(data: loginProps) {
  return request('/auth/cus/login', {
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
  return request(`/code`)
}

/** 获取手机验证码 */
export async function getPhoneCaptcha(data: phoneCodeProps) {
  return request(`/auth/verify/phone`, {
    method: 'post',
    data,
  })
}

/** 获取登录信息 */
export async function queryCurrentUser() {
  return request<userRoleProps>('/cus/user/getInfo')
}

/** 获取个人信息 */
export async function queryUserCenter(data?: userProps) {
  return request<{ data: userProps; roleGroup: string }>('/system/user/profile', {
    method: data ? 'put' : 'get',
    data,
  })
}

/** 修改密码 */
export async function updatePassWord(data: { oldPassword: string; newPassword: string }) {
  return request('/cus/user/resetPwd', {
    method: 'put',
    data,
  })
}
