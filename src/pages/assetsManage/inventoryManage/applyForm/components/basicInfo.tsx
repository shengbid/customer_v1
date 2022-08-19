import React, { useEffect, useState } from 'react'
import ComCard from '@/components/ComPage/ComCard'
import Descriptions from '@/components/ComPage/Descriptions'
import DictShow from '@/components/ComSelect/dictShow'

const { DescriptionsItem } = Descriptions

interface infoProps {
  id: string
}

const BasicInfo: React.FC<infoProps> = () => {
  const [approvalData, setApprovalData] = useState<any>({})
  const [basicData, setBasicData] = useState<any>({})

  useEffect(() => {
    setApprovalData({})
    setBasicData({})
  }, [])

  return (
    <>
      <ComCard title="审批信息">
        <Descriptions>
          <DescriptionsItem label="状态">
            <DictShow dictValue={approvalData.identityType} dictkey="cus_sfzlx" />
          </DescriptionsItem>
          <DescriptionsItem label="审批时间">{approvalData.identityNumber}</DescriptionsItem>
          <DescriptionsItem label="审批备注">{approvalData.identityNumber}</DescriptionsItem>
        </Descriptions>
      </ComCard>

      <ComCard title="基础信息">
        <Descriptions>
          <DescriptionsItem label="仓库">{basicData.frName}</DescriptionsItem>
          <DescriptionsItem label="状态">
            <DictShow dictValue={basicData.identityType} dictkey="cus_sfzlx" />
          </DescriptionsItem>
          <DescriptionsItem label="申请时间">{basicData.frName}</DescriptionsItem>
        </Descriptions>
      </ComCard>
    </>
  )
}

export default BasicInfo
