import React, { useState, useEffect } from 'react'
import ComCard from '@/components/ComPage/ComCard'
import SimpleProtable from '@/components/ComProtable/SimpleProTable'
import type { ProColumns } from '@ant-design/pro-table'
import { Table } from 'antd'
import { isEmpty } from 'lodash'

interface infoProps {
  infoData: any[]
}

const FeeInfo: React.FC<infoProps> = ({ infoData }) => {
  const [dataSource, setDataSource] = useState<any[]>([])

  useEffect(() => {
    setDataSource([])
  }, [infoData])

  const columns: ProColumns<any>[] = [
    {
      title: '融资订单编号',
      key: 'enterpriseGoodNumber',
      dataIndex: 'enterpriseGoodNumber',
    },
    {
      title: '费用名称',
      key: 'goodName',
      dataIndex: 'goodName',
    },
    {
      title: '剩余代垫资金',
      key: 'goodName',
      dataIndex: 'goodName',
    },
    {
      title: '计息开始日',
      key: 'goodName',
      dataIndex: 'goodName',
    },
    {
      title: '计息截止日',
      key: 'goodName',
      dataIndex: 'goodName',
    },
    {
      title: '计息天数',
      key: 'goodName',
      dataIndex: 'goodName',
    },
    {
      title: '费用利率',
      key: 'goodName',
      dataIndex: 'goodName',
    },
    {
      title: '费用金额',
      key: 'goodName',
      dataIndex: 'goodName',
    },
  ]

  return (
    <ComCard title="费用信息" style={{ marginTop: 12 }}>
      <SimpleProtable
        columns={columns}
        dataSource={dataSource}
        scroll={{ y: 500 }}
        summary={(pageData) => {
          let totalUsableCount = 0

          pageData.forEach(({ completeCount }) => {
            if (completeCount) {
              totalUsableCount += Number(completeCount)
            }
          })
          if (isEmpty(dataSource)) {
            return <></>
          }
          return (
            <Table.Summary.Row>
              <Table.Summary.Cell index={0} colSpan={7}>
                合计
              </Table.Summary.Cell>
              <Table.Summary.Cell index={1}>{totalUsableCount}</Table.Summary.Cell>
            </Table.Summary.Row>
          )
        }}
      />
    </ComCard>
  )
}

export default FeeInfo
