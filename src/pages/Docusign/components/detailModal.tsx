import React, { useState } from 'react'
import { Modal, Button, Form, Input, Select } from 'antd'
import { emailReg, phoneReg } from '@/utils/reg'

const { Option } = Select

interface modalPrps {
  modalVisible: boolean
  handleSubmit: (value: any) => void
  handleCancel: () => void
  templateInfo: any
  signType?: number
}
const DetailModal: React.FC<modalPrps> = ({
  signType = 1,
  modalVisible,
  handleSubmit,
  handleCancel,
  templateInfo,
}) => {
  const [form] = Form.useForm()
  const [isPhoneVialid, setIsPhoneViad] = useState<boolean>(false)

  const initialValues = {
    signerName: 'ShouMei Lai',
    signerEmail: 'lsm2022@163.com',
    countryCode: '+86',
    phoneNumber: '18033098150',
    templateId: '2f9bf387-68e4-4168-b90a-df821830161c',
    // templateId: 'bc831ebc-6160-4d68-b9f4-036b7932e3d6',
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
        <Form.Item
          label="签约角色"
          name="roleName"
          rules={[
            {
              required: true,
              message: `请选择签约角色`,
            },
          ]}
        >
          <Select
            style={{ width: '100%' }}
            onChange={(value: string) => {
              if (value === 'partyB') {
                setIsPhoneViad(true)
              } else {
                setIsPhoneViad(false)
              }
            }}
          >
            <Option value="partyA">甲方</Option>
            <Option value="partyB">乙方</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="签约模板"
          name="templateId"
          rules={[
            {
              required: true,
              message: `请选择签约模板`,
            },
          ]}
        >
          <Select style={{ width: '100%' }} disabled>
            <Option value={templateInfo.templateId}>{templateInfo.name}</Option>
          </Select>
        </Form.Item>
        {signType === 2 || isPhoneVialid ? (
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
