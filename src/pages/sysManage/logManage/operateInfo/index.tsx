import React, { useState, useRef } from 'react'
import MenuProTable from '@/components/ComProtable/MenuProTable'
import type { operateInfoProps, operateInfoParamProps } from '@/services/types'
import type { ProColumns, ActionType } from '@ant-design/pro-table'
import { message, Tag } from 'antd'
import { getOperateInfoList, deleteOperateInfo } from '@/services'
import ExportFile from '@/components/ComUpload/exportFile'
import DictSelect from '@/components/ComSelect'
import AddModal from './components/addModal'
import PermissionButton from '@/components/Permission'
import { FolderViewOutlined } from '@ant-design/icons'
import { useIntl } from 'umi'
import { statusData } from '@/utils/dictData'

const { MenuDelteButton } = MenuProTable

const RoleManage: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [id, setId] = useState<any>()
  const [operType, setOperType] = useState<any>()
  const [extraInfo, setExtraInfo] = useState<any>()
  const [params, setParams] = useState<operateInfoParamProps>()
  const intl = useIntl()
  const actionRef = useRef<ActionType>()

  // 删除
  const delteRecored = async (ids: number | string) => {
    await deleteOperateInfo(ids)
    message.success(
      intl.formatMessage({
        id: 'pages.form.delete',
      }),
    )
    actionRef.current?.reload()
  }

  const columns: ProColumns<operateInfoProps>[] = [
    {
      title: intl.formatMessage({
        id: 'sys.operate.operId',
      }),
      key: 'operId',
      hideInSearch: true,
      dataIndex: 'operId',
    },
    {
      title: intl.formatMessage({
        id: 'sys.operate.title',
      }),
      key: 'title',
      dataIndex: 'title',
    },
    {
      title: intl.formatMessage({
        id: 'sys.operate.businessType',
      }),
      hideInSearch: true,
      key: 'businessType',
      dataIndex: 'businessType',
      renderText: (val) => operType[val],
    },
    {
      title: intl.formatMessage({
        id: 'sys.operate.requestMethod',
      }),
      key: 'requestMethod',
      hideInSearch: true,
      dataIndex: 'requestMethod',
    },
    {
      title: intl.formatMessage({
        id: 'sys.operate.operName',
      }),
      key: 'operName',
      hideInSearch: true,
      dataIndex: 'operName',
    },
    {
      title: intl.formatMessage({
        id: 'sys.operate.businessType',
      }),
      key: 'businessType',
      dataIndex: 'businessType',
      hideInTable: true,
      renderFormItem: (_, { type }) => {
        if (type === 'form') {
          return null
        }
        return <DictSelect authorword="sys_oper_type" getDictData={(data) => setOperType(data)} />
      },
    },
    {
      title: intl.formatMessage({
        id: 'sys.operate.operIp',
      }),
      key: 'operIp',
      hideInSearch: true,
      dataIndex: 'operIp',
    },
    // {
    //   title: intl.formatMessage({
    //     id: 'sys.operate.operLocation',
    //   }),
    //   key: 'operLocation',
    //   hideInSearch: true,
    //   dataIndex: 'operLocation',
    // },
    {
      title: intl.formatMessage({
        id: 'sys.operate.operatorType',
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
        id: 'sys.operate.operatorType',
      }),
      key: 'status',
      dataIndex: 'status',
      hideInSearch: true,
      render: (val) =>
        Number(val) === 0 ? (
          <Tag color="processing">
            {intl.formatMessage({
              id: 'pages.form.success',
            })}
          </Tag>
        ) : (
          <Tag color="error">
            {intl.formatMessage({
              id: 'pages.form.fail',
            })}
          </Tag>
        ),
    },
    {
      title: intl.formatMessage({
        id: 'sys.operate.operTime',
      }),
      key: 'operTime',
      dataIndex: 'operTime',
      hideInSearch: true,
      valueType: 'dateTime',
    },
    {
      title: intl.formatMessage({
        id: 'sys.operate.operTime',
      }),
      hideInTable: true,
      dataIndex: 'operTime',
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
        <PermissionButton
          key="edit"
          authorword="monitor:operlog:query"
          type="link"
          onClick={() => {
            setId(recored.operId)
            setExtraInfo({
              ...recored,
              businessType: operType[recored.businessType],
              operatorType: statusData[String(recored.status)],
            })
            setModalVisible(true)
          }}
        >
          <FolderViewOutlined style={{ marginRight: 3 }} />
          {intl.formatMessage({
            id: 'pages.btn.detail',
          })}
        </PermissionButton>,
        <MenuDelteButton
          authorword="monitor:operlog:remove"
          onClick={() => delteRecored(recored.operId)}
          key="delete"
        />,
      ],
    },
  ]

  const getList = async (param: operateInfoParamProps) => {
    // console.log(param)
    setParams(param)
    const { rows, total } = await getOperateInfoList(param)
    return {
      data: rows,
      total,
    }
  }

  return (
    <>
      <MenuProTable<operateInfoProps>
        request={getList}
        rowKey="operId"
        columns={columns}
        actionRef={actionRef}
        toolBarRender={() => [
          <ExportFile
            authorword="monitor:operlog:export"
            key="export"
            params={params}
            title={intl.formatMessage({
              id: 'sys.operate.name',
            })}
            url="/monitor/operlog"
          />,
        ]}
        tableAlertRender={false}
      />

      <AddModal
        modalVisible={modalVisible}
        extraInfo={extraInfo}
        info={id}
        handleCancel={() => setModalVisible(false)}
      />
    </>
  )
}

export default RoleManage
