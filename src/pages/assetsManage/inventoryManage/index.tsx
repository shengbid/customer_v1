import React, { useRef } from 'react'
import MenuProTable from '@/components/ComProtable/MenuProTable'
import type { ProColumns, ActionType } from '@ant-design/pro-table'
import { getDictList } from '@/services'

// 库存质押
const Inventory: React.FC = () => {
  const actionRef = useRef<ActionType>()

  const columns: ProColumns<any>[] = [
    {
      title: '任务编号',
      dataIndex: 'processNo',
      width: 150,
    },
  ]

  const getList = async (param: any) => {
    // console.log(param)
    const { rows, total } = await getDictList(param)
    return {
      data: rows,
      total,
    }
  }

  return (
    <>
      <MenuProTable<any> rowKey="id" request={getList} columns={columns} actionRef={actionRef} />
    </>
  )
}

export default Inventory
