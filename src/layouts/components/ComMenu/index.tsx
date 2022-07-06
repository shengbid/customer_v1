import React from 'react'
import { Link, useModel } from 'umi'
import { Menu } from 'antd'
import type { MenuProps } from 'antd'
import * as Icon from '@ant-design/icons'
import staticRoutes from 'config/staticRoute'

interface menuprops {
  pathname: string
}
const ComMenuData: React.FC<menuprops> = ({ pathname }) => {
  const { initialState } = useModel('@@initialState')
  const defaultSelectedKeys: any[] = [pathname]
  const defaultOpenKeys: any[] = [pathname]

  const { menus } = initialState ?? {}
  // const intl = useIntl()
  const data = [...staticRoutes, ...(menus || [])]

  let items: MenuProps['items'] = []

  const render = (datas: any[]) => {
    const arr: any[] = []
    datas.map((item) => {
      const obj = {
        label: <Link to={`${item.path}`}>{item.title}</Link>,
        key: item.path,
        icon: item.icon && Icon[item.icon] ? React.createElement(Icon[item.icon]) : item.icon,
      }
      if (item.children) {
        obj.children = render(item.children)
      }
      arr.push(obj)
    })
    return arr
  }
  items = render(data).concat([
    {
      label: '测试菜单',
      key: '/leaderPage',
      children: [
        {
          label: <Link to="/leaderPage/onlineManage">测试子菜单项</Link>,
          key: '/leaderPage/onlineManage',
        },
      ],
    },
  ])

  return (
    <Menu
      items={items}
      mode="inline"
      defaultOpenKeys={defaultOpenKeys}
      defaultSelectedKeys={defaultSelectedKeys}
    />
  )
}

export default ComMenuData
