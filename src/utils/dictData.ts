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
// 任务分组
export const sysJobData = {
  SYSTEM: statusText.sys,
  DEFAULT: statusText.default,
}
// 是否并发
export const sysJobBFData = {
  '0': statusText.bf1,
  '1': statusText.bf2,
}
// 执行策略
export const sysJobCLData = {
  '1': statusText.cl1,
  '2': statusText.cl2,
  '3': statusText.cl3,
}
