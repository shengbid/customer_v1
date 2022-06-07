import React, { useState, useRef } from 'react'
import MenuProTable from '@/components/ComProtable/MenuProTable'
import type { timedTaskLogProps, timedTaskLogParamProps } from '@/services/types'
import type { ProColumns, ActionType } from '@ant-design/pro-table'
import { message, Tag, Button } from 'antd'
import { deleteTimedTaskLog, getTimedTaskLogList } from '@/services'
import DictSelect from '@/components/ComSelect'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { history, useIntl } from 'umi'
import { sysJobData } from '@/utils/dictData'

const { MenuMultiDelButton, MenuDelteButton } = MenuProTable

const RoleManage: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const intl = useIntl()

  const actionRef = useRef<ActionType>()

  // 取消授权
  const delteRecored = async (ids: number | string) => {
    await deleteTimedTaskLog(ids)
    message.success(
      intl.formatMessage({
        id: 'pages.form.delete',
      }),
    )
    actionRef.current?.reload()
  }

  const columns: ProColumns<timedTaskLogProps>[] = [
    {
      title: intl.formatMessage({
        id: 'sys.timedTaskLog.jobLogId',
      }),
      hideInSearch: true,
      key: 'jobLogId',
      dataIndex: 'jobLogId',
      width: 73,
    },
    {
      title: intl.formatMessage({
        id: 'sys.timedTask.jobName',
      }),
      key: 'jobName',
      dataIndex: 'jobName',
    },
    {
      title: intl.formatMessage({
        id: 'sys.timedTask.jobGroup',
      }),
      hideInSearch: true,
      key: 'jobGroup',
      dataIndex: 'jobGroup',
      renderText: (val) => sysJobData[val],
    },
    {
      title: intl.formatMessage({
        id: 'sys.timedTask.jobGroup',
      }),
      key: 'jobGroup',
      dataIndex: 'jobGroup',
      hideInTable: true,
      renderFormItem: (_, { type }) => {
        if (type === 'form') {
          return null
        }
        return <DictSelect authorword="sys_job_group" />
      },
    },
    {
      title: intl.formatMessage({
        id: 'sys.timedTask.invokeTarget',
      }),
      width: '18%',
      key: 'invokeTarget',
      hideInSearch: true,
      dataIndex: 'invokeTarget',
    },
    {
      title: intl.formatMessage({
        id: 'sys.timedTaskLog.jobMessage',
      }),
      key: 'jobMessage',
      hideInSearch: true,
      dataIndex: 'jobMessage',
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
        return <DictSelect authorword="sys_common_status" />
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
        id: 'sys.timedTaskLog.createTime',
      }),
      key: 'createTime',
      dataIndex: 'createTime',
      hideInSearch: true,
      valueType: 'dateTime',
    },
    {
      title: intl.formatMessage({
        id: 'sys.timedTaskLog.createTime',
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
      width: 80,
      key: 'option',
      valueType: 'option',
      render: (_, recored) => [
        <MenuDelteButton
          authorword="monitor:job:remove"
          onClick={() => delteRecored(recored.jobLogId)}
          key="delete"
        />,
      ],
    },
  ]

  const getList = async (param: timedTaskLogParamProps) => {
    // console.log(param)
    const { rows, total } = await getTimedTaskLogList(param)
    return {
      data: rows,
      total,
    }
  }

  // 批量删除
  const multipleDelete = async () => {
    if (selectedRowKeys.length) {
      await deleteTimedTaskLog(selectedRowKeys.join(','))
      message.success(
        intl.formatMessage({
          id: 'pages.form.delete',
        }),
      )
      actionRef.current?.reload()
      setSelectedRowKeys([])
    } else {
      message.warning(
        intl.formatMessage({
          id: 'pages.table.oneDataDelete',
        }),
      )
    }
  }

  return (
    <>
      <MenuProTable<timedTaskLogProps>
        request={getList}
        rowKey="jobLogId"
        columns={columns}
        actionRef={actionRef}
        headerTitle={[
          <Button
            type="primary"
            key="back"
            style={{ marginRight: 8 }}
            icon={<ArrowLeftOutlined />}
            onClick={() => {
              history.push('/systemMonitor/timedTask')
            }}
          >
            {intl.formatMessage({
              id: 'pages.btn.back',
            })}
          </Button>,
        ]}
        toolBarRender={() => [
          <MenuMultiDelButton
            authorword="system:dict:remove"
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
    </>
  )
}

export default RoleManage
