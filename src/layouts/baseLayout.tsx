import React from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import { BackTop } from 'antd'

const baseLayout: React.FC = ({ children }) => {
  return (
    <>
      <BackTop />
      <PageContainer header={{ title: false }}>{children}</PageContainer>
    </>
  )
}

export default baseLayout
