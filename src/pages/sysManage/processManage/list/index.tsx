import React, { useState, useRef } from 'react'
import MenuProTable from '@/components/ComProtable/MenuProTable'
import type { postListProps, postParamProps } from '@/services/types'
import type { ProColumns, ActionType } from '@ant-design/pro-table'
import { message, Button } from 'antd'
import { getProcessList, deletePost } from '@/services'
// import ExportFile from '@/components/ComUpload/exportFile'
import AddModal from './components/addModal'
import { useIntl, history } from 'umi'
import { CloudUploadOutlined } from '@ant-design/icons'

const { MenuEditButton, MenuDelteButton } = MenuProTable

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
        id: 'sys.process.name',
      }),
      key: 'postName',
      dataIndex: 'postName',
    },
    {
      title: intl.formatMessage({
        id: 'sys.process.processKey',
      }),
      key: 'processKey',
      dataIndex: 'processKey',
    },
    {
      title: intl.formatMessage({
        id: 'sys.process.processVsion',
      }),
      key: 'processVsion',
      hideInSearch: true,
      dataIndex: 'processVsion',
    },
    {
      title: intl.formatMessage({
        id: 'sys.process.fileName',
      }),
      key: 'fileName',
      dataIndex: 'fileName',
      hideInSearch: true,
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
            history.push(`/process/create?processId=${recored.postId}`)
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
    const { rows, total } = await getProcessList(param)
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
        // headerTitle={
        //   <MenuAddButton
        //     authorword="system:post:add"
        //     onClick={() => {
        //       setId(null)
        //       setModalVisible(true)
        //     }}
        //   />
        // }
        toolBarRender={() => [
          <Button
            type="primary"
            key="add"
            onClick={() => {
              setModalVisible(true)
            }}
            icon={<CloudUploadOutlined />}
          >
            部署流程文件
          </Button>,
          // <MenuMultiDelButton
          //   authorword="system:post:remove"
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
    </>
  )
}

export default RoleManage
