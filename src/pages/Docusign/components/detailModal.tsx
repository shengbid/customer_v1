import React from 'react'
import { Modal, Button, Form, Input } from 'antd'
import { emailReg, phoneReg } from '@/utils/reg'

interface modalPrps {
  modalVisible: boolean
  handleSubmit: (value: any) => void
  handleCancel: () => void
  signType?: number
}
const DetailModal: React.FC<modalPrps> = ({
  signType = 1,
  modalVisible,
  handleSubmit,
  handleCancel,
}) => {
  const [form] = Form.useForm()
  const initialValues = {
    signerName: 'ShouMei Lai',
    signerEmail: 'lsm2022@163.com',
    countryCode: '+86',
    phoneNumber: '18033098150',
  }
  const text = '填写个人信息'

  const handleOk = async (values: any) => {
    handleSubmit(values)
    // form.resetFields()
  }

  const cancel = () => {
    handleCancel()
    form.resetFields()
  }

  return (
    <Modal
      title={`${text}`}
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
        initialValues={initialValues}
        wrapperCol={{ span: 18 }}
        onFinish={handleOk}
        form={form}
        autoComplete="off"
      >
        <Form.Item
          label="姓名"
          name="signerName"
          rules={[
            {
              required: true,
              message: `请输入姓名`,
            },
          ]}
        >
          <Input placeholder="" maxLength={50} />
        </Form.Item>
        <Form.Item
          label="邮箱"
          name="signerEmail"
          rules={[
            emailReg,
            {
              required: true,
              message: `请输入邮箱`,
            },
          ]}
        >
          <Input maxLength={50} />
        </Form.Item>
        {signType === 2 ? (
          <>
            <Form.Item
              label="地区编码"
              name="countryCode"
              rules={[
                {
                  required: true,
                  message: `请输入地区编码`,
                },
              ]}
            >
              <Input maxLength={50} />
            </Form.Item>
            <Form.Item
              label="电话"
              name="phoneNumber"
              rules={[
                phoneReg,
                {
                  required: true,
                  message: `请输入电话`,
                },
              ]}
            >
              <Input maxLength={50} />
            </Form.Item>
          </>
        ) : null}

        <div className="modal-btns">
          <Button type="primary" htmlType="submit">
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

export default DetailModal
