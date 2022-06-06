import React, { useState, useRef } from 'react'
import MenuProTable from '@/components/ComProtable/MenuProTable'
import type { timedTaskProps, timedTaskParamProps } from '@/services/types'
import type { ProColumns, ActionType } from '@ant-design/pro-table'
import { message, Switch, Popconfirm, Dropdown, Space, Menu } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { getTimedTaskList, deleteTimedTask, changeTaskStatus, runTaskStatus } from '@/services'
import ExportFile from '@/components/ComUpload/exportFile'
import DictSelect from '@/components/ComSelect'
import AddModal from './components/addModal'
import { useIntl, history } from 'umi'
import { sysJobData } from '@/utils/dictData'
import DetailModal from './components/detailModal'

const { MenuAddButton, MenuMultiDelButton, MenuEditButton, MenuDelteButton } = MenuProTable

const RoleManage: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [detailVisible, setDetailVisible] = useState<boolean>(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [id, setId] = useState<any>()
  const [params, setParams] = useState<timedTaskParamProps>()
  const intl = useIntl()
  const actionRef = useRef<ActionType>()

  // 改变状态
  const changeStatus = async (data: { status: string; jobId: number }) => {
    await changeTaskStatus(data)
    message.success(
      intl.formatMessage({
        id: 'pages.form.edit',
      }),
    )
    actionRef.current?.reload()
  }
  // 执行任务
  const changeTask = async (data: { jobGroup: string; jobId: number }) => {
    await runTaskStatus(data)
    message.success(
      intl.formatMessage({
        id: 'pages.form.success',
      }),
    )
    actionRef.current?.reload()
  }

  // 删除
  const delteRecored = async (ids: number | string) => {
    await deleteTimedTask(ids)
    message.success(
      intl.formatMessage({
        id: 'pages.form.delete',
      }),
    )
    actionRef.current?.reload()
  }

  const menu = (recored: timedTaskProps) => (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <Popconfirm
              title={`${intl.formatMessage({
                id: 'pages.table.confirm',
              })}${intl.formatMessage({
                id: 'sys.timedTask.run',
              })}${recored.jobName}${intl.formatMessage({
                id: 'sys.timedTask.task',
              })}?`}
              onConfirm={() => changeTask({ jobGroup: recored.jobGroup, jobId: recored.jobId })}
            >
              <a>
                {intl.formatMessage({
                  id: 'sys.timedTask.run',
                })}
              </a>
            </Popconfirm>
          ),
        },
        {
          key: '2',
          label: (
            <a
              onClick={() => {
                setDetailVisible(true)
                setId(recored.jobId)
              }}
            >
              {intl.formatMessage({
                id: 'sys.timedTask.taskInfo',
              })}
            </a>
          ),
        },
        {
          key: '3',
          label: (
            <a
              onClick={() => {
                history.push(`/systemMonitor/timedTask/log`)
              }}
            >
              {intl.formatMessage({
                id: 'sys.timedTask.log',
              })}
            </a>
          ),
        },
      ]}
    />
  )

  const columns: ProColumns<timedTaskProps>[] = [
    {
      title: intl.formatMessage({
        id: 'sys.timedTask.jobId',
      }),
      hideInSearch: true,
      key: 'jobId',
      dataIndex: 'jobId',
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
      key: 'invokeTarget',
      hideInSearch: true,
      dataIndex: 'invokeTarget',
    },
    {
      title: intl.formatMessage({
        id: 'sys.timedTask.cronExpression',
      }),
      key: 'cronExpression',
      hideInSearch: true,
      dataIndex: 'cronExpression',
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
      render: (val, recored) => (
        <Popconfirm
          title={`${intl.formatMessage({
            id: 'pages.table.confirm',
          })}${
            val === '0'
              ? intl.formatMessage({
                  id: 'pages.table.off',
                })
              : intl.formatMessage({
                  id: 'pages.table.on',
                })
          }${recored.jobName}${intl.formatMessage({
            id: 'sys.timedTask.task',
          })}?`}
          onConfirm={() => changeStatus({ status: val === '0' ? '1' : '0', jobId: recored.jobId })}
        >
          <Switch checked={val === '0'} defaultChecked={val === '0'} />
        </Popconfirm>
      ),
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
          authorword="monitor:job:edit"
          onClick={() => {
            setId(recored.jobId)
            setModalVisible(true)
          }}
        />,
        <MenuDelteButton
          authorword="monitor:job:remove"
          onClick={() => delteRecored(recored.jobId)}
          key="delete"
        />,
        <Dropdown key="log" overlay={() => menu(recored)}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              {intl.formatMessage({
                id: 'sys.timedTask.log',
              })}
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>,
      ],
    },
  ]

  const getList = async (param: timedTaskParamProps) => {
    // console.log(param)
    setParams(param)
    const { rows, total } = await getTimedTaskList(param)
    return {
      data: rows,
      total,
    }
  }

  // 批量删除
  const multipleDelete = async () => {
    console.log(selectedRowKeys)
    if (selectedRowKeys.length) {
      await deleteTimedTask(selectedRowKeys.join(','))
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

  // 新增
  const submit = () => {
    setModalVisible(false)
    actionRef?.current?.reload()
  }

  return (
    <>
      <MenuProTable<timedTaskProps>
        request={getList}
        rowKey="jobId"
        columns={columns}
        actionRef={actionRef}
        headerTitle={
          <MenuAddButton
            authorword="monitor:job:add"
            onClick={() => {
              setId(null)
              setModalVisible(true)
            }}
          />
        }
        toolBarRender={() => [
          <ExportFile
            authorword="monitor:job:export"
            key="export"
            params={params}
            title={intl.formatMessage({
              id: 'sys.post.name',
            })}
            url="job"
          />,
          <MenuMultiDelButton
            authorword="monitor:job:remove"
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
      <DetailModal
        modalVisible={detailVisible}
        handleSubmit={submit}
        info={id}
        handleCancel={() => setDetailVisible(false)}
      />
    </>
  )
}

export default RoleManage
