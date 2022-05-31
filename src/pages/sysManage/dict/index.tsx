import React, { useState, useRef } from 'react'
import MenuProTable from '@/components/ComProtable/MenuProTable'
import type { dictProps, dictParamProps } from '@/services/types'
import type { ProColumns, ActionType } from '@ant-design/pro-table'
import { message, Tag } from 'antd'
import { getDictList, deleteDict } from '@/services'
import ExportFile from '@/components/ComUpload/exportFile'
import DictSelect from '@/components/ComSelect'
import { Link } from 'umi'
import AddModal from './components/addModal'

const { MenuAddButton, MenuMultiDelButton, MenuEditButton, MenuDelteButton } = MenuProTable

const RoleManage: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [id, setId] = useState<any>()
  const [params, setParams] = useState<dictParamProps>()

  const actionRef = useRef<ActionType>()

  // 删除用户
  const delteRecored = async (ids: number | string) => {
    await deleteDict(ids)
    message.success('删除成功')
    actionRef.current?.reload()
  }

  const columns: ProColumns<dictProps>[] = [
    {
      title: '序号',
      valueType: 'index',
    },
    {
      title: '字典名称',
      key: 'dictName',
      dataIndex: 'dictName',
    },
    {
      title: '字典类型',
      key: 'dictType',
      dataIndex: 'dictType',
      render: (val, recored) => <Link to={`/sys/dict/type?type=${val}`}>{recored.dictType}</Link>,
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
      render: (val) =>
        val === '0' ? <Tag color="processing">正常</Tag> : <Tag color="error">停用</Tag>,
    },
    {
      title: '备注',
      key: 'remark',
      ellipsis: true,
      hideInSearch: true,
      dataIndex: 'remark',
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
          authorWord="system:dict:edit"
          onClick={() => {
            setId(recored.dictId)
            setModalVisible(true)
          }}
        />,
        <MenuDelteButton
          authorWord="system:dict:remove"
          onClick={() => delteRecored(recored.dictId)}
          key="delete"
        />,
      ],
    },
  ]

  const getList = async (param: dictParamProps) => {
    // console.log(param)
    setParams(param)
    const { rows, total } = await getDictList(param)
    return {
      data: rows,
      total,
    }
  }

  // 批量删除
  const multipleDelete = async () => {
    console.log(selectedRowKeys)
    if (selectedRowKeys.length) {
      await deleteDict(selectedRowKeys.join(','))
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
      <MenuProTable<dictProps>
        request={getList}
        rowKey="dictId"
        columns={columns}
        actionRef={actionRef}
        headerTitle={
          <MenuAddButton
            authorWord="system:dict:add"
            onClick={() => {
              setId(null)
              setModalVisible(true)
            }}
          />
        }
        toolBarRender={() => [
          <ExportFile
            authorWord="system:dict:export"
            key="export"
            params={params}
            title="数据字典"
            url="dict/type"
          />,
          <MenuMultiDelButton
            authorWord="system:dict:remove"
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
