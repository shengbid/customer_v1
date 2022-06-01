import React, { useState, useRef } from 'react'
import MenuProTable from '@/components/ComProtable/MenuProTable'
import type { postListProps, postParamProps } from '@/services/types'
import type { ProColumns, ActionType } from '@ant-design/pro-table'
import { message, Tag } from 'antd'
import { getPostList, deletePost } from '@/services'
import ExportFile from '@/components/ComUpload/exportFile'
import DictSelect from '@/components/ComSelect'
import AddModal from './components/addModal'

const { MenuAddButton, MenuMultiDelButton, MenuEditButton, MenuDelteButton } = MenuProTable

const RoleManage: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [id, setId] = useState<any>()
  const [params, setParams] = useState<postParamProps>()

  const actionRef = useRef<ActionType>()

  // 删除用户
  const delteRecored = async (ids: number | string) => {
    await deletePost(ids)
    message.success('删除成功')
    actionRef.current?.reload()
  }

  const columns: ProColumns<postListProps>[] = [
    {
      title: '序号',
      valueType: 'index',
    },
    {
      title: '岗位名称',
      key: 'postName',
      dataIndex: 'postName',
    },
    {
      title: '岗位编码',
      key: 'postCode',
      dataIndex: 'postCode',
    },
    {
      title: '岗位排序',
      key: 'postSort',
      hideInSearch: true,
      dataIndex: 'postSort',
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
        return <DictSelect authorword="sys_normal_disable" />
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
    setParams(param)
    const { rows, total } = await getPostList(param)
    return {
      data: rows,
      total,
    }
  }

  // 批量删除
  const multipleDelete = async () => {
    console.log(selectedRowKeys)
    if (selectedRowKeys.length) {
      await deletePost(selectedRowKeys.join(','))
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
        toolBarRender={() => [
          <ExportFile
            authorword="system:post:export"
            key="export"
            params={params}
            title="岗位"
            url="post"
          />,
          <MenuMultiDelButton
            authorword="system:post:remove"
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
