import React, { useState, useRef } from 'react'
import MenuProTable from '@/components/ComProtable/MenuProTable'
import type { paramsProps, paramsParamProps } from '@/services/types'
import type { ProColumns, ActionType } from '@ant-design/pro-table'
import { message, Tag } from 'antd'
import { getParamList, deleteParam } from '@/services'
import ExportFile from '@/components/ComUpload/exportFile'
import DictSelect from '@/components/ComSelect'
import AddModal from './components/addModal'
import { useIntl } from 'umi'

const { MenuAddButton, MenuEditButton, MenuDelteButton } = MenuProTable

const RoleManage: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [id, setId] = useState<any>()
  const [params, setParams] = useState<paramsParamProps>()
  const intl = useIntl()
  const actionRef = useRef<ActionType>()

  // 删除
  const delteRecored = async (ids: number | string) => {
    await deleteParam(ids)
    message.success(
      intl.formatMessage({
        id: 'pages.form.delete',
      }),
    )
    actionRef.current?.reload()
  }

  const columns: ProColumns<paramsProps>[] = [
    {
      title: intl.formatMessage({
        id: 'pages.table.index',
      }),
      valueType: 'index',
    },
    {
      title: intl.formatMessage({
        id: 'sys.params.configName',
      }),
      key: 'configName',
      dataIndex: 'configName',
    },
    {
      title: intl.formatMessage({
        id: 'sys.params.configKey',
      }),
      key: 'configKey',
      dataIndex: 'configKey',
    },
    {
      title: intl.formatMessage({
        id: 'sys.params.configValue',
      }),
      key: 'configValue',
      hideInSearch: true,
      dataIndex: 'configValue',
    },
    {
      title: intl.formatMessage({
        id: 'sys.params.configType',
      }),
      key: 'configType',
      dataIndex: 'configType',
      hideInTable: true,
      renderFormItem: (_, { type }) => {
        if (type === 'form') {
          return null
        }
        return <DictSelect authorword="sys_yes_no" />
      },
    },
    {
      title: intl.formatMessage({
        id: 'sys.params.configType',
      }),
      key: 'configType',
      dataIndex: 'configType',
      width: 80,
      hideInSearch: true,
      render: (val) =>
        val === 'Y' ? (
          <Tag color="processing">
            {intl.formatMessage({
              id: 'pages.form.yes',
            })}
          </Tag>
        ) : (
          <Tag color="error">
            {intl.formatMessage({
              id: 'pages.form.no',
            })}
          </Tag>
        ),
    },
    {
      title: intl.formatMessage({
        id: 'sys.base.remark',
      }),
      key: 'remark',
      width: '17%',
      ellipsis: true,
      hideInSearch: true,
      dataIndex: 'remark',
    },
    {
      title: intl.formatMessage({
        id: 'sys.base.createTime',
      }),
      key: 'createTime',
      dataIndex: 'createTime',
      width: 160,
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
      width: 130,
      key: 'option',
      valueType: 'option',
      render: (_, recored) => [
        <MenuEditButton
          key="edit"
          authorword="system:config:edit"
          onClick={() => {
            setId(recored.configId)
            setModalVisible(true)
          }}
        />,
        <MenuDelteButton
          authorword="system:config:remove"
          onClick={() => delteRecored(recored.configId)}
          key="delete"
        />,
      ],
    },
  ]

  const getList = async (param: paramsParamProps) => {
    // console.log(param)
    setParams(param)
    const { rows, total } = await getParamList(param)
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
      <MenuProTable<paramsProps>
        request={getList}
        rowKey="configId"
        columns={columns}
        actionRef={actionRef}
        headerTitle={
          <MenuAddButton
            authorword="system:config:add"
            onClick={() => {
              setId(null)
              setModalVisible(true)
            }}
          />
        }
        toolBarRender={() => [
          <ExportFile
            authorword="system:config:export"
            key="export"
            params={params}
            title={intl.formatMessage({
              id: 'sys.params.name',
            })}
            url="config"
          />,
        ]}
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
