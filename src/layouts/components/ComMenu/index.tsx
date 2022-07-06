import React from 'react'
import { Link, useModel } from 'umi'
import { Menu } from 'antd'
import type { MenuProps } from 'antd'
import * as Icon from '@ant-design/icons'
import staticRoutes from 'config/staticRoute'

const ComMenuData: React.FC = () => {
  const { initialState } = useModel('@@initialState')

  const { menus } = initialState ?? {}
  // const intl = useIntl()
  const data = [...staticRoutes, ...(menus || [])]

  let items: MenuProps['items'] = []
  const render = (datas: any[]) => {
    const arr: any[] = []
    datas.map((item) => {
      const obj = {
        label: <Link to={`${item.path}`}>{item.title}</Link>,
        key: item.title,
        icon: item.icon && Icon[item.icon] ? React.createElement(Icon[item.icon]) : item.icon,
      }
      if (item.children) {
        obj.children = render(item.children)
      }
      arr.push(obj)
    })
    return arr
  }
  items = render(data)

  return <Menu items={items} />
}

export default ComMenuData
