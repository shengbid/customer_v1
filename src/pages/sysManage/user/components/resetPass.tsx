import React, { useState } from 'react'
import type { addModalProps } from '@/services/types'
import { Modal, Button, Form, Input, message } from 'antd'
import { resetPass } from '@/services'
import { passwordReg } from '@/utils/reg'
import { useIntl } from 'umi'

const ResetPass: React.FC<addModalProps> = ({ modalVisible, handleSubmit, handleCancel, info }) => {
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [form] = Form.useForm()
  const intl = useIntl()

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
    message.success(
      intl.formatMessage({
        id: 'sys.user.resetPassInfo',
      }),
    )
    handleSubmit()
    form.resetFields()
  }

  const cancel = () => {
    handleCancel()
    form.resetFields()
  }

  return (
    <Modal
      title={intl.formatMessage({
        id: 'sys.user.resetPass',
      })}
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
          label={intl.formatMessage({
            id: 'sys.user.newPass',
          })}
          name="password"
          rules={[
            {
              required: true,
              message: `${intl.formatMessage({
                id: 'pages.form.input',
              })}${intl.formatMessage({
                id: 'sys.user.newPass',
              })}`,
            },
            passwordReg,
          ]}
        >
          <Input />
        </Form.Item>

        <div className="modal-btns">
          <Button type="primary" htmlType="submit" loading={confirmLoading}>
            {intl.formatMessage({
              id: 'pages.btn.confirm',
            })}
          </Button>
          <Button onClick={cancel} className="cancel-btn">
            {intl.formatMessage({
              id: 'pages.btn.cancel',
            })}
          </Button>
        </div>
      </Form>
    </Modal>
  )
}

export default ResetPass
