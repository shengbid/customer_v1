import React from 'react'
import { Button } from 'antd'
import { FileAddOutlined } from '@ant-design/icons'

import styles from './index.less'

const MenuButton: React.FC<any> = ({ children, onClick }) => {
  return (
    <>
      <Button
        type="primary"
        className="add-left-btn"
        onClick={onClick}
      >
        <FileAddOutlined />
        <span className={`${styles['yue-pro-table-btn']}`}>{children}</span>
      </Button>
    </>
  )
}

export default MenuButton