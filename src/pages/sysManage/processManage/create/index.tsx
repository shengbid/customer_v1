import React from 'react'
import { Card } from 'antd'
import ProcessDesign from '@/components/Bpmn/ProcessManage/ProcessDesign'

const Create: React.FC = (props: any) => {
  const { query } = props.location
  console.log(3, query)
  return (
    <Card>
      <ProcessDesign query={query} />
    </Card>
  )
}

export default Create
