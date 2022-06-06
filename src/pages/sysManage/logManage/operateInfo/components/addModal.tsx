import React, { useState, useEffect } from 'react'
import { Modal, Spin } from 'antd'
import type { operateInfoProps } from '@/services/types'
import { useIntl } from 'umi'
import ComDescriptions from '@/components/ComPage/Descriptions'
const { DescriptionsItem } = ComDescriptions

interface addModalProps {
  modalVisible: boolean
  handleCancel: () => void
  info: any
  extraInfo: any
}
const AddModal: React.FC<addModalProps> = ({ modalVisible, handleCancel, info, extraInfo }) => {
  const [spinning, setSpinning] = useState<boolean>(false)
  const [infoData, setInfoData] = useState<operateInfoProps>()

  const intl = useIntl()
  const text = info
    ? intl.formatMessage({
        id: 'pages.btn.edit',
      })
    : intl.formatMessage({
        id: 'pages.btn.add',
      })

  const getDetail = () => {
    setSpinning(true)
    setInfoData({ ...extraInfo })
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
      title={`${text}${intl.formatMessage({
        id: 'sys.operate.name',
      })}`}
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
              id: 'sys.operate.title',
            })}
          >
            {infoData?.title}
          </DescriptionsItem>
          <DescriptionsItem
            label={intl.formatMessage({
              id: 'sys.operate.operUrl',
            })}
          >
            {infoData?.operUrl}
          </DescriptionsItem>
          <DescriptionsItem
            label={intl.formatMessage({
              id: 'sys.operate.loginInfo',
            })}
          >
            {infoData?.operName}/{infoData?.operIp}/{infoData?.operLocation}
          </DescriptionsItem>
          <DescriptionsItem
            label={intl.formatMessage({
              id: 'sys.operate.requestMethod',
            })}
          >
            {infoData?.requestMethod}
          </DescriptionsItem>
          <DescriptionsItem
            label={intl.formatMessage({
              id: 'sys.operate.method',
            })}
            span={2}
          >
            {infoData?.method}
          </DescriptionsItem>
          <DescriptionsItem
            label={intl.formatMessage({
              id: 'sys.operate.operParam',
            })}
            span={2}
          >
            {infoData?.operParam}
          </DescriptionsItem>
          <DescriptionsItem
            label={intl.formatMessage({
              id: 'sys.operate.jsonResult',
            })}
            span={2}
          >
            {infoData?.jsonResult}
          </DescriptionsItem>
          <DescriptionsItem
            label={intl.formatMessage({
              id: 'sys.operate.operatorType',
            })}
          >
            {infoData?.operatorType}
          </DescriptionsItem>
          <DescriptionsItem
            label={intl.formatMessage({
              id: 'sys.operate.operTime',
            })}
          >
            {infoData?.operTime}
          </DescriptionsItem>
        </ComDescriptions>
      </Spin>
    </Modal>
  )
}

export default AddModal
