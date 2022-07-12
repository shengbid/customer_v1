import React, { useState } from 'react'
import { useIntl } from 'umi'
import { Modal, Button, Form, Input, message } from 'antd'
import type { addModalProps } from '@/services/types'
import { passwordReg, phoneReg } from '@/utils/reg'
import DictSelect from '@/components/ComSelect'
import { ProFormCaptcha } from '@ant-design/pro-form'
import { LockOutlined, MobileOutlined } from '@ant-design/icons'
import { getPhoneCaptcha, forgetPassWord } from '@/services'
import ValidateModal from './validate'

const ForgetPass: React.FC<addModalProps> = ({ modalVisible, handleSubmit, handleCancel }) => {
  const intl = useIntl()
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [IsModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [form] = Form.useForm()
  const [validaInfo, setValidaInfo] = useState<any>()

  const handleOk = async (values: any) => {
    setConfirmLoading(true)
    try {
      await forgetPassWord({
        ...values,
        ...validaInfo,
      })
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

  const handleValid = (values: any) => {
    console.log(values)
    setValidaInfo(values)
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
          <Input.Group>
            <Form.Item name="phoneArea" style={{ width: '30%', display: 'inline-block' }}>
              <DictSelect size="large" authorword="phone_code" allowClear={false} />
            </Form.Item>
            <Form.Item
              style={{ width: '70%', display: 'inline-block' }}
              name="phone"
              rules={[
                {
                  required: true,
                  message: `${intl.formatMessage({
                    id: 'pages.form.input',
                  })}${intl.formatMessage({
                    id: 'pages.login.phone',
                  })}`,
                },
                phoneReg,
              ]}
            >
              <Input
                size="large"
                placeholder={intl.formatMessage({
                  id: 'pages.login.phone',
                })}
                autoComplete="off"
                prefix={<MobileOutlined />}
              />
            </Form.Item>
          </Input.Group>
          <ProFormCaptcha
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined />,
            }}
            captchaProps={{
              size: 'large',
            }}
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
            name="newPassword"
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
              maxLength={50}
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
                  if (!value || getFieldValue('newPassword') === value) {
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
              maxLength={50}
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
        handleCancel={() => {
          setIsModalVisible(false)
        }}
        handleSubmit={handleValid}
      />
    </>
  )
}

export default ForgetPass
