import { request } from 'umi'
import type { signerProps } from '../types'

/** 获取登录信息 */
export async function getUserInfo() {
  return request(`/auth/login`)
}

/** 获取签约地址 */
export async function getSignUrl(data: signerProps) {
  return request(`/loanApplication`, {
    method: 'post',
    data,
  })
}

/** 获取签约地址 */
export async function getPhoneSignUrl(data: signerProps) {
  return request(`/passportApplication`, {
    method: 'post',
    data,
  })
}
