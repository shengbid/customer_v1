import React, { useState, useEffect } from 'react'
import { useIntl } from 'umi'
import { Modal, Row, Col, Input, message, Form, Button } from 'antd'
import { getCaptcha, getPhoneCaptcha } from '@/services'
import { SecurityScanOutlined } from '@ant-design/icons'

interface addModalProps {
  phone: string
  modalVisible: boolean
  handleSubmit: () => void
  handleCancel: () => void
}

const ValidateModal: React.FC<addModalProps> = ({
  phone,
  modalVisible,
  handleSubmit,
  handleCancel,
}) => {
  const intl = useIntl()
  const [captcha, setCaptcha] = useState<string>('')
  const [captchaUid, setCaptchaUid] = useState<string>('')

  const [form] = Form.useForm()
  // 获取图形验证码
  const getCaptchas = async () => {
    const { img, uuid } = await getCaptcha()
    if (img) {
      setCaptcha(`data:image/gif;base64,${img}`)
      setCaptchaUid(uuid)
    }
  }

  const handleOk = async (values: any) => {
    const { code, msg } = await getPhoneCaptcha({
      code: values.phoneCode,
      uuid: captchaUid,
      loginType: 'phone',
      phone,
    })
    if (Number(code) === 2022) {
      message.error(msg)
      getCaptchas()
    } else {
      handleSubmit()
      form.resetFields()
    }
  }

  useEffect(() => {
    if (modalVisible) {
      getCaptchas()
    }
  }, [modalVisible])

  return (
    <Modal
      title={intl.formatMessage({
        id: 'pages.login.valitTilte',
      })}
      visible={modalVisible}
      footer={false}
      onCancel={handleCancel}
    >
      <Form
        form={form}
        // wrapperCol={{ span: 18 }}
        onFinish={handleOk}
        autoComplete="off"
      >
        <Row>
          <Col span={6}>
            <a onClick={getCaptchas}>
              <img src={captcha} alt="" style={{ height: 39 }} />
            </a>
          </Col>

          <Col span={16}>
            <Form.Item
              name="phoneCode"
              rules={[
                {
                  required: true,
                  message: `${intl.formatMessage({
                    id: 'pages.form.input',
                  })}${intl.formatMessage({
                    id: 'pages.login.code',
                  })}`,
                },
              ]}
            >
              <Input
                placeholder={intl.formatMessage({
                  id: 'pages.login.code',
                })}
                // value={phoneCode}
                // onChange={(e) => {
                //   setPhoneCode(e.target.value)
                // }}
                size="large"
                prefix={<SecurityScanOutlined />}
              />
            </Form.Item>
          </Col>
        </Row>
        <div className="modal-btns">
          <Button type="primary" htmlType="submit">
            {intl.formatMessage({
              id: 'pages.btn.confirm',
            })}
          </Button>
        </div>
      </Form>
    </Modal>
  )
}

export default ValidateModal
