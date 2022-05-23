import React from 'react'
import { StatisticCard } from '@ant-design/pro-card'
import style from '../index.less'

const bodyStyle = { padding: 12, backgroundColor: '#fbfbfb' }

const LeftStatic: React.FC = () => {
  return (
    <>
      <StatisticCard
        className={style.grey}
        bodyStyle={bodyStyle}
        statistic={{
          title: '存量用户（户）',
          value: 20190,
          precision: 2,
        }}
        chart={
          <img
            src="https://gw.alipayobjects.com/zos/alicdn/RLeBTRNWv/bianzu%25252043x.png"
            alt="直方图"
            width="100%"
          />
        }
      />
      <StatisticCard
        className={style.grey}
        bodyStyle={bodyStyle}
        statistic={{
          title: '新增用户（户）',
          value: 20190,
          precision: 2,
        }}
        chart={
          <img
            src="https://gw.alipayobjects.com/zos/alicdn/RLeBTRNWv/bianzu%25252043x.png"
            alt="直方图"
            width="100%"
          />
        }
      />
      <StatisticCard
        className={style.grey}
        bodyStyle={bodyStyle}
        chartPlacement="left"
        statistic={{
          title: '流失用户（户）',
          value: 20190,
          precision: 2,
        }}
        chart={
          <img
            src="https://gw.alipayobjects.com/zos/alicdn/ShNDpDTik/huan.svg"
            alt="直方图"
            width="100%"
          />
        }
      />
      <StatisticCard
        className={style.grey}
        bodyStyle={bodyStyle}
        statistic={{
          title: '放款笔数（笔）',
          value: 20190,
          precision: 2,
        }}
        chart={
          <img
            src="https://gw.alipayobjects.com/zos/alicdn/RLeBTRNWv/bianzu%25252043x.png"
            alt="直方图"
            width="100%"
          />
        }
      />
      <StatisticCard
        className={style.grey}
        bodyStyle={bodyStyle}
        statistic={{
          title: '贷款金额（万元）',
          value: 20190,
          precision: 2,
        }}
        chart={
          <img
            src="https://gw.alipayobjects.com/zos/alicdn/RLeBTRNWv/bianzu%25252043x.png"
            alt="直方图"
            width="100%"
          />
        }
      />
    </>
  )
}

export default LeftStatic
