import React, { useState, useRef } from 'react'
import MenuProTable from '@/components/ComProtable/MenuProTable'
import type { noticeProps, noticeParamProps } from '@/services/types'
import type { ProColumns, ActionType } from '@ant-design/pro-table'
import { message, Tag } from 'antd'
import { getNoticeList, deleteNotice } from '@/services'
import DictSelect from '@/components/ComSelect'
import AddModal from './components/addModal'
import { useIntl } from 'umi'

const { MenuAddButton, MenuEditButton, MenuDelteButton } = MenuProTable

const RoleManage: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  // const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [id, setId] = useState<any>()
  const intl = useIntl()
  const actionRef = useRef<ActionType>()

  // 删除
  const delteRecored = async (ids: number | string) => {
    await deleteNotice(ids)
    message.success(
      intl.formatMessage({
        id: 'pages.form.delete',
      }),
    )
    actionRef.current?.reload()
  }

  const columns: ProColumns<noticeProps>[] = [
    // {
    //   title: intl.formatMessage({
    //     id: 'pages.table.index',
    //   }),
    //   valueType: 'index',
    // },
    {
      title: intl.formatMessage({
        id: 'sys.notice.noticeTitle',
      }),
      key: 'noticeTitle',
      dataIndex: 'noticeTitle',
      width: '32%',
    },
    {
      title: intl.formatMessage({
        id: 'sys.notice.noticeType',
      }),
      key: 'noticeType',
      dataIndex: 'noticeType',
      hideInSearch: true,
      render: (val) =>
        val === '1'
          ? intl.formatMessage({
              id: 'sys.notice.notice',
            })
          : intl.formatMessage({
              id: 'sys.notice.name',
            }),
    },
    {
      title: intl.formatMessage({
        id: 'sys.notice.noticeType',
      }),
      key: 'noticeType',
      dataIndex: 'noticeType',
      hideInTable: true,
      renderFormItem: (_, { type }) => {
        if (type === 'form') {
          return null
        }
        return <DictSelect authorword="sys_notice_type" />
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
        id: 'sys.notice.createBy',
      }),
      key: 'createBy',
      dataIndex: 'createBy',
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
      width: 150,
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
          authorword="system:notice:edit"
          onClick={() => {
            setId(recored.noticeId)
            setModalVisible(true)
          }}
        />,
        <MenuDelteButton
          authorword="system:notice:remove"
          onClick={() => delteRecored(recored.noticeId)}
          key="delete"
        />,
      ],
    },
  ]

  const getList = async (param: noticeParamProps) => {
    // console.log(param)
    const { rows, total } = await getNoticeList(param)
    return {
      data: rows,
      total,
    }
  }

  // 批量删除
  // const multipleDelete = async () => {
  //   console.log(selectedRowKeys)
  //   if (selectedRowKeys.length) {
  //     await deleteNotice(selectedRowKeys.join(','))
  //     message.success(
  //       intl.formatMessage({
  //         id: 'pages.form.delete',
  //       }),
  //     )
  //     actionRef.current?.reload()
  //     setSelectedRowKeys([])
  //   } else {
  //     message.warning(
  //       intl.formatMessage({
  //         id: 'pages.table.oneDataDelete',
  //       }),
  //     )
  //   }
  // }

  // 新增
  const submit = () => {
    setModalVisible(false)
    actionRef?.current?.reload()
  }

  return (
    <>
      <MenuProTable<noticeProps>
        request={getList}
        rowKey="noticeId"
        columns={columns}
        actionRef={actionRef}
        headerTitle={
          <MenuAddButton
            authorword="system:notice:add"
            onClick={() => {
              setId(null)
              setModalVisible(true)
            }}
          />
        }
        toolBarRender={() => [
          // <MenuMultiDelButton
          //   authorword="system:notice:remove"
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
