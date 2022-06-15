import React from 'react'
import { Button, Result } from 'antd'
import { history } from 'umi'

const CompletePage: React.FC = (props: any) => {
  const { event } = props.location.query
  console.log(event)
  const signResult: any = {
    status: 'success',
    title: '签约成功!',
  }
  if (event && event !== 'signing_complete') {
    signResult.status = 'warning'
    signResult.title = '签约未完成!'
  }

  const toBack = () => {
    history.push('/login')
  }
  return (
    <Result
      status={signResult.status}
      title={signResult.title}
      extra={[
        <Button type="primary" key="console" onClick={toBack}>
          回到签约页面
        </Button>,
      ]}
    />
  )
}

export default CompletePage
