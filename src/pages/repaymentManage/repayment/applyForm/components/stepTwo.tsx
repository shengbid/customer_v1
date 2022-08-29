import { useImperativeHandle, forwardRef, useState, useEffect } from 'react'
import { EditableProTable } from '@ant-design/pro-table'
import { Form, Table } from 'antd'
import type { ProColumns } from '@ant-design/pro-table'
import IntergerInput from '@/components/Input/integerInput'
import RequiredLabel from '@/components/RequiredLabel'
import { formatAmount } from '@/utils/base'
import ComCard from '@/components/ComPage/ComCard/index'
import Descriptions from '@/components/ComPage/Descriptions'
import FeeInfo from '../components/feeInfo'
import styles from './index.less'

const { DescriptionsItem } = Descriptions

interface infoProps {
  info: any
}

const StepOne = ({}: infoProps, ref: any) => {
  const [listData, setListData] = useState<any[]>([])
  const [tableForm] = Form.useForm()
  const [infoData, setInfoData] = useState<any>({})
  // console.log(tableForm)

  useEffect(() => {
    setInfoData({})
    setListData([
      {
        id: 1,
        name: '香港仓库',
        order: '444444444',
        time: '2022-04-09',
        editableKeys: [11],
        tables: [
          {
            id: 11,
            name: '小黄鸭1',
            amount: '',
          },
        ],
      },
      {
        id: 2,
        name: '香港仓库',
        order: '444444444',
        time: '2022-04-09',
        editableKeys: [22],
        tables: [
          {
            id: 22,
            name: '小黄鸭2',
            amount: '',
          },
        ],
      },
      {
        id: 3,
        name: '香港仓库',
        order: '444444444',
        time: '2022-04-09',
        editableKeys: [33],
        tables: [
          {
            id: 33,
            name: '小黄鸭3',
            amount: '',
          },
        ],
      },
    ])
  }, [])

  useImperativeHandle(ref, () => ({
    // 暴露给父组件的方法
    getBusinessData: async () => {
      try {
        console.log(33, listData)
        await tableForm.validateFields()
        const businessData = listData.map((item) => {
          const obj = {
            id: item.id,
            tables: [],
          }
          if (item.tables && item.tables.length) {
            obj.tables = item.tables.map((ss: any) => {
              return {
                id: ss.id,
                amount: ss.amount,
              }
            })
          }
          return obj
        })
        return {
          businessData,
        }
      } catch (error) {
        return ''
      }
    },
  }))

  const columns: ProColumns<any>[] = [
    {
      title: '商品条形码',
      dataIndex: 'barCode',
      width: '13%',
      editable: false,
    },
    {
      title: '描述 DESCRIPTION',
      dataIndex: 'goodName',
      width: '16%',
      editable: false,
    },
    {
      title: '品牌 BRAND',
      dataIndex: 'goodBrand',
      width: '13%',
      editable: false,
    },
    {
      title: '质押单价',
      dataIndex: 'price1',
      width: '13%',
      editable: false,
      render: (val) => formatAmount(val),
    },
    {
      title: '可赎回数量',
      dataIndex: 'count',
      width: '15%',
      editable: false,
      valueType: 'digit',
    },
    {
      title: <RequiredLabel label="赎回数量" />,
      dataIndex: 'amount',
      width: '15%',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项是必填项',
          },
        ],
      },
      renderFormItem: () => <IntergerInput />,
    },

    {
      title: '赎回总额',
      dataIndex: 'price2',
      width: '15%',
      editable: false,
      render: (val) => formatAmount(val),
    },
  ]

  return (
    <div className={styles.box}>
      {listData.map((item, i) => (
        <div className={styles.listitem} key={item.id}>
          <div style={{ margin: '12px 0' }}>
            <span>融资订单号:</span>
            <span style={{ marginLeft: 5, marginRight: 10 }}>{item.order};</span>
            <span>融资起止日期:</span>
            <span style={{ marginLeft: 5, marginRight: 10 }}>{item.time};</span>
            <span>货物所在仓库:</span>
            <span style={{ marginLeft: 5, marginRight: 10 }}>{item.name};</span>
          </div>
          <EditableProTable<any>
            rowKey="id"
            maxLength={5}
            columns={columns}
            value={item.tables}
            className="nopaddingtable"
            recordCreatorProps={false}
            scroll={{
              y: 500,
            }}
            editable={{
              // form: [Form.useForm()],
              editableKeys: item.editableKeys,
              onValuesChange: (record: any, recordList: any) => {
                console.log(1, recordList)
                const arr = listData
                listData[i].tables = recordList
                setListData(arr)
              },
              onChange: (value: any) => {
                const arr = listData
                listData[i].editableKeys = value
                setListData(arr)
              },
            }}
            summary={(pageData) => {
              let totalUsableCount = 0
              let totalBadCount = 0

              pageData.forEach(({ completeCount, imperfectCount }) => {
                if (completeCount) {
                  totalUsableCount += Number(completeCount)
                }
                if (imperfectCount) {
                  totalBadCount += Number(imperfectCount)
                }
              })
              return (
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0} colSpan={5}>
                    合计
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={1}>{totalUsableCount}</Table.Summary.Cell>
                  <Table.Summary.Cell index={2}>{totalBadCount}</Table.Summary.Cell>
                </Table.Summary.Row>
              )
            }}
          />
        </div>
      ))}
      {/* 费用信息 */}
      <FeeInfo infoData={[]} />

      <ComCard title="还款信息" style={{ marginTop: 12 }}>
        <Descriptions>
          <DescriptionsItem label="还款日期">{infoData.sellProduct}</DescriptionsItem>
          <DescriptionsItem label="还款总金额">
            {formatAmount(infoData.sellProduct)}
          </DescriptionsItem>
          <DescriptionsItem label="偿还代垫资金">{infoData.enterpriseDebt}</DescriptionsItem>
          <DescriptionsItem label="偿还代理服务费">{infoData.enterpriseDebt}</DescriptionsItem>
          <DescriptionsItem label="还款凭证水单">{infoData.enterpriseDebt}</DescriptionsItem>
          <DescriptionsItem label="申请订单编号">{infoData.enterpriseDebt}</DescriptionsItem>
          <DescriptionsItem label="审核状态">{infoData.enterpriseDebt}</DescriptionsItem>
        </Descriptions>
      </ComCard>
    </div>
  )
}

export default forwardRef(StepOne)
