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
import { useIntl } from 'umi'

const { MenuAddButton, MenuEditButton, MenuDelteButton } = MenuProTable

const Meun: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [info, setInfo] = useState<any>()
  const [addType, setAddType] = useState<string>()
  const intl = useIntl()
  const actionRef = useRef<ActionType>()

  // 删除
  const delteItem = async (id: number) => {
    await deleteMenu(id)
    message.success(
      intl.formatMessage({
        id: 'pages.form.delete',
      }),
    )
    actionRef.current?.reload()
  }

  const columns: ProColumns<menuListProps>[] = [
    {
      title: intl.formatMessage({
        id: 'sys.menu.menuName',
      }),
      key: 'menuName',
      dataIndex: 'menuName',
    },
    {
      title: intl.formatMessage({
        id: 'sys.menu.icon',
      }),
      key: 'icon',
      dataIndex: 'icon',
      width: 80,
      hideInSearch: true,
      render: (_, recored) =>
        recored.icon && Icon[recored.icon] ? React.createElement(Icon[recored.icon]) : '-',
    },
    {
      title: intl.formatMessage({
        id: 'sys.menu.orderNum',
      }),
      key: 'orderNum',
      dataIndex: 'orderNum',
      width: 60,
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({
        id: 'sys.menu.perms',
      }),
      key: 'perms',
      dataIndex: 'perms',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({
        id: 'sys.menu.path',
      }),
      key: 'path',
      dataIndex: 'path',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({
        id: 'sys.base.status',
      }),
      key: 'status',
      dataIndex: 'status',
      hideInTable: true,
      renderFormItem: (_, { type }) => {
        if (type === 'form') {
          return null
        }
        return <DictSelect authorword="sys_normal_disable" />
      },
    },
    {
      title: intl.formatMessage({
        id: 'sys.base.status',
      }),
      key: 'status',
      dataIndex: 'status',
      width: 80,
      hideInSearch: true,
      render: (val) =>
        val === '0' ? (
          <Tag color="processing">
            {intl.formatMessage({
              id: 'sys.base.normal',
            })}
          </Tag>
        ) : (
          <Tag color="error">
            {intl.formatMessage({
              id: 'sys.base.out',
            })}
          </Tag>
        ),
    },
    {
      title: intl.formatMessage({
        id: 'sys.base.createTime',
      }),
      width: 160,
      key: 'createTime',
      dataIndex: 'createTime',
      hideInSearch: true,
      valueType: 'dateTime',
    },
    {
      title: intl.formatMessage({
        id: 'pages.table.option',
      }),
      width: 210,
      key: 'option',
      valueType: 'option',
      render: (_, recored) => [
        <PermissionButton
          key="add"
          authorword="system:menu:add"
          type="link"
          onClick={() => {
            setInfo(recored.menuId)
            setAddType('add')
            setModalVisible(true)
          }}
        >
          <PlusOutlined />
          {intl.formatMessage({
            id: 'pages.btn.add',
          })}
        </PermissionButton>,
        <MenuEditButton
          key="edit"
          authorword="system:menu:edit"
          onClick={() => {
            setInfo(recored.menuId)
            setAddType('')
            setModalVisible(true)
          }}
        />,
        <MenuDelteButton
          authorword="system:menu:remove"
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
            authorword="system:menu:add"
            onClick={() => {
              setInfo(null)
              setModalVisible(true)
            }}
          />
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
