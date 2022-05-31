import React, { useState } from 'react'
import type { addModalProps } from '@/services/types'
import { Modal, Button, Form, Input, message } from 'antd'
import { resetPass } from '@/services'
import { passwordReg } from '@/utils/reg'

const ResetPass: React.FC<addModalProps> = ({ modalVisible, handleSubmit, handleCancel, info }) => {
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [form] = Form.useForm()

  const handleOk = async (values: any) => {
    // console.log(values)
    setConfirmLoading(true)
    try {
      await resetPass({ ...values, userId: info })
      setConfirmLoading(false)
    } catch (error) {
      setConfirmLoading(false)
      return
    }
    message.success(`重置成功`)
    handleSubmit()
    form.resetFields()
  }

  const cancel = () => {
    handleCancel()
    form.resetFields()
  }

  return (
    <Modal
      title={`重置密码`}
      maskClosable={false}
      destroyOnClose
      width={600}
      visible={modalVisible}
      footer={false}
      onCancel={cancel}
    >
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        onFinish={handleOk}
        form={form}
        autoComplete="off"
      >
        <Form.Item
          label="新密码"
          name="password"
          rules={[{ required: true, message: '请输入新密码!' }, passwordReg]}
        >
          <Input />
        </Form.Item>

        <div className="modal-btns">
          <Button type="primary" htmlType="submit" loading={confirmLoading}>
            确定
          </Button>
          <Button onClick={cancel} className="cancel-btn">
            取消
          </Button>
        </div>
      </Form>
    </Modal>
  )
}

export default ResetPass
