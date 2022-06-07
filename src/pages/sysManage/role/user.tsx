import React, { useRef } from 'react'
import MenuProTable from '@/components/ComProtable/MenuProTable'
import type { roleListProps, roleParamProps } from '@/services/types'
import type { ProColumns, ActionType } from '@ant-design/pro-table'
import { /*message,*/ Tag, Button } from 'antd'
import { /*cancelAuthor,*/ getRoleUserList } from '@/services'
import { ArrowLeftOutlined /**CloseCircleOutlined**/ } from '@ant-design/icons'
import { history, useIntl } from 'umi'
// import PermissionButton from '@/components/Permission'

const RoleManage: React.FC = (props: any) => {
  const intl = useIntl()
  const { roleId } = props.location.query

  const actionRef = useRef<ActionType>()

  // 取消授权
  // const delteRecored = async (ids: number | string) => {
  //   await cancelAuthor({ roleId, userId: ids })
  //   message.success(
  //     intl.formatMessage({
  //       id: 'pages.form.delete',
  //     }),
  //   )
  //   actionRef.current?.reload()
  // }

  const columns: ProColumns<roleListProps>[] = [
    {
      title: intl.formatMessage({
        id: 'sys.user.userName',
      }),
      key: 'userName',
      dataIndex: 'userName',
    },
    {
      title: intl.formatMessage({
        id: 'sys.user.nickName',
      }),
      key: 'nickName',
      dataIndex: 'nickName',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({
        id: 'sys.user.email',
      }),
      key: 'email',
      dataIndex: 'email',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({
        id: 'sys.user.phonenumber',
      }),
      key: 'phonenumber',
      dataIndex: 'phonenumber',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({
        id: 'sys.base.status',
      }),
      key: 'status',
      dataIndex: 'status',
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
      key: 'createTime',
      dataIndex: 'createTime',
      hideInSearch: true,
      width: 170,
      valueType: 'dateTime',
    },
    // {
    //   title: intl.formatMessage({
    //     id: 'pages.table.option',
    //   }),
    //   width: 100,
    //   key: 'option',
    //   valueType: 'option',
    //   render: (_, recored) => [
    //     <PermissionButton
    //       authorword="system:role:remove"
    //       onClick={() => delteRecored(recored.userId)}
    //       key="delete"
    //       type="link"
    //     >
    //       <CloseCircleOutlined style={{ marginRight: 3 }} />
    //       {intl.formatMessage({
    //         id: 'sys.role.cancelperms',
    //       })}
    //     </PermissionButton>,
    //   ],
    // },
  ]

  const getList = async (param: roleParamProps) => {
    // console.log(param)
    const { rows, total } = await getRoleUserList({ ...param, roleId })
    return {
      data: rows,
      total,
    }
  }

  // 批量取消
  // const multipleDelete = async () => {
  //   if (selectedRowKeys.length) {
  //     await cancelAuthor({ roleId, userId: selectedRowKeys.join(',') })
  //     message.success(
  //       intl.formatMessage({
  //         id: 'pages.form.success',
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

  return (
    <>
      <MenuProTable<roleListProps>
        request={getList}
        rowKey="userId"
        columns={columns}
        actionRef={actionRef}
        headerTitle={[
          <Button
            type="primary"
            key="back"
            style={{ marginRight: 8 }}
            icon={<ArrowLeftOutlined />}
            onClick={() => {
              history.push('/sys/role')
            }}
          >
            {intl.formatMessage({
              id: 'pages.btn.back',
            })}
          </Button>,
          // <PermissionButton
          //   authorword="system:role:remove"
          //   type="primary"
          //   onClick={() => {setModalVisible(true)}}
          //   key="delete"
          // >
          //   <CloseCircleOutlined />
          //   {intl.formatMessage({
          //     id: 'sys.role.cancelperms1',
          //   })}
          // </PermissionButton>,
        ]}
        toolBarRender={() => [
          // <PermissionButton
          //   authorword="system:role:remove"
          //   type="primary"
          //   onClick={multipleDelete}
          //   key="delete"
          // >
          //   <CloseCircleOutlined />
          //   {intl.formatMessage({
          //     id: 'sys.role.cancelperms1',
          //   })}
          // </PermissionButton>,
        ]}
        tableAlertRender={false}
        // rowSelection={{
        //   selectedRowKeys,
        //   onChange: (value) => {
        //     setSelectedRowKeys(value)
        //   },
        // }}
      />
    </>
  )
}

export default RoleManage
