import React, { useState, useRef } from 'react'
import MenuProTable from '@/components/ComProtable/MenuProTable'
import type { userProps, userParamProps } from '@/services/types'
import type { ProColumns, ActionType } from '@ant-design/pro-table'
import { Switch, Popconfirm, message } from 'antd'
import { getUserList, deleteUser, changeUserStatus } from '@/services'
import DictSelect from '@/components/ComSelect'
// import ImportFile from '@/components/ComUpload/importFile'
// import ExportFile from '@/components/ComUpload/exportFile'
import AddModal from './components/addModal'
import ResetPass from './components/resetPass'
import PermissionButton from '@/components/Permission'
import { KeyOutlined } from '@ant-design/icons'
import { useIntl } from 'umi'

const { MenuAddButton, MenuEditButton, MenuDelteButton } = MenuProTable

const UserManage: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [passVisible, setPassVisible] = useState<boolean>(false)
  // const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [id, setId] = useState<any>()
  const intl = useIntl()
  const actionRef = useRef<ActionType>()
  // 改变状态
  const changeStatus = async (data: { status: string; userId: number }) => {
    await changeUserStatus(data)
    message.success(
      intl.formatMessage({
        id: 'pages.form.edit',
      }),
    )
    actionRef.current?.reload()
  }

  // 删除用户
  const delteUser = async (ids: number | string) => {
    await deleteUser(ids)
    message.success(
      intl.formatMessage({
        id: 'pages.form.delete',
      }),
    )
    actionRef.current?.reload()
  }

  const columns: ProColumns<userProps>[] = [
    // {
    //   title: intl.formatMessage({
    //     id: 'pages.table.index',
    //   }),
    //   valueType: 'index',
    // },
    {
      title: intl.formatMessage({
        id: 'sys.user.userName',
      }),
      key: 'userName',
      dataIndex: 'userName',
    },
    {
      title: intl.formatMessage({
        id: 'sys.user.dept',
      }),
      key: 'dept',
      hideInSearch: true,
      dataIndex: 'dept',
      render: (val, recored) => <>{recored.dept ? recored.dept.deptName : '-'}</>,
    },
    {
      title: intl.formatMessage({
        id: 'sys.user.phonenumber',
      }),
      key: 'phonenumber',
      dataIndex: 'phonenumber',
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
      hideInSearch: true,
      render: (val, recored) => (
        <Popconfirm
          title={`${intl.formatMessage({
            id: 'pages.table.confirm',
          })}${
            val === '0'
              ? intl.formatMessage({
                  id: 'pages.table.off',
                })
              : intl.formatMessage({
                  id: 'pages.table.on',
                })
          }${recored.userName}${intl.formatMessage({
            id: 'sys.user.user',
          })}?`}
          onConfirm={() =>
            changeStatus({ status: val === '0' ? '1' : '0', userId: recored.userId })
          }
        >
          <Switch checked={val === '0'} defaultChecked={val === '0'} />
        </Popconfirm>
      ),
    },
    {
      title: intl.formatMessage({
        id: 'sys.base.createTime',
      }),
      key: 'createTime',
      dataIndex: 'createTime',
      hideInSearch: true,
      width: 170,
      valueType: 'dateTime',
    },
    {
      title: intl.formatMessage({
        id: 'sys.base.createTime',
      }),
      hideInTable: true,
      dataIndex: 'createTime',
      valueType: 'dateRange',
      search: {
        transform: (value: any) => ({ beginTime: value[0], endTime: value[1] }),
      },
    },
    {
      title: intl.formatMessage({
        id: 'pages.table.option',
      }),
      width: 210,
      key: 'option',
      valueType: 'option',
      render: (_, recored) => [
        <MenuEditButton
          authorword="system:user:edit"
          key="edit"
          onClick={() => {
            setId(recored.userId)
            setModalVisible(true)
          }}
        />,
        <MenuDelteButton
          authorword="system:user:remove"
          onClick={() => delteUser(recored.userId)}
          key="delete"
        />,
        <PermissionButton
          authorword="system:user:resetPwd"
          onClick={() => {
            setId(recored.userId)
            setPassVisible(true)
          }}
          key="reset"
          type="link"
        >
          <KeyOutlined />
          {intl.formatMessage({
            id: 'sys.user.resetPass',
          })}
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
  // const multipleDelete = async () => {
  //   if (selectedRowKeys.length) {
  //     await deleteUser(selectedRowKeys.join(','))
  //     message.success(
  //       intl.formatMessage({
  //         id: 'pages.form.delete',
  //       }),
  //     )
  //     actionRef.current?.reload()
  //     setSelectedRowKeys([])
  //   } else {
  //     message.warning(
  //       intl.formatMessage({
  //         id: 'pages.table.oneDataDelete',
  //       }),
  //     )
  //   }
  // }

  // 新增
  const submit = () => {
    setModalVisible(false)
    actionRef?.current?.reload()
  }

  // 导入成功
  // const handleSuccess = () => {
  //   actionRef?.current?.reload()
  // }

  return (
    <>
      <MenuProTable<userProps>
        request={getList}
        rowKey="userId"
        actionRef={actionRef}
        columns={columns}
        headerTitle={
          <MenuAddButton
            authorword="system:user:add"
            onClick={() => {
              setId(null)
              setModalVisible(true)
            }}
          />
        }
        toolBarRender={() => [
          // <ImportFile
          //   authorword="system:user:import"
          //   key="import"
          //   url="/system/user/importTemplate"
          //   title={intl.formatMessage({
          //     id: 'sys.user.user',
          //   })}
          //   handleSuccess={handleSuccess}
          // />,
          // <ExportFile
          //   authorword="system:user:export"
          //   key="export"
          //   title={intl.formatMessage({
          //     id: 'sys.user.user',
          //   })}
          //   url="/system/user/export"
          // />,
          // <MenuMultiDelButton
          //   authorword="system:user:remove"
          //   key="delete"
          //   onClick={multipleDelete}
          // />,
        ]}
        tableAlertRender={false}
        // rowSelection={{
        //   selectedRowKeys,
        //   onChange: (value) => {
        //     setSelectedRowKeys(value)
        //   },
        // }}
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
