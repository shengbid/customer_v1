import React from 'react'
import { Result } from 'antd'
import { SmileOutlined } from '@ant-design/icons'

// 授信申请中
const Processing: React.FC<{ time: string }> = ({ time }) => {
  const style = { background: '#fff' }

  const title = (
    <div>
      授信申请已提交<h3>申请时间: {time}</h3>
    </div>
  )

  return <Result style={style} icon={<SmileOutlined />} title={title} subTitle="请耐心等待" />
}

export default Processing
