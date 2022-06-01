import React, { useState, useEffect } from 'react'
import ComCard from '@/components/ComCard'
import { useIntl } from 'umi'
import { Row, Col, Avatar, Tabs, Button, Form, Input, message, Spin } from 'antd'
import {
  UserOutlined,
  MobileOutlined,
  MailOutlined,
  ApartmentOutlined,
  TeamOutlined,
  CalendarOutlined,
} from '@ant-design/icons'
import type { userProps } from '@/services/types'
import { queryUserCenter, updatePassWord } from '@/services'
import DictSelect from '@/components/ComSelect'
import { emailReg, passwordReg, phoneReg } from '@/utils/reg'
import style from './index.less'

const { TabPane } = Tabs

const PersonalCenter: React.FC = () => {
  const [userInfo, setUserInfo] = useState<userProps>()
  const [spinning, setSpinning] = useState<boolean>(false)
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)

  const [form] = Form.useForm()
  const [formPass] = Form.useForm()

  const getInfo = async () => {
    setSpinning(true)
    const { data, roleGroup } = await queryUserCenter()
    setSpinning(false)
    setUserInfo({ ...data, roleGroup })
    form.setFieldsValue(data)
  }

  useEffect(() => {
    getInfo()
  }, [])

  const intl = useIntl()

  const handleOk = async (values: any) => {
    setConfirmLoading(true)
    try {
      await queryUserCenter(values)
      setConfirmLoading(false)
    } catch (error) {
      setConfirmLoading(false)
      return
    }
    getInfo()
    message.success(intl.formatMessage({ id: 'pages.form.edit' }))
  }

  const updatePass = async (values: any) => {
    setConfirmLoading(true)
    try {
      await updatePassWord(values)
      setConfirmLoading(false)
    } catch (error) {
      setConfirmLoading(false)
      return
    }
    message.success(intl.formatMessage({ id: 'pages.form.edit' }))
  }

  return (
    <div className={style.contanier}>
      <Row gutter={24}>
        <Col span={7}>
          <ComCard title={intl.formatMessage({ id: 'sys.user.title' })}>
            <div className={style.avatar}>
              <Avatar className={style.img} size={100}>
                {userInfo?.nickName?.substring(0, 1)}
              </Avatar>
            </div>
            <ul className={style.list}>
              <li className={style.item}>
                <UserOutlined />
                <span>{intl.formatMessage({ id: 'sys.user.userName' })}</span>
                <span className={style.right}>{userInfo?.userName}</span>
              </li>
              <li className={style.item}>
                <MobileOutlined />
                <span>{intl.formatMessage({ id: 'sys.user.phonenumber' })}</span>
                <span className={style.right}>{userInfo?.phonenumber}</span>
              </li>
              <li className={style.item}>
                <MailOutlined />
                <span>{intl.formatMessage({ id: 'sys.user.email1' })}</span>
                <span className={style.right}>{userInfo?.email}</span>
              </li>
              <li className={style.item}>
                <ApartmentOutlined />
                <span>{intl.formatMessage({ id: 'sys.user.dept1' })}</span>
                <span className={style.right}>{userInfo?.dept?.deptName}</span>
              </li>
              <li className={style.item}>
                <TeamOutlined />
                <span>{intl.formatMessage({ id: 'sys.user.role' })}</span>
                <span className={style.right}>{userInfo?.roleGroup}</span>
              </li>
              <li className={style.item}>
                <CalendarOutlined />
                <span>{intl.formatMessage({ id: 'sys.base.createTime' })}</span>
                <span className={style.right}>{userInfo?.createTime}</span>
              </li>
            </ul>
          </ComCard>
        </Col>
        <Col span={17}>
          <ComCard bodyStyle={{ padding: 24 }} title={intl.formatMessage({ id: 'sys.user.base' })}>
            <Spin spinning={spinning}>
              <Tabs defaultActiveKey="1">
                <TabPane tab={intl.formatMessage({ id: 'sys.user.base' })} key="1">
                  <Form
                    name="basic"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 18 }}
                    onFinish={handleOk}
                    form={form}
                    autoComplete="off"
                  >
                    <Form.Item label="id" name="userId" style={{ display: 'none' }}>
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label={intl.formatMessage({ id: 'sys.user.nickName' })}
                      name="nickName"
                      rules={[
                        {
                          required: true,
                          message: `${intl.formatMessage({
                            id: 'pages.form.input',
                          })}${intl.formatMessage({ id: 'sys.user.nickName' })}`,
                        },
                      ]}
                    >
                      <Input maxLength={50} />
                    </Form.Item>

                    <Form.Item
                      label={intl.formatMessage({ id: 'sys.user.phonenumber' })}
                      name="phonenumber"
                      rules={[
                        {
                          required: true,
                          message: `${intl.formatMessage({
                            id: 'pages.form.input',
                          })}${intl.formatMessage({ id: 'sys.user.phonenumber' })}`,
                        },
                        phoneReg,
                      ]}
                    >
                      <Input maxLength={11} />
                    </Form.Item>

                    <Form.Item
                      label={intl.formatMessage({ id: 'sys.user.email' })}
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: `${intl.formatMessage({
                            id: 'pages.form.input',
                          })}${intl.formatMessage({ id: 'sys.user.email' })}`,
                        },
                        emailReg,
                      ]}
                    >
                      <Input maxLength={50} />
                    </Form.Item>

                    <Form.Item
                      label={intl.formatMessage({ id: 'sys.user.sex' })}
                      name="sex"
                      rules={[
                        {
                          required: true,
                          message: `${intl.formatMessage({
                            id: 'pages.form.select',
                          })}${intl.formatMessage({ id: 'sys.user.sex' })}`,
                        },
                      ]}
                    >
                      <DictSelect authorword="sys_user_sex" type="radio" />
                    </Form.Item>

                    <div className="middle-btns">
                      <Button type="primary" htmlType="submit" loading={confirmLoading}>
                        {intl.formatMessage({ id: 'pages.btn.confirm' })}
                      </Button>
                    </div>
                  </Form>
                </TabPane>
                <TabPane tab={intl.formatMessage({ id: 'sys.user.editPass' })} key="2">
                  <Form
                    name="basic"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 18 }}
                    onFinish={updatePass}
                    form={formPass}
                    autoComplete="off"
                  >
                    <Form.Item
                      label={intl.formatMessage({ id: 'sys.user.oldPass' })}
                      name="oldPassword"
                      rules={[
                        {
                          required: true,
                          message: `${intl.formatMessage({
                            id: 'pages.form.input',
                          })}${intl.formatMessage({ id: 'sys.user.oldPass' })}`,
                        },
                      ]}
                    >
                      <Input maxLength={20} />
                    </Form.Item>

                    <Form.Item
                      label={intl.formatMessage({ id: 'sys.user.newPass' })}
                      name="newPassword"
                      rules={[
                        {
                          required: true,
                          message: `${intl.formatMessage({
                            id: 'pages.form.input',
                          })}${intl.formatMessage({ id: 'sys.user.newPass' })}`,
                        },
                        passwordReg,
                      ]}
                    >
                      <Input maxLength={20} />
                    </Form.Item>

                    <Form.Item
                      label={intl.formatMessage({ id: 'sys.user.confirmPass' })}
                      name="confirmPassword"
                      rules={[
                        {
                          required: true,
                          message: `${intl.formatMessage({
                            id: 'pages.form.input',
                          })}${intl.formatMessage({ id: 'sys.user.confirmPass' })}`,
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue('newPassword') === value) {
                              return Promise.resolve()
                            }
                            return Promise.reject(
                              new Error(intl.formatMessage({ id: 'sys.user.noMatchPass' })),
                            )
                          },
                        }),
                      ]}
                    >
                      <Input maxLength={20} />
                    </Form.Item>

                    <div className="middle-btns">
                      <Button type="primary" htmlType="submit" loading={confirmLoading}>
                        {intl.formatMessage({ id: 'pages.btn.confirm' })}
                      </Button>
                    </div>
                  </Form>
                </TabPane>
              </Tabs>
            </Spin>
          </ComCard>
        </Col>
      </Row>
    </div>
  )
}

export default PersonalCenter
