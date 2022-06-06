import React, { useRef } from 'react'
import MenuProTable from '@/components/ComProtable/MenuProTable'
import type { onlineUserProps, onlineUserParamProps } from '@/services/types'
import type { ProColumns, ActionType } from '@ant-design/pro-table'
import { message } from 'antd'
import { getOnlineList, outOnline } from '@/services'
import { useIntl } from 'umi'
import PermissionButton from '@/components/Permission'
import { ExportOutlined } from '@ant-design/icons'

const OnlineUser: React.FC = () => {
  const intl = useIntl()
  const actionRef = useRef<ActionType>()

  // 强制退出
  const outlogin = async (tokenId: string) => {
    await outOnline(tokenId)
    message.success(
      intl.formatMessage({
        id: 'pages.form.success',
      }),
    )
    actionRef.current?.reload()
  }

  const columns: ProColumns<onlineUserProps>[] = [
    {
      title: intl.formatMessage({
        id: 'pages.table.index',
      }),
      valueType: 'index',
    },
    {
      title: intl.formatMessage({
        id: 'sys.onlineUser.tokenId',
      }),
      key: 'tokenId',
      width: '14%',
      ellipsis: true,
      hideInSearch: true,
      dataIndex: 'tokenId',
    },
    {
      title: intl.formatMessage({
        id: 'sys.user.userName',
      }),
      key: 'userName',
      dataIndex: 'userName',
    },
    {
      title: intl.formatMessage({
        id: 'sys.dept.deptName',
      }),
      key: 'deptName',
      dataIndex: 'deptName',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({
        id: 'sys.onlineUser.ipaddr',
      }),
      key: 'ipaddr',
      dataIndex: 'ipaddr',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({
        id: 'sys.loginInfo.loginLocation',
      }),
      key: 'loginLocation',
      hideInSearch: true,
      dataIndex: 'loginLocation',
    },
    {
      title: intl.formatMessage({
        id: 'sys.loginInfo.browser',
      }),
      key: 'browser',
      hideInSearch: true,
      dataIndex: 'browser',
    },
    {
      title: intl.formatMessage({
        id: 'sys.loginInfo.os',
      }),
      key: 'os',
      hideInSearch: true,
      dataIndex: 'os',
    },
    {
      title: intl.formatMessage({
        id: 'sys.loginInfo.loginTime',
      }),
      key: 'loginTime',
      dataIndex: 'loginTime',
      hideInSearch: true,
      valueType: 'dateTime',
    },
    {
      title: intl.formatMessage({
        id: 'pages.table.option',
      }),
      width: 100,
      key: 'option',
      valueType: 'option',
      render: (_, recored) => [
        <PermissionButton
          authorword="monitor:online:forceLogout"
          onClick={() => outlogin(recored.tokenId)}
          key="delete"
          type="link"
        >
          <ExportOutlined style={{ marginRight: 3 }} />
          {intl.formatMessage({
            id: 'sys.onlineUser.out',
          })}
        </PermissionButton>,
      ],
    },
  ]

  const getList = async (param: onlineUserParamProps) => {
    // console.log(param)
    const { rows, total } = await getOnlineList(param)
    return {
      data: rows,
      total,
    }
  }

  return (
    <MenuProTable<onlineUserProps>
      request={getList}
      rowKey="infoId"
      columns={columns}
      actionRef={actionRef}
      toolBarRender={false}
      tableAlertRender={false}
    />
  )
}

export default OnlineUser
