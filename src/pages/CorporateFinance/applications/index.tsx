import { Button } from 'antd'
import React from 'react'
import styles from './index.less'
import { formatAmount } from '@/utils/base'
import { history } from 'umi'

const Applications: React.FC = () => {
  const productList = [
    {
      key: 1,
      name: '池融易可用额度(美元)',
      amount: 200000,
      creditAmount: 10000,
      usedAmount: 100000,
      waterAmount: 20000,
      waterUsableAmount: 80000,
    },
    {
      key: 2,
      name: 'B2B质押可用额度(美元)',
      amount: 300000,
      creditAmount: 20000,
      usedAmount: 100000,
    },
    {
      key: 3,
      name: '代理采购可用额度(美元)',
      amount: 200000,
      creditAmount: 10000,
      usedAmount: 100000,
    },
  ]

  // 跳转申请页面
  const toApply = (key: number) => {
    if (key === 3) {
      history.push({
        pathname: '/finance/apply/form',
        query: {
          key: String(key),
        },
      })
    }
  }

  return (
    <div className={styles.contanier}>
      <p className={styles.name}>融资产品:</p>
      {productList.map((item: any) => (
        <div className={styles.pitem} key={item.name}>
          <div className={styles.left}>
            <div className={styles.title}>{item.name}</div>
            <div className={styles.amount}>{formatAmount(item.amount)}</div>
            <Button className={styles.button} type="primary" onClick={() => toApply(item.key)}>
              申请融资
            </Button>
          </div>
          <div className={styles.right}>
            <div className={styles.stitle}>授信额度</div>
            <div className={styles.text}>{formatAmount(item.creditAmount)}美元</div>
            <div className={styles.stitle}>已用额度</div>
            <div className={styles.text}>{formatAmount(item.usedAmount)}美元</div>
            {item.waterAmount ? (
              <>
                <div className={styles.stitle}>
                  <span className={styles.two}>水位额度</span>
                  <span>水位可用额度</span>
                </div>
                <div className={styles.text}>
                  <span className={styles.two}>{formatAmount(item.waterAmount)}美元</span>
                  <span>{formatAmount(item.waterUsableAmount)}美元</span>
                </div>
              </>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Applications
