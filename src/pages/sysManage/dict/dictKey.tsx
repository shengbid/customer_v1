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
import { history } from 'umi'

const { MenuAddButton, MenuMultiDelButton, MenuEditButton, MenuDelteButton } = MenuProTable

const RoleManage: React.FC = (props: any) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [dictOptions, setDictOptions] = useState<any[]>([])
  const [info, setInfo] = useState<any>()
  const [dictType, setDictType] = useState<string>(props.location.query.type)

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
    message.success('删除成功')
    actionRef.current?.reload()
  }

  const columns: ProColumns<dictKeyProps>[] = [
    {
      title: '序号',
      valueType: 'index',
    },
    {
      title: '字典名称',
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
      title: '字典标签',
      key: 'dictLabel',
      dataIndex: 'dictLabel',
    },
    {
      title: '字典键值',
      hideInSearch: true,
      key: 'dictValue',
      dataIndex: 'dictValue',
    },
    {
      title: '字典排序',
      key: 'dictSort',
      hideInSearch: true,
      dataIndex: 'dictSort',
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
      render: (val) => (val === '0' ? <Tag color="blue">正常</Tag> : <Tag color="error">停用</Tag>),
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
      width: 160,
      key: 'createTime',
      dataIndex: 'createTime',
      hideInSearch: true,
      valueType: 'dateTime',
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
            setInfo(recored)
            setModalVisible(true)
          }}
        />,
        <MenuDelteButton
          authorWord="system:dict:remove"
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
            返回
          </Button>,
          <MenuAddButton
            key="add"
            authorWord="system:dict:add"
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
        info={info}
        handleCancel={() => setModalVisible(false)}
      />
    </>
  )
}

export default RoleManage
