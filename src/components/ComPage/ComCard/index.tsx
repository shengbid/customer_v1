import React from 'react'
import { Card } from 'antd'

interface comcardprops {
  title: string
  style?: React.CSSProperties
  extra?: React.ReactNode
}

const ComCard: React.FC<comcardprops> = (props: any) => {
  const { title, style, extra } = props

  return (
    <Card title={title} extra={extra} bordered={false} style={{ marginBottom: 12, ...style }}>
      {props.children}
    </Card>
  )
}

export default ComCard
