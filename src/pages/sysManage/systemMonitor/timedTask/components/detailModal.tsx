import React, { useState, useEffect } from 'react'
import { Modal, Spin } from 'antd'
import type { timedTaskProps, addModalProps } from '@/services/types'
import { timedTaskDetail } from '@/services'
import { useIntl } from 'umi'
import ComDescriptions from '@/components/ComPage/Descriptions'
import { sysJobData, sysJobBFData, sysJobCLData, statusData } from '@/utils/dictData'
const { DescriptionsItem } = ComDescriptions

const AddModal: React.FC<addModalProps> = ({ modalVisible, handleCancel, info }) => {
  const [spinning, setSpinning] = useState<boolean>(false)
  const [infoData, setInfoData] = useState<timedTaskProps>({})

  const intl = useIntl()

  const getDetail = async () => {
    setSpinning(true)
    const { data } = await timedTaskDetail(info)
    setInfoData(data)
    setSpinning(false)
  }

  useEffect(() => {
    if (modalVisible && info) {
      getDetail()
    }
  }, [modalVisible])

  const cancel = () => {
    handleCancel()
  }

  return (
    <Modal
      title={intl.formatMessage({
        id: 'sys.timedTask.taskInfo',
      })}
      maskClosable={false}
      destroyOnClose
      width={600}
      visible={modalVisible}
      footer={false}
      onCancel={cancel}
    >
      <Spin spinning={spinning}>
        <ComDescriptions column={2}>
          <DescriptionsItem
            label={intl.formatMessage({
              id: 'sys.timedTask.jobId',
            })}
          >
            {infoData?.jobId}
          </DescriptionsItem>
          <DescriptionsItem
            label={intl.formatMessage({
              id: 'sys.timedTask.jobGroup',
            })}
          >
            {sysJobData[infoData.jobGroup]}
          </DescriptionsItem>
          <DescriptionsItem
            label={intl.formatMessage({
              id: 'sys.timedTask.jobName',
            })}
          >
            {infoData?.jobName}
          </DescriptionsItem>
          <DescriptionsItem
            label={intl.formatMessage({
              id: 'sys.base.createTime',
            })}
          >
            {infoData?.createTime}
          </DescriptionsItem>
          <DescriptionsItem
            label={intl.formatMessage({
              id: 'sys.timedTask.cronExpression',
            })}
          >
            {infoData?.cronExpression}
          </DescriptionsItem>
          <DescriptionsItem
            label={intl.formatMessage({
              id: 'sys.timedTask.nextValidTime',
            })}
          >
            {infoData?.nextValidTime}
          </DescriptionsItem>
          <DescriptionsItem
            label={intl.formatMessage({
              id: 'sys.timedTask.invokeTarget',
            })}
            span={2}
          >
            {infoData?.invokeTarget}
          </DescriptionsItem>
          <DescriptionsItem
            label={intl.formatMessage({
              id: 'sys.timedTask.status',
            })}
          >
            {statusData[infoData.status]}
          </DescriptionsItem>
          <DescriptionsItem
            label={intl.formatMessage({
              id: 'sys.timedTask.concurrent',
            })}
          >
            {sysJobBFData[infoData.concurrent]}
          </DescriptionsItem>
          <DescriptionsItem
            label={intl.formatMessage({
              id: 'sys.timedTask.misfirePolicy',
            })}
          >
            {sysJobCLData[infoData.misfirePolicy]}
          </DescriptionsItem>
        </ComDescriptions>
      </Spin>
    </Modal>
  )
}

export default AddModal
