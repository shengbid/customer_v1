import React, { useState, useEffect } from 'react'
import { useIntl } from 'umi'
import { Modal, Row, Col, Input, message } from 'antd'
import { getCaptcha } from '@/services'
import { SecurityScanOutlined } from '@ant-design/icons'

interface addModalProps {
  modalVisible: boolean
  handleSubmit: (values: any) => void
  handleCancel: () => void
}

const ValidateModal: React.FC<addModalProps> = ({ modalVisible, handleSubmit, handleCancel }) => {
  const intl = useIntl()
  const [captcha, setCaptcha] = useState<string>('')
  const [captchaUid, setCaptchaUid] = useState<string>('')
  const [phoneCode, setPhoneCode] = useState<string>('')

  const handleOk = () => {
    if (phoneCode) {
      handleSubmit({
        code: phoneCode,
        uuid: captchaUid,
      })
    } else {
      message.warning('请先填写验证码!')
    }
  }

  // 获取图形验证码
  const getCaptchas = async () => {
    const { img, uuid } = await getCaptcha()
    if (img) {
      setCaptcha(`data:image/gif;base64,${img}`)
      setCaptchaUid(uuid)
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
      onOk={handleOk}
      cancelButtonProps={{ style: { display: 'none' } }}
      onCancel={handleCancel}
    >
      <Row>
        <Col span={6}>
          <a onClick={getCaptchas}>
            <img src={captcha} alt="" style={{ height: 39 }} />
          </a>
        </Col>
        <Col span={16}>
          <Input
            placeholder={intl.formatMessage({
              id: 'pages.login.code',
            })}
            value={phoneCode}
            onChange={(e) => {
              setPhoneCode(e.target.value)
            }}
            size="large"
            prefix={<SecurityScanOutlined />}
          />
        </Col>
      </Row>
    </Modal>
  )
}

export default ValidateModal
