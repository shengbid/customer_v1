import React from 'react'
import { isEmpty } from 'lodash'
import { parse } from 'querystring'
import * as Icon from '@ant-design/icons'
import { history } from 'umi'
import { stringify } from 'querystring'
import moment from 'moment'

// 处理分页参数
export const paramsToPageParams = (params: any) => {
  // 将antd组件的页面参数转换为接口要的接口参数，如果没有或者非对象则直接返回
  if (typeof params === 'object' && params.constructor === Object) {
    // if (Reflect.has(params, 'pageSize')) {
    //   Reflect.set(params, 'pageSize', params.pageSize)
    // }
    if (Reflect.has(params, 'current')) {
      Reflect.set(params, 'pageNum', params.current)
    }
    // Reflect.deleteProperty(params, 'pageSize')
    Reflect.deleteProperty(params, 'current')
  }
  return params
}

// 日期格式
export const dateFormat = 'YYYY-MM-DD'
export const dateFormatEn = 'YYYY/MM/DD'
export const monthFormat = 'YYYY-MM'

// 时间格式
export const timeFormat = 'YYYY-MM-DD hh:mm:ss'

// 空字段处理
export function formatEmpty(val: any) {
  if (val || val === 0) {
    return val
  }
  return '-'
}
// 判断是否为空
export function IsEmpty(val: any) {
  if (val || val === 0) {
    return false
  }
  return true
}

// 百分比数字
export const formatPercent = (val: any) => {
  if (val === '' || val === '-' || val === undefined || isNaN(val)) {
    return '-'
  }
  if (val === 0 || val === '0') {
    return 0
  }
  return `${formatAmount(val * 100)}%`
}

// 金额千分位展示,保留两位小数
export function formatAmount(val: any, type = false) {
  if (val === '' || val === '-' || val === undefined || isNaN(val)) {
    return '-'
  }
  if (val === 0 || val === '0') {
    return 0
  }
  let value = val
  if (val < 0) {
    // 为负数时
    value = -val
  }
  // 先判断数据是否有小数点
  let newVal = String(value)
  const dotIdx = newVal.lastIndexOf('.')
  let dotLength = 0
  if (newVal.split('.').length > 1) {
    dotLength = newVal.split('.')[1].length
  }
  let dotVal = '' // 保留小数点后面的数据
  if (dotIdx >= 0) {
    newVal = String(Number(value).toFixed(2))
    dotVal = newVal.substr(dotIdx, dotLength + 1)
    newVal = newVal.slice(0, dotIdx)
  }
  let len = newVal.length
  const arr = []
  let lastIndex = null
  while (len > 0) {
    lastIndex = len
    len -= 3
    arr.unshift(newVal.substring(len, lastIndex))
  }

  if (dotVal.length < 2) {
    dotVal = ''
  }
  if (type && !dotVal) dotVal = '.00'

  if (val < 0) {
    return `-${arr.join(',')}${dotVal}`
  }
  return arr.join(',') + dotVal
}

export interface setProductElementParam {
  data: any
  standard: string
  value: string
  unit: string
  showPercent?: boolean
}

// 处理时间
export const handleData = (date: string) => {
  if (date) {
    return moment(date).format(timeFormat)
  }
  return '-'
}

// 获取登录前页面地址
export const getPageQuery = () => {
  const { href } = window.location
  const qsIndex = href.indexOf('?')
  const sharpIndex = href.indexOf('#')

  if (qsIndex !== -1) {
    if (qsIndex > sharpIndex) {
      return parse(href.split('?')[1])
    }

    return parse(href.slice(qsIndex + 1, sharpIndex))
  }

  return {}
}
// 退出到登录页
export const loginOut = () => {
  const { redirect } = getPageQuery()
  if (window.location.pathname !== '/login' && !redirect) {
    history.replace({
      pathname: '/login',
      search: stringify({
        redirect: `${window.location.pathname}${window.location.search}`,
      }),
    })
  }
}

// 统一处理排序参数
export const handleSortParams = (param: any, sort: any) => {
  const sorts = {
    orderBy: '',
  }
  if (!isEmpty(sort)) {
    for (const key in sort) {
      if (sort[key] === 'ascend') {
        sorts.orderBy = `${key} ASC`
      } else {
        sorts.orderBy = `${key} DESC`
      }
    }
    return {
      ...param,
      ...sorts,
    }
  }
  return {
    ...param,
  }
}

/**
 * 处理树形数据
 * @param data 数组
 * @param id id对应的key
 * @param title title对应的key
 * @param label 要返回的title key
 * @param idName 要返回的id key
 * @returns
 */
export const handleTreeData = (
  data: any[],
  id: string,
  title: string,
  label = 'title',
  idName = 'value',
) => {
  const render = (datas: any[]) => {
    const arr: any[] = []
    datas.map((item) => {
      const obj = {}
      obj[idName] = item[id]
      obj[label] = item[title]
      if (item.children) {
        obj.children = render(item.children)
      }
      arr.push(obj)
    })
    return arr
  }

  return render(data)
}

// 处理selectoption数据
export const handleOptionData = (data: any[], value: string, label: string) => {
  const arr: any[] = []
  data.map((item) => {
    const obj = {
      value: item[value],
      label: item[label],
    }
    arr.push(obj)
  })
  return arr
}

// 处理菜单数据
export const handleMenuData = (data: any[]) => {
  const render = (datas: any[]) => {
    const arr: any[] = []
    datas.map((item) => {
      const obj = {
        path: item.path,
        name: item.title,
        icon: item.icon && Icon[item.icon] ? React.createElement(Icon[item.icon]) : item.icon,
      }
      if (item.children) {
        obj.routes = render(item.children)
      }
      arr.push(obj)
    })
    return arr
  }
  return render(data)
}
