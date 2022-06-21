import { request } from 'umi'
import type { signerProps, envelopeProps } from '../types'

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

/** 获取签约地址(短信) */
export async function getPhoneSignUrl(data: signerProps) {
  return request(`/passportApplication`, {
    method: 'post',
    data,
  })
}

/** 获取模板列表 */
export async function getTemplates() {
  return request(`/template/getTemplates`)
}

/** 获取模板签约人列表 */
export async function getTemplateSigners(data: any) {
  return request(`/template/getSigners`, {
    method: 'post',
    data,
  })
}

/** 获取客户信封列表 */
export async function getEnvelopesByUser(data: any) {
  return request(`/template/getEnvelopes`, {
    method: 'post',
    data,
  })
}
/** 获取客户信封文件列表 */
export async function getEnvelopeDocuments(data: any) {
  return request(`/template/getEnvelopeDocuments`, {
    method: 'post',
    data,
  })
}
/** 根据文档ID获取文件图片 */
export async function getEnvelopeDocumentImages(data: any) {
  return request(`/template/getEnvelopeDocumentImages`, {
    method: 'post',
    data,
  })
}
/** 获取客户信封文件pdf */
export async function getEnvelopePdfs(data: any) {
  return request(`/template/getEnvelopePdfs`, {
    method: 'post',
    data,
    responseType: 'blob',
  })
}

/** 创建信封(模板生成) */
export async function createEnvelopeByTemplate(data: envelopeProps) {
  return request(`/template/sendByTemplate`, {
    method: 'post',
    data,
  })
}
/** 根据信封ID生成签约视图(模板生成) */
export async function getViewByEnvelope(data: signerProps) {
  return request(`/template/getViewByEnvelope`, {
    method: 'post',
    data,
  })
}
