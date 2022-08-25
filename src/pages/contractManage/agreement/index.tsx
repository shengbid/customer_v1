import React, { useState, useRef } from 'react'
import MenuProTable from '@/components/ComProtable/MenuProTable'
import type { contractListProps, contractListParamsProps } from '@/services/types'
import type { ProColumns, ActionType } from '@ant-design/pro-table'
import { Typography, Space } from 'antd'
// import { history } from 'umi'
import { getContractList, getDocusignSignUrl } from '@/services'
import DictSelect from '@/components/ComSelect'
import ExportFile from '@/components/ComUpload/exportFile'

const { Link } = Typography
// 合同协议管理列表
const Agreement: React.FC = () => {
  const [auditStatusData, setAuditStatusData] = useState<any>({})
  const [quatoStatusData, setQuatoStatusData] = useState<any>({})
  const [contractTypeData, setContractTypeData] = useState<any>([])
  const actionRef = useRef<ActionType>()

  const getList = async (param: contractListParamsProps) => {
    // console.log(param)
    const { rows, total } = await getContractList(param)

    return {
      data: rows,
      total,
    }
  }

  // 作废
  // const cancellation = async () => {
  //   message.success('作废成功')
  //   actionRef.current?.reload()
  // }
  const pathRoute = `${window.location.href}`
  // 发起签署
  const toSign = async (recored: any) => {
    await getDocusignSignUrl({ contractId: recored.id, returnUrl: pathRoute })
  }

  const columns: ProColumns<contractListProps>[] = [
    {
      title: '合同编号',
      dataIndex: 'contractNo',
      width: '9%',
    },
    {
      title: '合同名称',
      dataIndex: 'contractName',
      width: '17%',
    },
    {
      title: '合同类型',
      dataIndex: 'contractType',
      hideInSearch: true,
      width: '10%',
      render: (_, recored) => <>{contractTypeData[recored.contractType]}</>,
    },
    {
      title: '合同类型',
      key: 'contractType',
      dataIndex: 'contractType',
      hideInTable: true,
      renderFormItem: (_, { type }) => {
        if (type === 'form') {
          return null
        }
        return <DictSelect authorword="contract_type" getDictData={setContractTypeData} />
      },
    },
    {
      title: '签署方式',
      hideInSearch: true,
      dataIndex: 'signWay',
      width: '10%',
      render: (_, recored) => <>{quatoStatusData[recored.signWay]}</>,
    },
    {
      title: '签署方式',
      key: 'signWay',
      dataIndex: 'signWay',
      hideInTable: true,
      renderFormItem: (_, { type }) => {
        if (type === 'form') {
          return null
        }
        return <DictSelect authorword="sign_way" getDictData={setQuatoStatusData} />
      },
    },
    {
      title: '签署时间',
      dataIndex: 'signTime',
      hideInSearch: true,
      valueType: 'date',
    },
    {
      title: '签署时间',
      dataIndex: 'signTime',
      hideInTable: true,
      valueType: 'dateRange',
      search: {
        transform: (value: any) => ({
          signTimeStart: value[0],
          signTimeEnd: value[1],
        }),
      },
    },
    {
      title: '签署企业/收件人及状态',
      key: 'recipientsList',
      dataIndex: 'recipientsList',
      width: '19%',
      hideInSearch: true,
      render: (_, recored) => (
        <Space wrap>
          {recored.recipientsList.map((item: any) => (
            <span key={item.enterpriseId} style={item.signStatus === 1 ? { color: 'red' } : {}}>
              {item.enterpriseName}
            </span>
          ))}
        </Space>
      ),
    },
    {
      title: '签署状态',
      key: 'signStatus',
      dataIndex: 'signStatus',
      hideInSearch: true,
      render: (_, recored) => <>{auditStatusData[recored.signStatus]}</>,
    },
    {
      title: '签署状态',
      key: 'signStatus',
      dataIndex: 'signStatus',
      hideInTable: true,
      renderFormItem: (_, { type }) => {
        if (type === 'form') {
          return null
        }
        return <DictSelect authorword="sign_status" getDictData={setAuditStatusData} />
      },
    },
    {
      title: '操作',
      width: 120,
      key: 'option',
      valueType: 'option',
      render: (_, recored) => [
        recored.signStatus === 200 ? (
          <ExportFile
            url="/cus/agreement/downloadDoc"
            params={{ contractId: recored.id }}
            tableDown={true}
            title={recored.contractName}
          />
        ) : // <Link
        //   key="dis"
        //   onClick={cancellation}
        // >
        //   作废
        // </Link>
        null,
        recored.signStatus === 10 ? (
          <Link
            key="detail"
            onClick={() => {
              toSign(recored)
            }}
          >
            去签署
          </Link>
        ) : null,
      ],
    },
  ]
  return <MenuProTable<any> rowKey="id" actionRef={actionRef} request={getList} columns={columns} />
}

export default Agreement
