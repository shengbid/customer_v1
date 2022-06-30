import React, { useState } from 'react'
import { Modal, Button, message } from 'antd'
import type { addModalProps } from '@/services/types'
import { addProcessFile } from '@/services'
import UploadAndDrop from '@/components/ComUpload/uploadAndDrag'
import { useIntl } from 'umi'

const AddModal: React.FC<addModalProps> = ({ modalVisible, handleSubmit, handleCancel }) => {
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [uploadFile, setUploadFile] = useState<any>([])
  const intl = useIntl()

  const handleOk = async () => {
    setConfirmLoading(true)
    try {
      if (uploadFile?.length) {
        const formData = new FormData()
        formData.append('file', uploadFile[0])
        await addProcessFile(formData)
      } else {
        message.error('请选择需要部署的流程文件！')
      }
      setConfirmLoading(false)
    } catch (error) {
      setConfirmLoading(false)
      return
    }
    message.success(
      `${intl.formatMessage({
        id: 'pages.form.success',
      })}`,
    )
    handleSubmit()
  }

  const changeFile = (value: any) => {
    console.log(value)
    setUploadFile(value)
  }

  const footer = [
    <Button
      key="confirm"
      type="primary"
      onClick={handleOk}
      htmlType="submit"
      loading={confirmLoading}
    >
      {intl.formatMessage({
        id: 'pages.btn.confirm',
      })}
    </Button>,
    <Button key="cancel" onClick={handleCancel} className="cancel-btn">
      {intl.formatMessage({
        id: 'pages.btn.cancel',
      })}
    </Button>,
  ]
  return (
    <Modal
      title={`部署流程文件`}
      maskClosable={false}
      destroyOnClose
      width={600}
      visible={modalVisible}
      footer={footer}
      onCancel={handleCancel}
    >
      <div>
        <UploadAndDrop key="export" onChange={changeFile} />
      </div>
    </Modal>
  )
}

export default AddModal
