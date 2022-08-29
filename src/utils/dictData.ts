import zhRule from '@/locales/zh-CN/dictData'
import enRule from '@/locales/zh-CN/dictData'
import twRule from '@/locales/zh-CN/dictData'
import { getLocale } from 'umi'
import { getDictSelectList } from '@/services'

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

// 表格数据字典获取
export const getDictData = async (authorword: string) => {
  const { data } = await getDictSelectList(authorword)

  const obj = {}
  if (data) {
    data.forEach((item: any) => {
      obj[item.dictValue] = item.dictLabel
    })
  }
  return obj
}
