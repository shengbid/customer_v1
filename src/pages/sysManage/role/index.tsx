import React, { useState, useRef } from 'react'
import MenuProTable from '@/components/ComProtable/MenuProTable'
import type { roleListProps, roleParamProps } from '@/services/types'
import type { ProColumns, ActionType } from '@ant-design/pro-table'
import { Switch, Popconfirm, message, Menu, Dropdown } from 'antd'
import { DownOutlined, UserOutlined, SecurityScanOutlined } from '@ant-design/icons'
import { getRoleList, deleteRole, changeRoleStatus } from '@/services'
// import ExportFile from '@/components/ComUpload/exportFile'
import DictSelect from '@/components/ComSelect'
import AddModal from './components/addModal'
import { useIntl, history } from 'umi'
import DataModal from './components/addData'

const { MenuAddButton, MenuEditButton, MenuDelteButton } = MenuProTable

const RoleManage: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [dataVisible, setDataVisible] = useState<boolean>(false)
  // const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [id, setId] = useState<any>()
  // const [params, setParams] = useState<roleParamProps>()
  const intl = useIntl()
  const actionRef = useRef<ActionType>()

  // 改变状态
  const changeStatus = async (data: { status: string; roleId: number }) => {
    await changeRoleStatus(data)
    message.success(
      intl.formatMessage({
        id: 'pages.form.edit',
      }),
    )
    actionRef.current?.reload()
  }

  // 删除用户
  const delteRecored = async (ids: number | string) => {
    await deleteRole(ids)
    message.success(
      intl.formatMessage({
        id: 'pages.form.delete',
      }),
    )
    actionRef.current?.reload()
  }

  const menu = (recored: roleListProps) => (
    <Menu
      items={[
        {
          key: '2',
          label: (
            <MenuDelteButton
              authorword="system:role:remove"
              onClick={() => delteRecored(recored.roleId)}
              key="delete"
            />
          ),
        },
        {
          key: '3',
          label: (
            <a
              onClick={() => {
                history.push(`/sys/role/user`)
              }}
            >
              <UserOutlined style={{ marginRight: 3 }} />
              {intl.formatMessage({
                id: 'sys.user.user',
              })}
            </a>
          ),
        },
      ]}
    />
  )

  const columns: ProColumns<roleListProps>[] = [
    // {
    //   title: intl.formatMessage({
    //     id: 'pages.table.index',
    //   }),
    //   valueType: 'index',
    // },
    {
      title: intl.formatMessage({
        id: 'sys.role.roleName',
      }),
      key: 'roleName',
      dataIndex: 'roleName',
    },
    {
      title: intl.formatMessage({
        id: 'sys.role.roleKey',
      }),
      key: 'roleKey',
      dataIndex: 'roleKey',
    },
    {
      title: intl.formatMessage({
        id: 'sys.menu.orderNum1',
      }),
      key: 'roleSort',
      hideInSearch: true,
      dataIndex: 'roleSort',
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
          key=""
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
          }${recored.roleName}${intl.formatMessage({
            id: 'sys.role.role',
          })}?`}
          onConfirm={() =>
            changeStatus({ status: val === '0' ? '1' : '0', roleId: recored.roleId })
          }
        >
          <Switch checked={val === '0'} />
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
      width: 200,
      key: 'option',
      valueType: 'option',
      render: (_, recored) => [
        <MenuEditButton
          key="edit"
          authorword="system:role:edit"
          onClick={() => {
            setId(recored.roleId)
            setModalVisible(true)
          }}
        />,
        <a
          key="perm"
          onClick={() => {
            setDataVisible(true)
            setId(recored.roleId)
          }}
        >
          <SecurityScanOutlined style={{ marginRight: 3 }} />
          {intl.formatMessage({
            id: 'sys.role.dataPerm',
          })}
        </a>,
        <Dropdown key="user" overlay={() => menu(recored)}>
          <a onClick={(e) => e.preventDefault()}>
            {intl.formatMessage({
              id: 'pages.btn.more',
            })}
            <DownOutlined />
          </a>
        </Dropdown>,
      ],
    },
  ]

  const getList = async (param: roleParamProps) => {
    // console.log(param)
    // setParams(param)
    const { rows, total } = await getRoleList(param)
    return {
      data: rows,
      total,
    }
  }

  // 批量删除
  // const multipleDelete = async () => {
  //   console.log(selectedRowKeys)
  //   if (selectedRowKeys.length) {
  //     await deleteRole(selectedRowKeys.join(','))
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
  // 新增权限
  const submitData = () => {
    setDataVisible(false)
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
            authorword="system:role:add"
            onClick={() => {
              setId(null)
              setModalVisible(true)
            }}
          />
        }
        // toolBarRender={() => [
        //   <ExportFile
        //     authorword="system:role:export"
        //     key="export"
        //     params={params}
        //     title={intl.formatMessage({
        //       id: 'sys.role.role',
        //     })}
        //     url="/system/role/export"
        //   />,
        //   <MenuMultiDelButton
        //     authorword="system:role:remove"
        //     key="delete"
        //     onClick={multipleDelete}
        //   />,
        // ]}
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
      <DataModal
        modalVisible={dataVisible}
        handleSubmit={submitData}
        info={id}
        handleCancel={() => setDataVisible(false)}
      />
    </>
  )
}

export default RoleManage
