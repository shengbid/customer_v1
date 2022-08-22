import React, { useRef, useState } from 'react'
import MenuProTable from '@/components/ComProtable/MenuProTable'
import type { ProColumns, ActionType } from '@ant-design/pro-table'
import { getDictList } from '@/services'
import { Typography, Button } from 'antd'
import { history } from 'umi'
import DictSelect from '@/components/ComSelect'
import { formatAmount } from '@/utils/base'

const { Link } = Typography

// 还款管理
const Repayment: React.FC = () => {
  const [statusData, setStatusData] = useState<any>()
  const actionRef = useRef<ActionType>()

  const columns: ProColumns<any>[] = [
    {
      title: '申请订单编号',
      dataIndex: 'processNo',
      width: '13%',
    },
    {
      title: '偿还代垫资金',
      dataIndex: 'processNo',
      width: '13%',
      hideInSearch: true,
      render: (val) => formatAmount(val),
    },
    {
      title: '偿还费用',
      dataIndex: 'processNo',
      width: '13%',
      hideInSearch: true,
      render: (val) => formatAmount(val),
    },
    {
      title: '还款总额',
      dataIndex: 'processNo',
      width: '13%',
      hideInSearch: true,
      render: (val) => formatAmount(val),
    },
    {
      title: '还款日期',
      dataIndex: 'processNo',
      width: '13%',
      hideInSearch: true,
    },
    {
      title: '还款日期范围',
      dataIndex: 'processNo',
      hideInTable: true,
      valueType: 'dateRange',
      search: {
        transform: (value: any) => ({ beginTime: value[0], endTime: value[1] }),
      },
    },
    {
      title: '申请时间',
      dataIndex: 'processNo',
      width: '13%',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'processNo',
      hideInSearch: true,
      render: (_, recored) => <>{statusData[recored.status]}</>,
    },
    {
      title: '状态',
      key: 'auditStatus',
      dataIndex: 'auditStatus',
      hideInTable: true,
      renderFormItem: (_, { type }) => {
        if (type === 'form') {
          return null
        }
        return <DictSelect authorword="cus_shzt" getDictData={setStatusData} />
      },
    },
    {
      title: '操作',
      width: 100,
      key: 'option',
      valueType: 'option',
      render: (_, recored) => [
        <Link
          key="detail"
          onClick={() => {
            history.push({
              pathname: '/assets/create/form',
              query: {
                id: String(recored.dictId),
              },
            })
          }}
        >
          详情
        </Link>,
      ],
    },
  ]

  const getList = async (param: any) => {
    // console.log(param)
    const { rows, total } = await getDictList(param)
    return {
      data: rows,
      total,
    }
  }

  const apply = (type: number) => {
    history.push({
      pathname: '/repayment/create/form',
      query: {
        type: String(type),
      },
    })
  }

  return (
    <>
      <MenuProTable<any>
        rowKey="dictId"
        request={getList}
        columns={columns}
        actionRef={actionRef}
        toolBarRender={() => [
          <Button type="primary" key="order" onClick={() => apply(1)}>
            选择融资订单还款
          </Button>,
          <Button type="primary" key="cargo" onClick={() => apply(2)}>
            选择货物还款
          </Button>,
        ]}
      />
    </>
  )
}

export default Repayment
