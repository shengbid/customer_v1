import React from 'react'
import { Result, Button } from 'antd'
import { CheckCircleOutlined } from '@ant-design/icons'
import { formatAmount } from '@/utils/base'
import { history } from 'umi'
import styles from './index.less'

// 提交成功
const Reject: React.FC = () => {
  const info = [
    {
      text: 'HS20220808XXX',
      title: '申请订单编号:',
    },
    {
      text: '2022-08-08',
      title: '还款日期:',
    },
    {
      amount: 200000,
      title: '还款总金额:',
    },
  ]

  const title = (
    <div>
      提交成功
      <div className={styles.credit}>
        <span className={styles.amount}>我们预计在1~2个工作日审核，请及时关注</span>
      </div>
    </div>
  )

  const subTile = (
    <div className={styles.box}>
      {info.map((item) => (
        <div key={item.title} className={styles.product}>
          <div className={styles.right}>
            <div className={styles.title}>{item.title}</div>
            {item.amount ? (
              <div className={styles.amount}>{formatAmount(item.amount)}美元</div>
            ) : (
              <div className={styles.amount}>{item.text}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <Result
      className={styles.success}
      icon={<CheckCircleOutlined />}
      status="success"
      title={title}
      subTitle={subTile}
      extra={
        <Button
          type="primary"
          onClick={() => {
            history.push('/repayment/create')
          }}
        >
          返回列表
        </Button>
      }
    />
  )
}

export default Reject
