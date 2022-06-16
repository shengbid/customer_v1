import { request } from 'umi'
import type { signerProps } from '../types'

/** 获取登录信息 */
export async function getUserInfo() {
  return request(`/auth/login`)
}

/** 获取模板列表 */
export async function getTemplates() {
  return request(`/loanApplication/getTemplates`)
}
/** 获取模板签约人列表 */
export async function getTemplateSigners(data: any) {
  return request(`/loanApplication/getSigners`, {
    method: 'post',
    data,
  })
}

/** 获取签约地址 */
export async function getSignUrl(data: signerProps) {
  return request(`/loanApplication`, {
    method: 'post',
    data,
  })
}

/** 获取签约地址(短信) */
export async function getPhoneSignUrl(data: signerProps) {
  return request(`/passportApplication`, {
    method: 'post',
    data,
  })
}

/** 获取签约地址(模板生成) */
export async function getTemplateSignUrl(data: signerProps) {
  return request(`/loanApplication/sendByTemplate`, {
    method: 'post',
    data,
  })
}
