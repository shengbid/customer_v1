import React, { useState, useRef } from 'react'
import MenuProTable from '@/components/ComProtable/MenuProTable'
import type { deptListProps, deptParamProps } from '@/services/types'
import type { ProColumns, ActionType } from '@ant-design/pro-table'
import { message, Tag } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { getDeptList, deleteDept } from '@/services'
import DictSelect from '@/components/ComSelect'
import AddModal from './components/addModal'
import PermissionButton from '@/components/Permission'

const { MenuAddButton, MenuEditButton, MenuDelteButton } = MenuProTable

const RoleManage: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [expandRows, setExpandRows] = useState<number[]>([])
  const [addType, setAddType] = useState<string>()
  const [id, setId] = useState<any>()

  const actionRef = useRef<ActionType>()

  // 删除用户
  const delteRecored = async (ids: number) => {
    await deleteDept(ids)
    message.success('删除成功')
    actionRef.current?.reload()
  }

  const columns: ProColumns<deptListProps>[] = [
    {
      title: '部门名称',
      key: 'deptName',
      dataIndex: 'deptName',
    },
    {
      title: '排序',
      key: 'orderNum',
      dataIndex: 'orderNum',
      hideInSearch: true,
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
      title: '创建时间',
      key: 'createTime',
      dataIndex: 'createTime',
      hideInSearch: true,
      valueType: 'dateTime',
    },
    {
      title: '操作',
      width: 210,
      key: 'option',
      valueType: 'option',
      render: (_, recored) => [
        <PermissionButton
          key="add"
          authorWord="system:dept:add"
          type="link"
          onClick={() => {
            setId(recored.deptId)
            setAddType('add')
            setModalVisible(true)
          }}
        >
          <PlusOutlined />
          新增
        </PermissionButton>,
        <MenuEditButton
          key="edit"
          authorWord="system:dept:edit"
          onClick={() => {
            setId(recored.deptId)
            setAddType('')
            setModalVisible(true)
          }}
        />,
        recored.deptId !== 100 ? (
          <MenuDelteButton
            authorWord="system:dept:remove"
            onClick={() => delteRecored(recored.deptId)}
            key="delete"
          />
        ) : null,
      ],
    },
  ]

  const getList = async (param: deptParamProps) => {
    // console.log(param)
    const { data } = await getDeptList(param)
    const arr: number[] = []
    data.forEach((item) => {
      arr.push(item.deptId)
      if (item.children && item.children.length) {
        item.children.forEach((ss) => {
          arr.push(ss.deptId)
        })
      }
    })
    setExpandRows(arr)
    return {
      data,
    }
  }

  const onExpand = (expanded: boolean, record: deptListProps) => {
    setExpandRows(
      expanded
        ? [...expandRows, record.deptId]
        : expandRows.filter((item) => item !== record.deptId),
    )
  }

  // 新增
  const submit = () => {
    setModalVisible(false)
    actionRef?.current?.reload()
  }

  return (
    <>
      <MenuProTable<deptListProps>
        request={getList}
        rowKey="deptId"
        columns={columns}
        actionRef={actionRef}
        headerTitle={
          <MenuAddButton
            authorWord="system:dept:add"
            onClick={() => {
              setId(null)
              setModalVisible(true)
            }}
          />
        }
        expandable={{
          defaultExpandAllRows: true,
          expandedRowKeys: expandRows,
          onExpand,
        }}
        pagination={false}
      />

      <AddModal
        modalVisible={modalVisible}
        handleSubmit={submit}
        info={id}
        type={addType}
        handleCancel={() => setModalVisible(false)}
      />
    </>
  )
}

export default RoleManage
