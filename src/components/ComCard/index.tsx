import React from 'react'
import ProCard from '@ant-design/pro-card'
import style from './index.less'

export interface proCardProps {
  title: string
  extra?: React.ReactNode
  bodyStyle?: any
}

const ComCard: React.FC<proCardProps> = ({
  title,
  children,
  extra,
  bodyStyle = { padding: 12 },
}) => {
  return (
    <ProCard
      className={style.comcard}
      extra={extra}
      title={title}
      headerBordered
      bodyStyle={bodyStyle}
    >
      {children}
    </ProCard>
  )
}

export default ComCard
