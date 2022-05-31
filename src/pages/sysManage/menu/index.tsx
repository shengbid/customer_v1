import React, { useState, useRef } from 'react'
import MenuProTable from '@/components/ComProtable/MenuProTable'
import { getMenuTreeList, deleteMenu } from '@/services'
import type { menuParamProps, menuListProps } from '@/services/types'
import DictSelect from '@/components/ComSelect'
import type { ProColumns, ActionType } from '@ant-design/pro-table'
import * as Icon from '@ant-design/icons'
import { PlusOutlined } from '@ant-design/icons'
import AddModal from './components/addModal'
import { message, Tag } from 'antd'
import PermissionButton from '@/components/Permission'

const { MenuAddButton, MenuEditButton, MenuDelteButton } = MenuProTable

const Meun: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [info, setInfo] = useState<any>()
  const [addType, setAddType] = useState<string>()

  const actionRef = useRef<ActionType>()

  // 删除
  const delteItem = async (id: number) => {
    await deleteMenu(id)
    message.success('删除成功')
    actionRef.current?.reload()
  }

  const columns: ProColumns<menuListProps>[] = [
    {
      title: '菜单名称',
      key: 'menuName',
      dataIndex: 'menuName',
    },
    {
      title: '图标',
      key: 'icon',
      dataIndex: 'icon',
      width: 80,
      hideInSearch: true,
      render: (_, recored) =>
        recored.icon && Icon[recored.icon] ? React.createElement(Icon[recored.icon]) : '-',
    },
    {
      title: '排序',
      key: 'orderNum',
      dataIndex: 'orderNum',
      width: 60,
      hideInSearch: true,
    },
    {
      title: '权限标识',
      key: 'perms',
      dataIndex: 'perms',
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
      hideInTable: true,
      renderFormItem: (_, { type }) => {
        if (type === 'form') {
          return null
        }
        return <DictSelect authorWord="sys_normal_disable" />
      },
    },
    {
      title: '状态',
      key: 'status',
      dataIndex: 'status',
      hideInSearch: true,
      render: (val) =>
        val === '0' ? <Tag color="processing">正常</Tag> : <Tag color="error">停用</Tag>,
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
      width: 210,
      key: 'option',
      valueType: 'option',
      render: (_, recored) => [
        <PermissionButton
          key="add"
          authorWord="system:menu:add"
          type="link"
          onClick={() => {
            setInfo(recored.menuId)
            setAddType('add')
            setModalVisible(true)
          }}
        >
          <PlusOutlined />
          新增
        </PermissionButton>,
        <MenuEditButton
          key="edit"
          authorWord="system:menu:edit"
          onClick={() => {
            setInfo(recored.menuId)
            setAddType('')
            setModalVisible(true)
          }}
        />,
        <MenuDelteButton
          authorWord="system:menu:remove"
          onClick={() => delteItem(recored.menuId)}
          key="delete"
        />,
      ],
    },
  ]

  const getList = async (param: menuParamProps) => {
    const { data } = await getMenuTreeList(param)
    return {
      data,
    }
  }

  // 新增
  const submit = () => {
    setModalVisible(false)
    actionRef?.current?.reload()
  }

  return (
    <>
      <MenuProTable<menuListProps>
        request={getList}
        rowKey="menuId"
        columns={columns}
        actionRef={actionRef}
        headerTitle={
          <MenuAddButton
            authorWord="system:menu:add"
            onClick={() => {
              setInfo(null)
              setModalVisible(true)
            }}
          >
            添加
          </MenuAddButton>
        }
        pagination={false}
      />
      <AddModal
        modalVisible={modalVisible}
        handleSubmit={submit}
        info={info}
        type={addType}
        handleCancel={() => {
          setModalVisible(false)
        }}
      />
    </>
  )
}

export default Meun
