import React, { useState, useEffect } from 'react'
import type { ProColumns } from '@ant-design/pro-table'
import ProTable from '@ant-design/pro-table'
import { Button } from 'antd'

type FinanceItem = {
  orderId: string
  productName: string
  moneyAmount: string[]
  limit: number
  period: string
  financeStatus: string
  overdueStatus: string
  applyDate: string
  action: string[]
}

// 我的融资
const MyFinance: React.FC = () => {
  const [columns, setColumns] = useState<ProColumns<FinanceItem>[]>([])
  useEffect(() => {
    const col: ProColumns<FinanceItem>[] = [
      {
        title: '融资订单编号',
        dataIndex: 'orderId',
      },
      {
        title: () => {
          return (
            <span>
              申请代垫资金
              <br />
              批复代垫资金 <br />
              剩余应还代垫本金
            </span>
          )
        },
        dataIndex: 'moneyAmount',
        hideInSearch: true,
        render: (_, record) => {
          const { moneyAmount = [] } = record
          return moneyAmount.map((o) => {
            return (
              <>
                <span key={o}>{o}</span>
                <br />
              </>
            )
          })
        },
      },
      {
        title: '金融产品',
        dataIndex: 'productName',
        order: 1,
      },
      {
        title: '垫资期限',
        dataIndex: 'limit',
        hideInSearch: true,
      },
      {
        title: '融资起止时间',
        dataIndex: 'period',
        valueType: 'dateRange',
        hideInTable: true,
      },
      {
        title: '融资起止时间',
        dataIndex: 'period',
        hideInSearch: true,
      },
      {
        title: '融资状态',
        dataIndex: 'financeStatus',
        valueType: 'select',

        valueEnum: {
          auditin: {
            text: '审核中',
            status: '',
          },
          auditreject: {
            text: '审核拒绝',
            status: '',
          },
          topayover: {
            text: '待结清',
            status: '',
          },
          payover: {
            text: '已结清',
            status: '',
          },
        },
      },
      {
        title: '逾期状态',
        dataIndex: 'overdueStatus',
        valueType: 'select',
        valueEnum: {
          overdue: {
            text: '已逾期',
            status: 'overdue',
          },
          overtime: {
            text: '宽限期',
            status: 'overtime',
          },
          normal: {
            text: '正常',
            status: 'normal',
          },
        },
      },
      {
        title: '申请时间',
        dataIndex: 'applyDate',
        hideInSearch: true,
      },
      {
        title: '操作',
        hideInSearch: true,
        dataIndex: 'action',
        width: '13%',
        render: (_, record) => {
          const { action = [] } = record
          return action.map((a) => {
            return (
              <Button key={a} size={'small'} type={'link'}>
                {a}
              </Button>
            )
          })
        },
      },
    ]
    setColumns(col)
  }, [])
  const loadData = async (params, sort, filter) => {
    console.log('params==', params, 'sort==', sort, 'filter==', filter)
    const ret: FinanceItem[] = []
    for (let index = 0; index < 10; index++) {
      const o: FinanceItem = {
        orderId: 'RZ2022XXX',
        productName: 'B2B质押',
        moneyAmount: ['$200000', '$300000', '$4000000'],
        limit: index + 20,
        period: '2022-08-08 2023-08-09',
        financeStatus: '审核中',
        overdueStatus: '正常',
        applyDate: '2022-08-09 09:00:10',
        action: ['详情', '去处理'],
      }
      ret.push(o)
    }
    return Promise.resolve({
      data: ret,
      success: true,
    })
  }
  return (
    <ProTable<FinanceItem>
      columns={columns}
      cardBordered
      search={{ labelWidth: 'auto' }}
      request={loadData}
    />
  )
}

export default MyFinance
