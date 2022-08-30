import React from 'react'
import { Result, Button } from 'antd'
import { CheckCircleOutlined } from '@ant-design/icons'
import { formatAmount } from '@/utils/base'
import { history } from 'umi'
import styles from './result.less'

// 授信成功
const Reject: React.FC = () => {
  const info = [
    {
      amount: 100000,
      title: '产品1',
    },
    {
      amount: 200000,
      title: '产品2',
    },
  ]
  const total = 300000

  const title = (
    <div>
      恭喜!授信审核通过
      <div className={styles.credit}>
        授信总额度: <span className={styles.amount}>{formatAmount(total)}美元</span>
      </div>
    </div>
  )

  const subTile = (
    <div className={styles.box}>
      {info.map((item) => (
        <div key={item.title} className={styles.product}>
          <div className={styles.right}>
            <div className={styles.title}>{item.title}</div>
            <div className={styles.amount}>{formatAmount(item.amount)}美元</div>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <Result
      className={styles.success}
      icon={<CheckCircleOutlined />}
      title={title}
      status="success"
      subTitle={subTile}
      extra={
        <Button
          type="primary"
          onClick={() => {
            history.push('/repayment/create')
          }}
        >
          去融资
        </Button>
      }
    />
  )
}

export default Reject
