import React from 'react'
import { Result, Button } from 'antd'
import { FrownOutlined } from '@ant-design/icons'

// 授信拒绝
const Reject: React.FC = () => {
  const errorMsg = [
    {
      msg: '错误原因1',
      key: 1,
    },
    {
      msg: '错误原因2',
      key: 2,
    },
    {
      msg: '错误原因3',
      key: 3,
    },
  ]
  const style = { background: '#fff' }

  const subTile = (
    <div>
      请确认你是否满足以下条件:
      <ul>
        {errorMsg.map((item) => (
          <li key={item.key}>{item.msg}</li>
        ))}
      </ul>
    </div>
  )

  return (
    <Result
      style={style}
      icon={<FrownOutlined />}
      title="抱歉,暂时无法为你提供资金"
      subTitle={subTile}
      extra={
        <Button type="primary" key="console">
          重新申请
        </Button>
      }
    />
  )
}

export default Reject
