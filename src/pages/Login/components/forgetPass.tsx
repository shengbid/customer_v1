import React, { useState, useRef } from 'react'
import { useIntl } from 'umi'
import { Modal, Button, Form, Input, message } from 'antd'
import type { addModalProps } from '@/services/types'
import { passwordReg } from '@/utils/reg'
import { ProFormCaptcha } from '@ant-design/pro-form'
import { LockOutlined, SecurityScanOutlined } from '@ant-design/icons'
import { getPhoneCaptcha, forgetPassWord } from '@/services'
import ValidateModal from './validate'
import PhoneInput from '@/components/Input/phoneInput'

const ForgetPass: React.FC<addModalProps> = ({ modalVisible, handleSubmit, handleCancel }) => {
  const intl = useIntl()
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [IsModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [form] = Form.useForm()
  const captchaRef = useRef<any>()

  const handleOk = async (values: any) => {
    setConfirmLoading(true)
    try {
      await forgetPassWord(values)
      setConfirmLoading(false)
    } catch (error) {
      setConfirmLoading(false)
      return
    }
    message.success(
      `${intl.formatMessage({
        id: 'pages.login.editPassSuccess',
      })}`,
    )
    handleSubmit()
    form.resetFields()
  }

  const cancel = () => {
    handleCancel()
    form.resetFields()
  }

  const handleValid = async () => {
    captchaRef.current?.startTiming()
    message.success('发送验证码成功')
    setIsModalVisible(false)
  }

  return (
    <>
      <Modal
        title={intl.formatMessage({
          id: 'pages.login.forgetPass',
        })}
        maskClosable={false}
        destroyOnClose
        width={500}
        visible={modalVisible}
        footer={false}
        onCancel={cancel}
      >
        <Form
          name="basic"
          // labelCol={{ span: 4 }}
          // wrapperCol={{ span: 18 }}
          onFinish={handleOk}
          initialValues={{ phoneArea: '1' }}
          form={form}
          autoComplete="off"
        >
          <PhoneInput icon />

          <ProFormCaptcha
            fieldProps={{
              size: 'large',
              prefix: <SecurityScanOutlined />,
            }}
            captchaProps={{
              size: 'large',
            }}
            fieldRef={captchaRef}
            placeholder={`${intl.formatMessage({
              id: 'pages.form.input',
            })}${intl.formatMessage({
              id: 'pages.login.code',
            })}`}
            captchaTextRender={(timing, count) => {
              if (timing) {
                return `${count} ${intl.formatMessage({
                  id: 'pages.login.getcode',
                })}`
              }
              return intl.formatMessage({
                id: 'pages.login.getcode',
              })
            }}
            name="phoneCode"
            phoneName="phone"
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
            onGetCaptcha={async (phone) => {
              const result = await getPhoneCaptcha({ phone, loginType: 'phone' })
              if (result.code === 2022) {
                setIsModalVisible(true)
                throw new Error('需要进行安全校验')
              } else {
                message.success(
                  intl.formatMessage({
                    id: 'pages.login.getcodeSuccess',
                  }),
                )
              }
            }}
          />

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: `${intl.formatMessage({
                  id: 'pages.form.input',
                })}${intl.formatMessage({
                  id: 'pages.login.newPass',
                })}`,
              },
              passwordReg,
            ]}
          >
            <Input
              placeholder={intl.formatMessage({
                id: 'pages.login.newPass',
              })}
              size="large"
              maxLength={20}
              prefix={<LockOutlined />}
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: `${intl.formatMessage({
                  id: 'pages.form.input',
                })}${intl.formatMessage({
                  id: 'pages.login.confirmPass',
                })}`,
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(
                    new Error(
                      intl.formatMessage({
                        id: 'pages.login.confirmPasstip',
                      }),
                    ),
                  )
                },
              }),
            ]}
          >
            <Input
              placeholder={intl.formatMessage({
                id: 'pages.login.confirmPass',
              })}
              maxLength={20}
              size="large"
              prefix={<LockOutlined />}
            />
          </Form.Item>

          <div className="modal-btns">
            <Button onClick={cancel}>
              {intl.formatMessage({
                id: 'pages.login.backlogin',
              })}
            </Button>
            <Button
              type="primary"
              className="cancel-btn"
              htmlType="submit"
              loading={confirmLoading}
            >
              {intl.formatMessage({
                id: 'pages.login.confirm',
              })}
            </Button>
          </div>
        </Form>
      </Modal>

      <ValidateModal
        modalVisible={IsModalVisible}
        phone={form.getFieldValue('phone')}
        handleCancel={() => {
          setIsModalVisible(false)
        }}
        handleSubmit={handleValid}
      />
    </>
  )
}

export default ForgetPass
