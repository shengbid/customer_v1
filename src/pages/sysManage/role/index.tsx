import React, { useState, useRef } from 'react'
import MenuProTable from '@/components/ComProtable/MenuProTable'
import type { roleListProps, roleParamProps } from '@/services/types'
import type { ProColumns, ActionType } from '@ant-design/pro-table'
import { Switch, Popconfirm, message } from 'antd'
import { getRoleList, deleteRole, changeRoleStatus } from '@/services'
import ExportFile from '@/components/ComUpload/exportFile'
import DictSelect from '@/components/ComSelect'
import AddModal from './components/addModal'

const { MenuAddButton, MenuMultiDelButton, MenuEditButton, MenuDelteButton } = MenuProTable

const RoleManage: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [id, setId] = useState<any>()
  const [params, setParams] = useState<roleParamProps>()

  const actionRef = useRef<ActionType>()

  // 改变状态
  const changeStatus = async (data: { status: string; roleId: number }) => {
    await changeRoleStatus(data)
    message.success('修改成功')
    actionRef.current?.reload()
  }

  // 删除用户
  const delteRecored = async (ids: number | string) => {
    await deleteRole(ids)
    message.success('删除成功')
    actionRef.current?.reload()
  }

  const columns: ProColumns<roleListProps>[] = [
    {
      title: '序号',
      valueType: 'index',
    },
    {
      title: '角色名称',
      key: 'roleName',
      dataIndex: 'roleName',
    },
    {
      title: '权限字符',
      key: 'roleKey',
      dataIndex: 'roleKey',
    },
    {
      title: '显示顺序',
      key: 'roleSort',
      hideInSearch: true,
      dataIndex: 'roleSort',
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
      render: (val, recored) => (
        <Popconfirm
          key=""
          title={`确定要${val === '0' ? '停用' : '启用'}${recored.roleName}角色?`}
          onConfirm={() =>
            changeStatus({ status: val === '0' ? '1' : '0', roleId: recored.roleId })
          }
        >
          <Switch checked={val === '0'} />
        </Popconfirm>
      ),
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
      dataIndex: 'createTime',
      valueType: 'dateRange',
      search: {
        transform: (value: any) => ({ beginTime: value[0], endTime: value[1] }),
      },
    },
    {
      title: '操作',
      width: 150,
      key: 'option',
      valueType: 'option',
      render: (_, recored) => [
        <MenuEditButton
          key="edit"
          authorWord="system:role:edit"
          onClick={() => {
            setId(recored.roleId)
            setModalVisible(true)
          }}
        />,
        <MenuDelteButton
          authorWord="system:role:remove"
          onClick={() => delteRecored(recored.roleId)}
          key="delete"
        />,
      ],
    },
  ]

  const getList = async (param: roleParamProps) => {
    // console.log(param)
    setParams(param)
    const { rows, total } = await getRoleList(param)
    return {
      data: rows,
      total,
    }
  }

  // 批量删除
  const multipleDelete = async () => {
    console.log(selectedRowKeys)
    if (selectedRowKeys.length) {
      await deleteRole(selectedRowKeys.join(','))
      message.success('删除成功')
      actionRef.current?.reload()
      setSelectedRowKeys([])
    } else {
      message.warning('请先选择要删除的数据!')
    }
  }

  // 新增
  const submit = () => {
    setModalVisible(false)
    actionRef?.current?.reload()
  }

  return (
    <>
      <MenuProTable<roleListProps>
        request={getList}
        rowKey="roleId"
        columns={columns}
        actionRef={actionRef}
        headerTitle={
          <MenuAddButton
            authorWord="system:role:add"
            onClick={() => {
              setId(null)
              setModalVisible(true)
            }}
          />
        }
        toolBarRender={() => [
          <ExportFile
            authorWord="system:role:export"
            key="export"
            params={params}
            title="角色"
            url="role"
          />,
          <MenuMultiDelButton
            authorWord="system:role:remove"
            key="delete"
            onClick={multipleDelete}
          />,
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
        info={id}
        handleCancel={() => setModalVisible(false)}
      />
    </>
  )
}

export default RoleManage
