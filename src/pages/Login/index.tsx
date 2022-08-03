import { LockOutlined, UserOutlined, SecurityScanOutlined } from '@ant-design/icons'
import { Alert, message, Tabs, Row, Col, Modal, Input, Form, Button } from 'antd'
import React, { useState, useEffect, useRef } from 'react'
import { ProFormCaptcha, ProFormText, LoginForm } from '@ant-design/pro-form'
import { history, useModel, SelectLang, useIntl } from 'umi'
import Footer from '@/components/Footer'
import {
  login,
  getAuthorRoutes,
  queryCurrentUser,
  getCaptcha,
  getPhoneCaptcha,
  updatePassWord,
} from '@/services'
import type { loginProps, LoginResult } from '@/services/types'
import Cookies from 'js-cookie'
import logo from '@/assets/home/logo.jpg'
import { handleMenuData } from '@/utils/menu'
import { passwordReg } from '@/utils/reg'
import ForgetPass from './components/forgetPass'
import PhoneInput from '@/components/Input/phoneInput'

import styles from './index.less'

const LoginMessage: React.FC<{
  content: string
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
)

const Login: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState<LoginResult>({})
  const [type, setType] = useState<string>('account')
  const [captcha, setCaptcha] = useState<string>('')
  const [captchaUid, setCaptchaUid] = useState<string>('')
  const [phoneCode, setPhoneCode] = useState<string>('')
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [passModalVisible, setPassModalVisible] = useState<boolean>(false)
  const [forgetModalVisible, setForgetModalVisible] = useState<boolean>(false)
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const { setInitialState } = useModel('@@initialState')
  const [form] = Form.useForm()
  const [passform] = Form.useForm()
  const captchaRef = useRef<any>()

  const intl = useIntl()

  // 获取图形验证码
  const getCaptchas = async () => {
    const { img, uuid } = await getCaptcha()
    if (img) {
      setCaptcha(`data:image/gif;base64,${img}`)
      setCaptchaUid(uuid)
    }
  }

  useEffect(() => {
    getCaptchas()
  }, [])

  // 提交手机超次数验证码
  const handleOk = async () => {
    if (!phoneCode) {
      message.warning('请先填写验证码!')
      return
    }
    const { code, msg } = await getPhoneCaptcha({
      code: phoneCode,
      uuid: captchaUid,
      loginType: type,
      phone: form.getFieldValue('phone'),
    })
    if (Number(code) === 2022) {
      message.error(msg)
      getCaptchas()
    } else {
      setIsModalVisible(false)
      captchaRef.current?.startTiming()
      message.success(
        intl.formatMessage({
          id: 'pages.login.getcodeSuccess',
        }),
      )
    }
  }

  const fetchUserInfo = async () => {
    // console.log(initialState)
    const { user, roles, permissions } = await queryCurrentUser()
    const { data } = await getAuthorRoutes()
    if (user) {
      await setInitialState((s: any) => ({
        ...s,
        menus: handleMenuData(data),
        currentUser: { ...user, permissionRoles: roles, permissions },
      }))
    }
  }

  const handleSubmit = async (values: loginProps) => {
    try {
      // 登录
      if (type === 'phone') {
        Reflect.set(values, 'username', values.phone)
      }
      const { data } = await login({ ...values, uuid: captchaUid, loginType: type })
      if (data.passwordFlag) {
        // 首次登录修改密码
        setPassModalVisible(true)
        return
      }
      if (data.access_token) {
        Cookies.set('token', data.access_token)
      }
      if (data) {
        message.success(
          intl.formatMessage({
            id: 'pages.login.loginSuccess',
          }),
        )
        await fetchUserInfo()
        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return
        const { query } = history.location
        const { redirect } = query as { redirect: string }
        const applyRoute: any[] = ['/finance/create/form'] // 申请页面退出,重新登录,到首页
        if (redirect && !applyRoute.includes(redirect)) {
          history.push(redirect)
        } else {
          history.push('/welcome')
        }
        return
      }

      // 如果失败去设置用户错误信息
      setUserLoginState({ status: 'error', type })
    } catch (error) {
      getCaptchas()
      message.error(
        intl.formatMessage({
          id: 'pages.login.loginError2',
        }),
      )
    }
  }

  // 修改密码
  const handlePass = async (values: any) => {
    setConfirmLoading(true)
    try {
      await updatePassWord({
        userName: type === 'phone' ? form.getFieldValue('phone') : form.getFieldValue('username'),
        // oldPassword: form.getFieldValue('password'),
        ...values,
      })
      message.success(
        intl.formatMessage({
          id: 'pages.login.editPassSuccess',
        }),
      )
      setConfirmLoading(false)
      setPassModalVisible(false)
    } catch (error) {
      setConfirmLoading(false)
    }
  }

  // 忘记密码
  const handleForget = () => {
    setForgetModalVisible(false)
  }

  const { status, type: loginType } = userLoginState

  return (
    <div className={styles.container}>
      <div className={styles.lang} data-lang>
        {SelectLang && <SelectLang />}
      </div>
      <div className={styles.content}>
        <LoginForm
          logo={<img alt="logo" src={logo} />}
          title={intl.formatMessage({ id: 'pages.login.title' })}
          subTitle={intl.formatMessage({ id: 'pages.login.subtitle' })}
          form={form}
          initialValues={{
            autoLogin: true,
            phoneArea: '1',
          }}
          // actions={[
          //   <span key="text">其他登录方式</span>,
          //   <AlipayCircleOutlined key="AlipayCircleOutlined" className={styles.icon} />,
          //   <TaobaoCircleOutlined key="TaobaoCircleOutlined" className={styles.icon} />,
          //   <WeiboCircleOutlined key="WeiboCircleOutlined" className={styles.icon} />,
          // ]}
          onFinish={async (values) => {
            await handleSubmit(values as loginProps)
          }}
        >
          <Tabs
            activeKey={type}
            onChange={(value) => {
              setType(value)
              if (value === 'account') getCaptchas()
            }}
          >
            <Tabs.TabPane
              key="account"
              tab={intl.formatMessage({
                id: 'pages.login.tabaccount',
              })}
            />
            <Tabs.TabPane
              key="phone"
              tab={intl.formatMessage({
                id: 'pages.login.tabphone',
              })}
            />
          </Tabs>

          {status === 'error' && loginType === 'account' && (
            <LoginMessage
              content={intl.formatMessage({
                id: 'pages.login.loginError',
              })}
            />
          )}
          {type === 'account' && (
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.login.user',
                })}
                rules={[
                  {
                    required: true,
                    message: `${intl.formatMessage({
                      id: 'pages.form.input',
                    })}${intl.formatMessage({
                      id: 'pages.login.user',
                    })}`,
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.login.password',
                })}
                rules={[
                  {
                    required: true,
                    message: `${intl.formatMessage({
                      id: 'pages.form.input',
                    })}${intl.formatMessage({
                      id: 'pages.login.password',
                    })}`,
                  },
                ]}
              />
              <Row gutter={16}>
                <Col span={15}>
                  <ProFormText
                    fieldProps={{
                      size: 'large',
                      prefix: <SecurityScanOutlined className={styles.prefixIcon} />,
                    }}
                    style={{ width: '65%' }}
                    name="code"
                    placeholder={intl.formatMessage({
                      id: 'pages.login.code',
                    })}
                    rules={[
                      {
                        required: true,
                        message: '请输入验证码',
                      },
                    ]}
                  />
                </Col>
                <Col span={8}>
                  <a onClick={getCaptchas}>
                    <img src={captcha} alt="" style={{ height: 39 }} />
                  </a>
                </Col>
              </Row>
            </>
          )}

          {status === 'error' && loginType === 'mobile' && (
            <LoginMessage
              content={intl.formatMessage({
                id: 'pages.login.codeError',
              })}
            />
          )}
          {type === 'phone' && (
            <>
              <PhoneInput icon />

              <ProFormCaptcha
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
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
                  const result = await getPhoneCaptcha({ phone, loginType: type })
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
            </>
          )}
          <div
            style={{
              marginBottom: 24,
              height: 10,
            }}
          >
            {/* <ProFormCheckbox noStyle name="autoLogin">
              {intl.formatMessage({
                id: 'pages.login.autoLogin',
              })}
            </ProFormCheckbox> */}
            <a
              style={{
                float: 'right',
              }}
              onClick={() => setForgetModalVisible(true)}
            >
              {intl.formatMessage({
                id: 'pages.login.forgetPass',
              })}
            </a>
          </div>
        </LoginForm>
      </div>
      <Footer />

      <Modal
        title={intl.formatMessage({
          id: 'pages.login.valitTilte',
        })}
        visible={isModalVisible}
        onOk={handleOk}
        cancelButtonProps={{ style: { display: 'none' } }}
        onCancel={() => {
          setIsModalVisible(false)
        }}
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
              prefix={<SecurityScanOutlined className={styles.prefixIcon} />}
            />
          </Col>
        </Row>
      </Modal>

      <Modal
        title={intl.formatMessage({
          id: 'pages.login.editPass',
        })}
        visible={passModalVisible}
        footer={false}
        onCancel={() => {
          setPassModalVisible(false)
        }}
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 18 }}
          onFinish={handlePass}
          form={passform}
          autoComplete="off"
        >
          <Form.Item
            label={intl.formatMessage({
              id: 'pages.login.newPass',
            })}
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
            <Input maxLength={50} />
          </Form.Item>
          <Form.Item
            label={intl.formatMessage({
              id: 'pages.login.confirmPass',
            })}
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
            <Input maxLength={50} />
          </Form.Item>
          <div className="modal-btns">
            <Button type="primary" htmlType="submit" loading={confirmLoading}>
              {intl.formatMessage({
                id: 'pages.btn.confirm',
              })}
            </Button>
          </div>
        </Form>
      </Modal>

      {/* 忘记密码 */}
      <ForgetPass
        modalVisible={forgetModalVisible}
        handleCancel={() => setForgetModalVisible(false)}
        handleSubmit={handleForget}
      />
    </div>
  )
}

export default Login
