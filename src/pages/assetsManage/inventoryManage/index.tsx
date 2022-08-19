import React, { useRef, useState } from 'react'
import MenuProTable from '@/components/ComProtable/MenuProTable'
import type { ProColumns, ActionType } from '@ant-design/pro-table'
import { getDictList } from '@/services'
import { Typography } from 'antd'
import { history } from 'umi'
import DictSelect from '@/components/ComSelect'

const { Link } = Typography

// 库存质押
const Inventory: React.FC = () => {
  const [statusData, setStatusData] = useState<any>()
  const actionRef = useRef<ActionType>()

  const columns: ProColumns<any>[] = [
    {
      title: '质押申请编号',
      dataIndex: 'processNo',
      width: 150,
    },
    {
      title: '所属仓库',
      dataIndex: 'processNo',
      width: '14%',
      hideInSearch: true,
    },
    {
      title: '质押类型',
      dataIndex: 'processNo',
      width: 150,
      hideInSearch: true,
    },
    {
      title: '质押商品数',
      dataIndex: 'processNo',
      width: '10%',
      hideInSearch: true,
    },
    {
      title: '未质押商品数',
      dataIndex: 'processNo',
      width: '12%',
      hideInSearch: true,
    },
    {
      title: '发起时间',
      dataIndex: 'processNo',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'processNo',
      hideInSearch: true,
      render: (_, recored) => <>{statusData[recored.status]}</>,
    },
    {
      title: '审核状态',
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

  return (
    <>
      <MenuProTable<any>
        rowKey="dictId"
        request={getList}
        columns={columns}
        actionRef={actionRef}
      />
    </>
  )
}

export default Inventory
