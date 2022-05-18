import React, { useState } from 'react'
import MenuProTable from '@/components/ComProtable/MenuProTable'
import { getMenuList } from '@/services'
import type { menuProps } from '@/services/types'
import { Button } from 'antd'
import AddModal from './components/addModal'

const Meun: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false)

  const columns: any[] = [
    {
      title: '菜单名称',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: '图标',
      key: 'icon',
      dataIndex: 'icon',
      hideInSearch: true,
    },
    {
      title: '排序',
      key: 'sort',
      dataIndex: 'sort',
      hideInSearch: true,
    },
    {
      title: '权限标识',
      key: 'access',
      dataIndex: 'access',
      hideInSearch: true,
    },
    {
      title: '组件路径',
      key: 'path',
      dataIndex: 'path',
      hideInSearch: true,
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
      title: '操作',
      width: 150,
      key: 'option',
      valueType: 'option',
      render: () => [<a key="link">修改</a>, <a key="link2">删除</a>],
    },
  ]

  const getList = async (param: menuProps) => {
    const { data } = await getMenuList(param)
    return {
      data,
    }
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
        pagination={false}
      />
      <AddModal
        modalVisible={modalVisible}
        handleSubmit={submit}
        handleCancel={() => setModalVisible(false)}
      />
    </>
  )
}

export default Meun
