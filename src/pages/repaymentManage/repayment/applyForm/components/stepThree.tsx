import { useImperativeHandle, forwardRef, useState, useEffect } from 'react'
import type { ProColumns } from '@ant-design/pro-table'
import { formatAmount } from '@/utils/base'
import SimpleProtable from '@/components/ComProtable/SimpleProTable'
import Descriptions from '@/components/ComPage/Descriptions'
import ComCard from '@/components/ComPage/ComCard/index'
import styles from './index.less'

const { DescriptionsItem } = Descriptions

const StepOne = ({}, ref: any) => {
  const [listData, setListData] = useState<any[]>([])
  const [infoData, setInfoData] = useState<any>({})

  useEffect(() => {
    setInfoData({})
    setListData([
      {
        id: 1,
        name: '香港仓库',
        order: '444444444',
        time: '2022-04-09',
        editableKeys: [11],
        tables: [
          {
            id: 11,
            name: '小黄鸭1',
            amount: '',
          },
        ],
      },
      {
        id: 2,
        name: '香港仓库',
        order: '444444444',
        time: '2022-04-09',
        editableKeys: [22],
        tables: [
          {
            id: 22,
            name: '小黄鸭2',
            amount: '',
          },
        ],
      },
      {
        id: 3,
        name: '香港仓库',
        order: '444444444',
        time: '2022-04-09',
        editableKeys: [33],
        tables: [
          {
            id: 33,
            name: '小黄鸭3',
            amount: '',
          },
        ],
      },
    ])
  }, [])

  const columns: ProColumns<any>[] = [
    {
      title: '商品条形码',
      dataIndex: 'barCode',
      width: '13%',
    },
    {
      title: '描述 DESCRIPTION',
      dataIndex: 'goodName',
      width: '16%',
    },
    {
      title: '品牌 BRAND',
      dataIndex: 'goodBrand',
      width: '13%',
    },
    {
      title: '质押单价',
      dataIndex: 'price1',
      width: '13%',
      render: (val) => formatAmount(val),
    },
    {
      title: '可赎回数量',
      dataIndex: 'count',
      width: '15%',
      valueType: 'digit',
    },
    {
      title: '赎回数量',
      dataIndex: 'amount',
      width: '15%',
      valueType: 'digit',
    },
    {
      title: '赎回总额',
      dataIndex: 'price2',
      width: '15%',
      render: (val) => formatAmount(val),
    },
  ]

  const columns2: ProColumns<any>[] = [
    {
      title: '费用名称',
      dataIndex: 'barCode',
      width: '12%',
    },
    {
      title: '计费方式',
      dataIndex: 'goodName',
      width: '18%',
    },
    {
      title: '剩余代垫资金',
      dataIndex: 'price1',
      width: '12%',
      render: (val) => formatAmount(val),
    },
    {
      title: '计息开始日',
      dataIndex: 'count',
      width: '12%',
      valueType: 'date',
    },
    {
      title: '计息截止日',
      dataIndex: 'count2',
      width: '12%',
      valueType: 'date',
    },
    {
      title: '计息天数',
      dataIndex: 'count',
      width: '10%',
      valueType: 'digit',
    },
    {
      title: '费用利率',
      dataIndex: 'amount',
      width: '12%',
    },
    {
      title: '费用金额',
      dataIndex: 'price2',
      width: '12%',
      render: (val) => formatAmount(val),
    },
  ]

  useImperativeHandle(ref, () => ({
    // 暴露给父组件的方法
    getBusinessData: async () => {
      try {
        const businessData: any[] = []
        return {
          businessData,
        }
      } catch (error) {
        return ''
      }
    },
  }))

  return (
    <div className={styles.box}>
      {listData.map((item) => (
        <div className={styles.listitem} key={item.id}>
          <div style={{ margin: '12px 0' }}>
            <span>融资订单号:</span>
            <span style={{ marginLeft: 5, marginRight: 10 }}>{item.order};</span>
            <span>融资起止日期:</span>
            <span style={{ marginLeft: 5, marginRight: 10 }}>{item.time};</span>
            <span>货物所在仓库:</span>
            <span style={{ marginLeft: 5, marginRight: 10 }}>{item.name};</span>
          </div>
          <SimpleProtable rowKey="id" columns={columns} dataSource={item.tables || []} />
          <div className={styles.total} style={{ marginBottom: 15 }}>
            <span className={styles.spaceitem} />
            <span className={`${styles.totaltitle} ${styles.totalitem}`}>小计</span>
            <span className={styles.totalitem}>3000</span>
            <span className={styles.totalitem}>400000</span>
          </div>
          <SimpleProtable rowKey="id" columns={columns2} dataSource={item.tables || []} />
          <div className={styles.total}>
            <span className={styles.spaceitem2} />
            <span className={`${styles.totaltitle} ${styles.totalitem}`}>小计</span>
            <span className={styles.totalitem2}>3000</span>
            <span className={styles.totalitem2}>400000</span>
          </div>
        </div>
      ))}
      <ComCard title="采购信息" style={{ marginTop: 12 }}>
        <Descriptions>
          <DescriptionsItem label="还款日期">{infoData.sellProduct}</DescriptionsItem>
          <DescriptionsItem label="还款总金额">
            {formatAmount(infoData.sellProduct)}
          </DescriptionsItem>
          <DescriptionsItem label="偿还代垫资金">{infoData.enterpriseDebt}</DescriptionsItem>
          <DescriptionsItem label="偿还代理服务费">{infoData.enterpriseDebt}</DescriptionsItem>
          <DescriptionsItem label="还款凭证水单">{infoData.enterpriseDebt}</DescriptionsItem>
          <DescriptionsItem label="申请订单编号">{infoData.enterpriseDebt}</DescriptionsItem>
          <DescriptionsItem label="审核状态">{infoData.enterpriseDebt}</DescriptionsItem>
        </Descriptions>
      </ComCard>
    </div>
  )
}

export default forwardRef(StepOne)
