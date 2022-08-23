import { useImperativeHandle, forwardRef, useState, useEffect } from 'react'
import SimpleProtable from '@/components/ComProtable/SimpleProTable'
import type { ProColumns } from '@ant-design/pro-table'
import { formatAmount } from '@/utils/base'

const StepOne = ({}, ref: any) => {
  const [dataSource, setDataSource] = useState<any[]>([])
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([])

  useEffect(() => {
    setDataSource([{ id: 1 }, { id: 2 }])
  }, [])

  useImperativeHandle(ref, () => ({
    // 暴露给父组件的方法
    getBusinessData: () => {
      return {
        selectedRowKeys,
      }
    },
  }))

  const columns: ProColumns<any>[] = [
    {
      title: '融资订单编号',
      key: 'shareholderName',
      dataIndex: 'shareholderName',
    },
    {
      title: '金融产品名称',
      key: 'shareholderName',
      dataIndex: 'shareholderName',
    },
    {
      title: '代垫资金',
      key: 'identityType',
      dataIndex: 'identityType',
      render: (val) => formatAmount(val),
    },
    {
      title: '剩余应还代垫资金',
      key: 'identityNumber',
      dataIndex: 'identityNumber',
      render: (val) => formatAmount(val),
    },
    {
      title: '融资起止时间',
      key: 'shareholderName',
      dataIndex: 'shareholderName',
    },
    {
      title: '预期状态',
      key: 'shareholderName',
      dataIndex: 'shareholderName',
    },
  ]

  return (
    <>
      <SimpleProtable
        rowKey="id"
        columns={columns}
        dataSource={dataSource || []}
        rowSelection={{
          selectedRowKeys,
          onChange: setSelectedRowKeys,
        }}
      />
    </>
  )
}

export default forwardRef(StepOne)
