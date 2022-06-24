import { LockOutlined, MobileOutlined, UserOutlined, SecurityScanOutlined } from '@ant-design/icons'
import { Alert, message, Tabs, Row, Col, Modal, Input, Form } from 'antd'
import React, { useState, useEffect } from 'react'
import { ProFormCaptcha, ProFormText, LoginForm } from '@ant-design/pro-form'
import { history, useModel, SelectLang, useIntl } from 'umi'
import Footer from '@/components/Footer'
import { login, getAuthorRoutes, queryCurrentUser, getCaptcha, getPhoneCaptcha } from '@/services'
import type { loginProps, LoginResult } from '@/services/types'
import Cookies from 'js-cookie'
import logo from '@/assets/home/logo.jpg'
import { handleMenuData } from '@/utils/base'
import { phoneReg } from '@/utils/reg'

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
  const { setInitialState } = useModel('@@initialState')
  const [form] = Form.useForm()

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
    await getPhoneCaptcha({
      code: phoneCode,
      uuid: captchaUid,
      loginType: type,
      phone: form.getFieldValue('phone'),
    })
    setIsModalVisible(false)
    message.success(
      intl.formatMessage({
        id: 'pages.login.getcodeSuccess',
      }),
    )
  }

  const fetchUserInfo = async () => {
    // console.log(initialState)
    const { user, roles, permissions } = await queryCurrentUser()
    const { data } = await getAuthorRoutes()
    if (user) {
      await setInitialState((s) => ({
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
        history.push(redirect || '/welcome')
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
              <ProFormText
                fieldProps={{
                  size: 'large',
                  autoComplete: 'off',
                  prefix: <MobileOutlined className={styles.prefixIcon} />,
                }}
                name="phone"
                placeholder={intl.formatMessage({
                  id: 'pages.login.phone',
                })}
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
              />
              <ProFormCaptcha
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
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
                  const result = await getPhoneCaptcha({ phone, loginType: type })
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
        title="安全验证"
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
              placeholder="输入验证码"
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
    </div>
  )
}

export default Login
