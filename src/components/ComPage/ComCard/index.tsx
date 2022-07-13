import React from 'react'
import { Card } from 'antd'

interface comcardprops {
  title: string
}

const ComCard: React.FC<comcardprops> = (props: any) => {
  const { title } = props

  return (
    <Card title={title} bordered={false} style={{ marginBottom: 12 }}>
      {props.children}
    </Card>
  )
}

export default ComCard
