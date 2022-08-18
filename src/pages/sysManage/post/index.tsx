import React, { useState, useRef } from 'react'
import MenuProTable from '@/components/ComProtable/MenuProTable'
import type { postListProps, postParamProps } from '@/services/types'
import type { ProColumns, ActionType } from '@ant-design/pro-table'
import { message, Tag } from 'antd'
import { getPostList, deletePost } from '@/services'
// import ExportFile from '@/components/ComUpload/exportFile'
import DictSelect from '@/components/ComSelect'
import AddModal from './components/addModal'
import { useIntl } from 'umi'

const { MenuAddButton, MenuEditButton, MenuDelteButton } = MenuProTable

const RoleManage: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  // const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [id, setId] = useState<any>()
  // const [params, setParams] = useState<postParamProps>()
  const intl = useIntl()
  const actionRef = useRef<ActionType>()

  // 删除
  const delteRecored = async (ids: number | string) => {
    await deletePost(ids)
    message.success(
      intl.formatMessage({
        id: 'pages.form.delete',
      }),
    )
    actionRef.current?.reload()
  }

  const columns: ProColumns<postListProps>[] = [
    // {
    //   title: intl.formatMessage({
    //     id: 'pages.table.index',
    //   }),
    //   valueType: 'index',
    // },
    {
      title: intl.formatMessage({
        id: 'sys.post.postName',
      }),
      key: 'postName',
      dataIndex: 'postName',
    },
    {
      title: intl.formatMessage({
        id: 'sys.post.postCode',
      }),
      key: 'postCode',
      dataIndex: 'postCode',
    },
    {
      title: intl.formatMessage({
        id: 'sys.menu.orderNum1',
      }),
      key: 'postSort',
      hideInSearch: true,
      dataIndex: 'postSort',
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
      width: 150,
      key: 'option',
      valueType: 'option',
      render: (_, recored) => [
        <MenuEditButton
          key="edit"
          authorword="system:post:edit"
          onClick={() => {
            setId(recored.postId)
            setModalVisible(true)
          }}
        />,
        <MenuDelteButton
          authorword="system:post:remove"
          onClick={() => delteRecored(recored.postId)}
          key="delete"
        />,
      ],
    },
  ]

  const getList = async (param: postParamProps) => {
    // console.log(param)
    // setParams(param)
    const { rows, total } = await getPostList(param)
    return {
      data: rows,
      total,
    }
  }

  // // 批量删除
  // const multipleDelete = async () => {
  //   console.log(selectedRowKeys)
  //   if (selectedRowKeys.length) {
  //     await deletePost(selectedRowKeys.join(','))
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

  return (
    <>
      <MenuProTable<postListProps>
        request={getList}
        rowKey="postId"
        columns={columns}
        actionRef={actionRef}
        headerTitle={
          <MenuAddButton
            authorword="system:post:add"
            onClick={() => {
              setId(null)
              setModalVisible(true)
            }}
          />
        }
        // toolBarRender={() => [
        //   <ExportFile
        //     authorword="system:post:export"
        //     key="export"
        //     params={params}
        //     title={intl.formatMessage({
        //       id: 'sys.post.name',
        //     })}
        //     url="/system/post/export"
        //   />,
        //   <MenuMultiDelButton
        //     authorword="system:post:remove"
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
    </>
  )
}

export default RoleManage
