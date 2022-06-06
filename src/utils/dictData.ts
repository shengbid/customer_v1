import zhRule from '@/locales/zh-CN/dictData'
import enRule from '@/locales/zh-CN/dictData'
import twRule from '@/locales/zh-CN/dictData'
import { getLocale } from 'umi'

const statusObj = {
  'zh-CN': zhRule,
  'en-US': enRule,
  'zh-TW': twRule,
}
const statusText = statusObj[getLocale()]

export const statusData = {
  '0': statusText.success,
  '1': statusText.fail,
}
export const sysJobData = {
  SYSTEM: statusText.sys,
  DEFAULT: statusText.default,
}
