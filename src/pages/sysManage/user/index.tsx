import React, { useState, useRef } from 'react'
import MenuProTable from '@/components/ComProtable/MenuProTable'
import type { userProps, userParamProps } from '@/services/types'
import type { ProColumns, ActionType } from '@ant-design/pro-table'
import { Switch, Popconfirm, message } from 'antd'
import { getUserList, deleteUser, changeUserStatus } from '@/services'
import DictSelect from '@/components/ComSelect'
import ImportFile from '@/components/ComUpload/importFile'
import ExportFile from '@/components/ComUpload/exportFile'
import AddModal from './components/addModal'
import ResetPass from './components/resetPass'
import PermissionButton from '@/components/Permission'
import { KeyOutlined } from '@ant-design/icons'

const { MenuAddButton, MenuMultiDelButton, MenuEditButton, MenuDelteButton } = MenuProTable

const UserManage: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [passVisible, setPassVisible] = useState<boolean>(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [id, setId] = useState<any>()

  const actionRef = useRef<ActionType>()
  // 改变状态
  const changeStatus = async (data: { status: string; userId: number }) => {
    await changeUserStatus(data)
    message.success('修改成功')
    actionRef.current?.reload()
  }

  // 删除用户
  const delteUser = async (ids: number | string) => {
    await deleteUser(ids)
    message.success('删除成功')
    actionRef.current?.reload()
  }

  const columns: ProColumns<userProps>[] = [
    {
      title: '序号',
      valueType: 'index',
    },
    {
      title: '用户名称',
      key: 'userName',
      dataIndex: 'userName',
    },
    {
      title: '部门',
      key: 'dept',
      hideInSearch: true,
      dataIndex: 'dept',
      render: (val, recored) => <>{recored.dept ? recored.dept.deptName : '-'}</>,
    },
    {
      title: '手机号码',
      key: 'phonenumber',
      dataIndex: 'phonenumber',
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
          title={`确定要${val === '0' ? '停用' : '启用'}${recored.userName}用户?`}
          onConfirm={() =>
            changeStatus({ status: val === '0' ? '1' : '0', userId: recored.userId })
          }
        >
          <Switch checked={val === '0'} defaultChecked={val === '0'} />
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
      width: 210,
      key: 'option',
      valueType: 'option',
      render: (_, recored) => [
        <MenuEditButton
          authorWord="system:user:edit"
          key="edit"
          onClick={() => {
            setId(recored.userId)
            setModalVisible(true)
          }}
        />,
        <MenuDelteButton
          authorWord="system:user:remove"
          onClick={() => delteUser(recored.userId)}
          key="delete"
        />,
        <PermissionButton
          authorWord="system:user:resetPwd"
          onClick={() => {
            setId(recored.userId)
            setPassVisible(true)
          }}
          key="reset"
          type="link"
        >
          <KeyOutlined />
          重置密码
        </PermissionButton>,
      ],
    },
  ]

  const getList = async (param: userParamProps) => {
    const { rows, total } = await getUserList(param)
    return {
      data: rows,
      total,
    }
  }

  // 批量删除
  const multipleDelete = async () => {
    if (selectedRowKeys.length) {
      await deleteUser(selectedRowKeys.join(','))
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

  // 导入成功
  const handleSuccess = () => {
    actionRef?.current?.reload()
  }

  return (
    <>
      <MenuProTable<userProps>
        request={getList}
        rowKey="userId"
        actionRef={actionRef}
        columns={columns}
        headerTitle={
          <MenuAddButton
            authorWord="system:user:add"
            onClick={() => {
              setId(null)
              setModalVisible(true)
            }}
          />
        }
        toolBarRender={() => [
          <ImportFile
            authorWord="system:user:import"
            key="import"
            url="user"
            title="用户"
            handleSuccess={handleSuccess}
          />,
          <ExportFile authorWord="system:user:export" key="export" title="用户" url="user" />,
          <MenuMultiDelButton
            authorWord="system:user:remove"
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

      <ResetPass
        modalVisible={passVisible}
        handleSubmit={() => {
          setPassVisible(false)
          actionRef?.current?.reload()
        }}
        info={id}
        handleCancel={() => setPassVisible(false)}
      />
    </>
  )
}

export default UserManage
