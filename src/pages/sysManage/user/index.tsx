import React, { useState } from 'react'
import MenuProTable from '@/components/ComProtable/MenuProTable'
import type { userProps } from '@/services/types'
import { Button } from 'antd'
import AddModal from './components/addModal'

const UserManage: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  const columns: any = [
    {
      title: '序号',
      valueType: 'sort',
    },
    {
      title: '用户名称',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: '部门',
      key: 'dept',
      dataIndex: 'dept',
    },
    {
      title: '手机号码',
      key: 'phone',
      dataIndex: 'phone',
    },
    {
      title: '状态',
      key: 'status',
      dataIndex: 'status',
      initialValue: 'all',
      valueEnum: {
        all: { text: '全部', status: 'Default' },
        success: { text: '正常', status: 'Processing' },
        error: { text: '停用', status: 'Error' },
      },
    },
    {
      title: '创建时间',
      key: 'createTime',
      dataIndex: 'createTime',
      hideInSearch: true,
      valueType: 'dateTime',
    },
    {
      title: '创建时间',
      hideInTable: true,
      valueType: 'dateRange',
    },
    {
      title: '操作',
      width: 150,
      key: 'option',
      valueType: 'option',
      render: () => [<a key="link">修改</a>, <a key="link2">删除</a>],
    },
  ]
  const defaultdata = [
    {
      id: 1,
      name: 'admin',
      dept: '研发部门',
      phone: 13589663366,
      status: 'success',
      createTime: '2022-05-18 11:13',
    },
    {
      id: 2,
      name: 'admin',
      dept: '研发部门',
      phone: 13589663366,
      status: 'success',
      createTime: '2022-05-18 11:13',
    },
  ]

  const getList = async (param: userProps) => {
    console.log(param)
    return {
      data: defaultdata,
      total: 15,
    }
  }

  // 批量删除
  const multipleDelete = () => {
    console.log(selectedRowKeys)
  }

  // 新增
  const submit = (data: any) => {
    console.log(data)
    setModalVisible(false)
  }

  return (
    <>
      <MenuProTable
        request={getList}
        rowKey="id"
        columns={columns}
        headerTitle={
          <Button
            key="primary"
            type="primary"
            onClick={() => {
              setModalVisible(true)
            }}
          >
            添加
          </Button>
        }
        toolBarRender={() => [
          <Button key="delete" onClick={multipleDelete}>
            批量删除
          </Button>,
        ]}
        tableAlertRender={false}
        rowSelection={{
          selectedRowKeys,
          onChange: (value) => {
            setSelectedRowKeys(value)
          },
        }}
      />

      <AddModal
        modalVisible={modalVisible}
        handleSubmit={submit}
        handleCancel={() => setModalVisible(false)}
      />
    </>
  )
}

export default UserManage
