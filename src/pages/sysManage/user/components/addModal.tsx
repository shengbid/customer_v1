import React, { useState, useEffect } from 'react'
import { Modal, Button, Form, Input, Row, Col, Select, message, Spin } from 'antd'
import type { addModalProps, postListProps, roleListProps } from '@/services/types'
import DictSelect from '@/components/ComSelect'
import TreeDataSelect from '@/components/ComSelect/treeSelect'
import { emailReg, passwordReg, phoneReg } from '@/utils/reg'
import { handleTreeData } from '@/utils/base'
import { getUser, addUser, userDetail } from '@/services'
import { useIntl } from 'umi'

const { TextArea } = Input

const AddModal: React.FC<addModalProps> = ({ modalVisible, handleSubmit, handleCancel, info }) => {
  const [postsList, setPostsList] = useState<postListProps[]>([])
  const [roleList, setRoleList] = useState<roleListProps[]>([])
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [spinning, setSpinning] = useState<boolean>(false)
  const [form] = Form.useForm()
  const intl = useIntl()
  const text = info
    ? intl.formatMessage({
        id: 'pages.btn.edit',
      })
    : intl.formatMessage({
        id: 'pages.btn.add',
      })

  const getInfo = async () => {
    setSpinning(true)
    const { posts, roles } = await getUser()
    setPostsList(handleTreeData(posts, 'postId', 'postName', 'label'))
    setRoleList(handleTreeData(roles, 'roleId', 'roleName', 'label'))
    setSpinning(false)
  }

  const getDetail = async () => {
    const { data, postIds, roleIds } = await userDetail(info)
    form.setFieldsValue({ ...data, postIds, roleIds })
  }

  useEffect(() => {
    if (modalVisible) {
      if (info) {
        getDetail()
      }
      getInfo()
    }
  }, [modalVisible])

  const handleOk = async (values: any) => {
    console.log(values)
    setConfirmLoading(true)
    try {
      await addUser(values)
      setConfirmLoading(false)
    } catch (error) {
      setConfirmLoading(false)
      return
    }
    message.success(
      `${text}${intl.formatMessage({
        id: 'pages.form.success',
      })}`,
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
      title={`${text}${text}${intl.formatMessage({
        id: 'sys.user.user',
      })}`}
      maskClosable={false}
      destroyOnClose
      width={'60%'}
      visible={modalVisible}
      footer={false}
      onCancel={cancel}
    >
      <Spin spinning={spinning}>
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ status: '0' }}
          onFinish={handleOk}
          form={form}
          autoComplete="off"
        >
          <Form.Item label="id" name="userId" style={{ display: 'none' }}>
            <Input />
          </Form.Item>
          <Form.Item label="userName" name="userName" style={{ display: 'none' }}>
            <Input />
          </Form.Item>
          {info ? null : (
            <Row>
              <Col span={12}>
                <Form.Item
                  label={intl.formatMessage({
                    id: 'sys.user.userName',
                  })}
                  name="userName"
                  rules={[
                    {
                      required: true,
                      message: `${intl.formatMessage({
                        id: 'pages.form.input',
                      })}${intl.formatMessage({
                        id: 'sys.user.userName',
                      })}`,
                    },
                  ]}
                >
                  <Input maxLength={50} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={intl.formatMessage({
                    id: 'sys.user.password',
                  })}
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: `${intl.formatMessage({
                        id: 'pages.form.input',
                      })}${intl.formatMessage({
                        id: 'sys.user.password',
                      })}`,
                    },
                    passwordReg,
                  ]}
                >
                  <Input maxLength={20} />
                </Form.Item>
              </Col>
            </Row>
          )}

          <Row>
            <Col span={12}>
              <Form.Item
                label={intl.formatMessage({
                  id: 'sys.user.phonenumber',
                })}
                name="phonenumber"
                rules={[
                  {
                    required: true,
                    message: `${intl.formatMessage({
                      id: 'pages.form.input',
                    })}${intl.formatMessage({
                      id: 'sys.user.phonenumber',
                    })}`,
                  },
                  phoneReg,
                ]}
              >
                <Input maxLength={11} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={intl.formatMessage({
                  id: 'sys.user.email',
                })}
                name="email"
                rules={[
                  {
                    required: true,
                    message: `${intl.formatMessage({
                      id: 'pages.form.input',
                    })}${intl.formatMessage({
                      id: 'sys.user.email',
                    })}`,
                  },
                  emailReg,
                ]}
              >
                <Input maxLength={50} />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <Form.Item
                label={intl.formatMessage({
                  id: 'sys.user.dept',
                })}
                name="deptId"
                rules={[
                  {
                    required: true,
                    message: `${intl.formatMessage({
                      id: 'pages.form.select',
                    })}${intl.formatMessage({
                      id: 'sys.user.dept',
                    })}`,
                  },
                ]}
              >
                <TreeDataSelect />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={intl.formatMessage({
                  id: 'sys.user.sex',
                })}
                name="sex"
                rules={[
                  {
                    required: true,
                    message: `${intl.formatMessage({
                      id: 'pages.form.select',
                    })}${intl.formatMessage({
                      id: 'sys.user.sex',
                    })}`,
                  },
                ]}
              >
                <DictSelect authorword="sys_user_sex" />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <Form.Item
                label={intl.formatMessage({
                  id: 'sys.user.nickName',
                })}
                name="nickName"
                rules={[
                  {
                    required: true,
                    message: `${intl.formatMessage({
                      id: 'pages.form.input',
                    })}${intl.formatMessage({
                      id: 'sys.user.nickName',
                    })}`,
                  },
                ]}
              >
                <Input maxLength={50} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={intl.formatMessage({
                  id: 'sys.base.status',
                })}
                name="status"
                rules={[
                  {
                    required: true,
                    message: `${intl.formatMessage({
                      id: 'pages.form.select',
                    })}${intl.formatMessage({
                      id: 'sys.base.status',
                    })}`,
                  },
                ]}
              >
                <DictSelect authorword="sys_normal_disable" type="radio" />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <Form.Item
                label={intl.formatMessage({
                  id: 'sys.user.roles',
                })}
                name="roleIds"
                rules={[
                  {
                    required: true,
                    message: `${intl.formatMessage({
                      id: 'pages.form.select',
                    })}${intl.formatMessage({
                      id: 'sys.user.roles',
                    })}`,
                  },
                ]}
              >
                <Select mode="multiple" allowClear style={{ width: '100%' }} options={roleList} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={intl.formatMessage({
                  id: 'sys.post.name',
                })}
                name="postIds"
                rules={[
                  {
                    required: true,
                    message: `${intl.formatMessage({
                      id: 'pages.form.select',
                    })}${intl.formatMessage({
                      id: 'sys.post.name',
                    })}`,
                  },
                ]}
              >
                <Select mode="multiple" allowClear style={{ width: '100%' }} options={postsList} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label={intl.formatMessage({
              id: 'pages.form.remark',
            })}
            name="remark"
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 20 }}
            rules={[
              {
                required: false,
                message: `${intl.formatMessage({
                  id: 'pages.form.input',
                })}${intl.formatMessage({
                  id: 'pages.form.remark',
                })}`,
              },
            ]}
          >
            <TextArea maxLength={500} autoSize={{ minRows: 3, maxRows: 5 }} />
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
      </Spin>
    </Modal>
  )
}

export default AddModal
