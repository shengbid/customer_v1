import React, { useState, useRef } from 'react'
import MenuProTable from '@/components/ComProtable/MenuProTable'
import type { processListProps, processListParamProps } from '@/services/types'
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

  const columns: ProColumns<processListProps>[] = [
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
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: intl.formatMessage({
        id: 'sys.process.processKey',
      }),
      key: 'key',
      dataIndex: 'key',
    },
    {
      title: intl.formatMessage({
        id: 'sys.process.processVsion',
      }),
      key: 'version',
      hideInSearch: true,
      dataIndex: 'version',
    },
    {
      title: intl.formatMessage({
        id: 'sys.process.createTime',
      }),
      key: 'deploymentTime',
      dataIndex: 'deploymentTime',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({
        id: 'sys.base.status',
      }),
      key: 'suspendState',
      dataIndex: 'suspendState',
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
            setId(recored.id)
            history.push(`/process/create?processId=${recored.id}`)
          }}
        />,
        <MenuDelteButton
          authorword="system:post:remove"
          onClick={() => delteRecored(recored.id)}
          key="delete"
        />,
      ],
    },
  ]

  const getList = async (param: processListParamProps) => {
    // console.log(param)
    const { rows, total } = await getProcessList(param)
    return {
      data: rows,
      total,
    }
  }

  // 新增
  const submit = () => {
    setModalVisible(false)
    actionRef?.current?.reload()
  }

  return (
    <>
      <MenuProTable<processListProps>
        request={getList}
        rowKey="id"
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
