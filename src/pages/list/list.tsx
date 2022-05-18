import React from 'react'
import type { ProColumns } from '@ant-design/pro-table'
import { Button } from 'antd'
import MenuProTable from '@/components/ComProtable/MenuProTable'

type DataSourceType = {
  id: React.Key
  title?: string
  decs?: string
  state?: string
  created_at?: string
  update_at?: string
  children?: DataSourceType[]
}

const defaultData: DataSourceType[] = [
  {
    id: '624748504',
    title: '活动名称一',
    decs: '这个活动真好玩',
    state: 'open',
    created_at: '2020-05-26T09:42:56Z',
    update_at: '2020-05-26T09:42:56Z',
  },
  {
    id: '624691229',
    title: '活动名称二',
    decs: '这个活动真好玩',
    state: 'closed',
    created_at: '2020-05-26T08:19:22Z',
    update_at: '2020-05-26T08:19:22Z',
  },
]

export default () => {
  const columns: ProColumns<DataSourceType>[] = [
    {
      title: '活动名称',
      dataIndex: 'title',
      formItemProps: () => {
        return {
          rules: [{ required: true, message: '此项为必填项' }],
        }
      },
      width: '30%',
    },
    {
      title: '状态',
      key: 'state',
      dataIndex: 'state',
      valueType: 'select',
      valueEnum: {
        all: { text: '全部', status: 'Default' },
        open: {
          text: '未解决',
          status: 'Error',
        },
        closed: {
          text: '已解决',
          status: 'Success',
        },
      },
    },
    {
      title: '描述',
      dataIndex: 'decs',
    },
    {
      title: '活动时间',
      dataIndex: 'created_at',
      valueType: 'date',
    },
    {
      title: '操作',
      valueType: 'option',
      width: 200,
      render: () => [<a key="detail">详情</a>, <a key="delete">删除</a>],
    },
  ]

  // 获取列表数据
  const getList = (params) => {
    console.log(params)
    return {
      total: 10,
      data: defaultData,
    }
  }

  return (
    <MenuProTable<DataSourceType>
      rowKey="id"
      scroll={{
        x: 960,
      }}
      headerTitle="表格"
      toolBarRender={() => [
        <Button type="primary" key="rows">
          新增
        </Button>,
      ]}
      columns={columns}
      request={getList}
    />
  )
}
