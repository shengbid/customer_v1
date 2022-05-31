import React from 'react'
import { Popconfirm } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import PermissionButton from '@/components/Permission'

import styles from './index.less'

const style = { marginLeft: '3px' }
// 新增
const MenuAddButton: React.FC<any> = ({ children, onClick, authorWord }) => {
  return (
    <PermissionButton authorWord={authorWord} type="primary" onClick={onClick}>
      <PlusOutlined />
      <span className={`${styles['yue-pro-table-btn']}`}>{children ? children : '新增'}</span>
    </PermissionButton>
  )
}
// 批量删除
const MenuMultiDelButton: React.FC<any> = ({ children, onClick, authorWord }) => {
  return (
    <PermissionButton authorWord={authorWord} type="primary" onClick={onClick}>
      <DeleteOutlined />
      <span className={`${styles['yue-pro-table-btn']}`}>{children ? children : '批量删除'}</span>
    </PermissionButton>
  )
}
// 修改
const MenuEditButton: React.FC<any> = ({ children, onClick, authorWord }) => {
  return (
    <PermissionButton authorWord={authorWord} type="link" onClick={onClick}>
      <EditOutlined />
      <span style={style}>{children ? children : '修改'}</span>
    </PermissionButton>
  )
}
// 删除
const MenuDelteButton: React.FC<any> = ({ children, onClick, authorWord }) => {
  return (
    <Popconfirm title="是否确认删除?" onConfirm={onClick}>
      <PermissionButton authorWord={authorWord} type="link">
        <DeleteOutlined />
        <span style={style}>{children ? children : '删除'}</span>
      </PermissionButton>
    </Popconfirm>
  )
}

export { MenuAddButton, MenuMultiDelButton, MenuEditButton, MenuDelteButton }
