import * as Icon from '@ant-design/icons'
import React from 'react'

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
