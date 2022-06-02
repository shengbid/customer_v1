import React, { useState, useRef, useEffect } from 'react'
import MenuProTable from '@/components/ComProtable/MenuProTable'
import type { dictKeyProps, dictkeyParamProps } from '@/services/types'
import type { ProColumns, ActionType } from '@ant-design/pro-table'
import { message, Tag, Button } from 'antd'
import { getDictKeyList, deleteDictKey, getDictSelect } from '@/services'
import DictSelect from '@/components/ComSelect'
import AddModal from './components/addKeyModal'
import { handleTreeData } from '@/utils/base'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { history, useIntl } from 'umi'

const { MenuAddButton, MenuMultiDelButton, MenuEditButton, MenuDelteButton } = MenuProTable

const RoleManage: React.FC = (props: any) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [dictOptions, setDictOptions] = useState<any[]>([])
  const [info, setInfo] = useState<any>()
  const [dictType, setDictType] = useState<string>(props.location.query.type)
  const intl = useIntl()

  const getDicOption = async () => {
    const { data } = await getDictSelect()
    setDictOptions(handleTreeData(data, 'dictType', 'dictName', 'label'))
  }

  useEffect(() => {
    getDicOption()
  }, [])

  const actionRef = useRef<ActionType>()

  // 删除用户
  const delteRecored = async (ids: number | string) => {
    await deleteDictKey(ids)
    message.success(
      intl.formatMessage({
        id: 'pages.form.delete',
      }),
    )
    actionRef.current?.reload()
  }

  const columns: ProColumns<dictKeyProps>[] = [
    {
      title: intl.formatMessage({
        id: 'pages.table.index',
      }),
      valueType: 'index',
    },
    {
      title: intl.formatMessage({
        id: 'sys.dict.dictName',
      }),
      key: 'dictType',
      dataIndex: 'dictType',
      hideInTable: true,
      initialValue: dictType,
      valueType: 'select',
      fieldProps: {
        options: dictOptions,
        allowClear: false,
      },
    },
    {
      title: intl.formatMessage({
        id: 'sys.dictKey.dictLabel',
      }),
      key: 'dictLabel',
      dataIndex: 'dictLabel',
    },
    {
      title: intl.formatMessage({
        id: 'sys.dictKey.dictValue',
      }),
      hideInSearch: true,
      key: 'dictValue',
      dataIndex: 'dictValue',
    },
    {
      title: intl.formatMessage({
        id: 'sys.dictKey.dictSort',
      }),
      key: 'dictSort',
      hideInSearch: true,
      dataIndex: 'dictSort',
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
      render: (val) => (val === '0' ? <Tag color="blue">正常</Tag> : <Tag color="error">停用</Tag>),
    },
    {
      title: intl.formatMessage({
        id: 'sys.base.remark',
      }),
      key: 'remark',
      ellipsis: true,
      hideInSearch: true,
      dataIndex: 'remark',
    },
    {
      title: intl.formatMessage({
        id: 'sys.base.createTime',
      }),
      width: 160,
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
        <MenuEditButton
          key="edit"
          authorword="system:dict:edit"
          onClick={() => {
            setInfo(recored)
            setModalVisible(true)
          }}
        />,
        <MenuDelteButton
          authorword="system:dict:remove"
          onClick={() => delteRecored(recored.dictCode)}
          key="delete"
        />,
      ],
    },
  ]

  const getList = async (param: dictkeyParamProps) => {
    // console.log(param)
    if (param.dictType) {
      setDictType(param.dictType)
    }
    const { rows, total } = await getDictKeyList(param)
    return {
      data: rows,
      total,
    }
  }

  // 批量删除
  const multipleDelete = async () => {
    if (selectedRowKeys.length) {
      await deleteDictKey(selectedRowKeys.join(','))
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
      <MenuProTable<dictKeyProps>
        request={getList}
        rowKey="dictCode"
        columns={columns}
        actionRef={actionRef}
        headerTitle={[
          <Button
            type="primary"
            key="back"
            style={{ marginRight: 8 }}
            icon={<ArrowLeftOutlined />}
            onClick={() => {
              history.push('/sys/dict')
            }}
          >
            {intl.formatMessage({
              id: 'pages.btn.back',
            })}
          </Button>,
          <MenuAddButton
            key="add"
            authorword="system:dict:add"
            onClick={() => {
              setInfo({
                dictType,
              })
              setModalVisible(true)
            }}
          />,
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

      <AddModal
        modalVisible={modalVisible}
        handleSubmit={submit}
        info={info}
        handleCancel={() => setModalVisible(false)}
      />
    </>
  )
}

export default RoleManage
