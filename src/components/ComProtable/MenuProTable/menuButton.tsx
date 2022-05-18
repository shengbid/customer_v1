import React from 'react'
import { Button } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'

import styles from './index.less'

const style = { marginLeft: '3px' }
// 新增
const MenuAddButton: React.FC<any> = ({ children, onClick }) => {
  return (
    <Button type="primary" onClick={onClick}>
      <PlusOutlined />
      <span className={`${styles['yue-pro-table-btn']}`}>{children ? children : '新增'}</span>
    </Button>
  )
}
// 批量删除
const MenuMultiDelButton: React.FC<any> = ({ children, onClick }) => {
  return (
    <Button type="primary" onClick={onClick}>
      <DeleteOutlined />
      <span className={`${styles['yue-pro-table-btn']}`}>{children ? children : '批量删除'}</span>
    </Button>
  )
}
// 修改
const MenuEditButton: React.FC<any> = ({ children, onClick }) => {
  return (
    <a onClick={onClick}>
      <EditOutlined />
      <span style={style}>{children ? children : '修改'}</span>
    </a>
  )
}
// 删除
const MenuDelteButton: React.FC<any> = ({ children, onClick }) => {
  return (
    <a onClick={onClick}>
      <DeleteOutlined />
      <span style={style}>{children ? children : '删除'}</span>
    </a>
  )
}

export { MenuAddButton, MenuMultiDelButton, MenuEditButton, MenuDelteButton }
