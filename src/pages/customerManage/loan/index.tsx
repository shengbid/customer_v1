import React, { useState, useRef } from 'react'
import MenuProTable from '@/components/ComProtable/MenuProTable'
import type { customerListProps, customerListParamProps } from '@/services/types'
import type { ProColumns, ActionType } from '@ant-design/pro-table'
import { message, Tooltip, Typography } from 'antd'
import { getLoanCustomerList, deleteLoanCustomer } from '@/services'
import DictSelect from '@/components/ComSelect'
import AddModal from './components/addModal'
import { useIntl } from 'umi'
import { DeleteOutlined } from '@ant-design/icons'

const { MenuAddButton, MenuDelteButton } = MenuProTable
const { Text } = Typography

const RoleManage: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [id, setId] = useState<any>()
  const intl = useIntl()
  const actionRef = useRef<ActionType>()

  // 删除
  const delteRecored = async (ids: number | string) => {
    await deleteLoanCustomer(ids)
    message.success(
      intl.formatMessage({
        id: 'pages.form.delete',
      }),
    )
    actionRef.current?.reload()
  }

  const columns: ProColumns<customerListProps>[] = [
    {
      title: intl.formatMessage({
        id: 'customer.loan.customerNo',
      }),
      key: 'code',
      dataIndex: 'code',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({
        id: 'customer.loan.name',
      }),
      key: 'fullName',
      dataIndex: 'fullName',
    },
    {
      title: intl.formatMessage({
        id: 'customer.loan.customerShort',
      }),
      key: 'shortName',
      dataIndex: 'shortName',
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
        id: 'pages.table.option',
      }),
      width: 150,
      key: 'option',
      valueType: 'option',
      render: (_, recored) => [
        // <MenuEditButton
        //   key="edit"
        //   authorword="system:post:edit"
        //   onClick={() => {
        //     setId(recored.id)
        //     setModalVisible(true)
        //   }}
        // />,
        Number(recored.status) === 0 ? (
          <Tooltip key="delete" placement="topLeft" title="该客户已授信或授信审核中无法删除">
            <Text type="secondary">
              <DeleteOutlined style={{ marginRight: 3 }} />
              删除
            </Text>
          </Tooltip>
        ) : (
          <MenuDelteButton
            key="delete"
            authorword="system:post:remove"
            onClick={() => delteRecored(recored.id)}
          />
        ),
      ],
    },
  ]

  const getList = async (param: customerListParamProps) => {
    const { rows, total } = await getLoanCustomerList(param)
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
      <MenuProTable<customerListProps>
        request={getList}
        rowKey="id"
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
        tableAlertRender={false}
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
