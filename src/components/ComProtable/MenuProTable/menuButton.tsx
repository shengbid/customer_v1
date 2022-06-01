import React from 'react'
import { Popconfirm } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import PermissionButton from '@/components/Permission'
import { useIntl } from 'umi'

import styles from './index.less'

const style = { marginLeft: '3px' }
// 新增
const MenuAddButton: React.FC<any> = ({ children, onClick, authorword }) => {
  const intl = useIntl()
  return (
    <PermissionButton authorword={authorword} type="primary" onClick={onClick}>
      <PlusOutlined />
      <span className={`${styles['yue-pro-table-btn']}`}>
        {children ? children : intl.formatMessage({ id: 'pages.btn.add' })}
      </span>
    </PermissionButton>
  )
}
// 批量删除
const MenuMultiDelButton: React.FC<any> = ({ children, onClick, authorword }) => {
  const intl = useIntl()
  return (
    <PermissionButton authorword={authorword} type="primary" onClick={onClick}>
      <DeleteOutlined />
      <span className={`${styles['yue-pro-table-btn']}`}>
        {children ? children : intl.formatMessage({ id: 'pages.btn.batchDelete' })}
      </span>
    </PermissionButton>
  )
}
// 修改
const MenuEditButton: React.FC<any> = ({ children, onClick, authorword }) => {
  const intl = useIntl()
  return (
    <PermissionButton authorword={authorword} type="link" onClick={onClick}>
      <EditOutlined />
      <span style={style}>
        {children ? children : intl.formatMessage({ id: 'pages.btn.edit' })}
      </span>
    </PermissionButton>
  )
}
// 删除
const MenuDelteButton: React.FC<any> = ({ children, onClick, authorword }) => {
  const intl = useIntl()
  return (
    <Popconfirm title={intl.formatMessage({ id: 'pages.btn.deleteInfo' })} onConfirm={onClick}>
      <PermissionButton authorword={authorword} type="link">
        <DeleteOutlined />
        <span style={style}>
          {children ? children : intl.formatMessage({ id: 'pages.btn.delete' })}
        </span>
      </PermissionButton>
    </Popconfirm>
  )
}

export { MenuAddButton, MenuMultiDelButton, MenuEditButton, MenuDelteButton }
