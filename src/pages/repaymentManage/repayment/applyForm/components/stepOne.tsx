import { useImperativeHandle, forwardRef, useState, useEffect } from 'react'
import SimpleProtable from '@/components/ComProtable/SimpleProTable'
import type { ProColumns } from '@ant-design/pro-table'
import { formatAmount } from '@/utils/base'

interface infoProps {
  type: string
}

const StepOne = ({ type }: infoProps, ref: any) => {
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

  const columns2: ProColumns<any>[] = [
    {
      title: '商品条形码',
      dataIndex: 'barCode',
      width: '18%',
    },
    {
      title: '描述 DESCRIPTION',
      dataIndex: 'goodName',
      width: '26%',
    },
    {
      title: '品牌 BRAND',
      dataIndex: 'goodBrand',
      width: '18%',
    },
    {
      title: '关联融资订单',
      key: 'identityNumber',
      dataIndex: 'identityNumber',
    },
    {
      title: '可赎回数量',
      key: 'shareholderName',
      dataIndex: 'shareholderName',
      valueType: 'digit',
    },
  ]

  return (
    <>
      <SimpleProtable
        rowKey="id"
        columns={type === '1' ? columns : columns2}
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
