import { Button } from 'antd'
import React, { useState } from 'react'
import styles from './index.less'
import { formatAmount } from '@/utils/base'
import { history } from 'umi'
import FinanceType from './components/financeType'

const Applications: React.FC = () => {
  const [financeVisible, setFinanceVisible] = useState<boolean>(false)

  const productList = [
    {
      key: 4,
      name: '池融易可用额',
      amount: 200000,
      creditAmount: 10000,
      usedAmount: 100000,
      waterAmount: 20000,
      waterUsableAmount: 80000,
    },
    {
      key: 2,
      name: 'B2B质押可用额度',
      amount: 300000,
      creditAmount: 20000,
      usedAmount: 100000,
    },
    {
      key: 1,
      name: '代理采购可用额度',
      amount: 200000,
      creditAmount: 10000,
      usedAmount: 100000,
    },
  ]

  // 跳转申请页面
  const toApply = (key: number) => {
    if (key === 1) {
      history.push({
        pathname: '/finance/apply/form',
        query: {
          type: String(key),
        },
      })
    }
    if (key === 2) {
      setFinanceVisible(true)
    }
  }

  const handleApply = (key?: number) => {
    if (key) {
      history.push({
        pathname: '/finance/apply/form',
        query: {
          type: String(key),
        },
      })
    }
    setFinanceVisible(false)
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

      {/* 选择质押类型 */}
      <FinanceType modalVisible={financeVisible} handleCancel={handleApply} />
    </div>
  )
}

export default Applications
