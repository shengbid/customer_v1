import React, { useState, useEffect } from 'react'
import { Modal, Button, Form, Input, Radio, Row, Col, InputNumber, message } from 'antd'
import type { addModalProps } from '@/services/types'
import TreeDataSelect from '@/components/ComSelect/treeSelect'
import IconSelect from '@/components/ComSelect/iconSelect'
import type { RadioChangeEvent } from 'antd'
import { addMenu, menuDetail } from '@/services'
import DictSelect from '@/components/ComSelect'
import { useIntl } from 'umi'

interface modalProps extends addModalProps {
  type?: string
}

const AddModal: React.FC<modalProps> = ({
  modalVisible,
  handleSubmit,
  handleCancel,
  info,
  type,
}) => {
  const [menuType, setMenuType] = useState<string>('C')
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const intl = useIntl()
  const [form] = Form.useForm()

  const text = info
    ? intl.formatMessage({
        id: 'pages.btn.edit',
      })
    : intl.formatMessage({
        id: 'pages.btn.add',
      })

  const changeMenuType = (e: RadioChangeEvent) => {
    setMenuType(e.target.value)
  }

  // 获取详情
  const getMenuDetail = async () => {
    const { data } = await menuDetail(info)
    form.setFieldsValue({ ...data })
    setMenuType(data.menuType)
  }

  useEffect(() => {
    if (modalVisible && info) {
      if (type) {
        form.setFieldsValue({ parentId: info })
      } else {
        getMenuDetail()
      }
    }
  }, [modalVisible])

  const handleOk = async (values: any) => {
    console.log(values)
    setConfirmLoading(true)
    try {
      await addMenu(values)
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

  const labelCol = { span: 3 }
  return (
    <Modal
      title={`${text}${intl.formatMessage({
        id: 'sys.menu.menu',
      })}`}
      maskClosable={false}
      destroyOnClose
      width={'60%'}
      visible={modalVisible}
      footer={false}
      onCancel={cancel}
    >
      <Form
        name="basic"
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 20 }}
        initialValues={{ menuType: 'C', isFrame: '1', visible: '0', status: '0' }}
        onFinish={handleOk}
        autoComplete="off"
      >
        <Form.Item label="菜单id" name="menuId" style={{ display: 'none' }}>
          <Input />
        </Form.Item>

        <Form.Item
          label={intl.formatMessage({
            id: 'sys.menu.parentId',
          })}
          labelCol={labelCol}
          name="parentId"
          rules={[
            {
              required: false,
              message: `${intl.formatMessage({
                id: 'pages.form.input',
              })}${intl.formatMessage({
                id: 'sys.menu.parentId',
              })}`,
            },
          ]}
        >
          <TreeDataSelect type="1" />
        </Form.Item>

        <Row>
          <Col span={12}>
            <Form.Item
              label={intl.formatMessage({
                id: 'sys.menu.menuType',
              })}
              name="menuType"
              rules={[
                {
                  required: true,
                  message: `${intl.formatMessage({
                    id: 'pages.form.select',
                  })}${intl.formatMessage({
                    id: 'sys.menu.menuType',
                  })}`,
                },
              ]}
            >
              <Radio.Group onChange={changeMenuType}>
                <Radio value={'M'}>
                  {intl.formatMessage({
                    id: 'sys.menu.catalogue',
                  })}
                </Radio>
                <Radio value={'C'}>
                  {intl.formatMessage({
                    id: 'sys.menu.menu',
                  })}
                </Radio>
                <Radio value={'F'}>
                  {intl.formatMessage({
                    id: 'sys.menu.btn',
                  })}
                </Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          {menuType !== 'M' ? (
            <Col span={11}>
              <Form.Item
                label={intl.formatMessage({
                  id: 'sys.menu.icon1',
                })}
                name="icon"
                rules={[
                  {
                    required: true,
                    message: `${intl.formatMessage({
                      id: 'pages.form.select',
                    })}${intl.formatMessage({
                      id: 'sys.menu.icon1',
                    })}`,
                  },
                ]}
              >
                <IconSelect />
              </Form.Item>
            </Col>
          ) : null}
        </Row>

        <Form.Item
          label={intl.formatMessage({
            id: 'sys.menu.menuName',
          })}
          labelCol={labelCol}
          name="menuName"
          rules={[
            {
              required: true,
              message: `${intl.formatMessage({
                id: 'pages.form.input',
              })}${intl.formatMessage({
                id: 'sys.menu.menuName',
              })}`,
            },
          ]}
        >
          <Input maxLength={100} />
        </Form.Item>

        <Row>
          <Col span={12}>
            {menuType !== 'M' ? (
              <Form.Item
                label={intl.formatMessage({
                  id: 'sys.menu.perms',
                })}
                name="perms"
                rules={[
                  {
                    required: true,
                    message: `${intl.formatMessage({
                      id: 'pages.form.input',
                    })}${intl.formatMessage({
                      id: 'sys.menu.perms',
                    })}`,
                  },
                ]}
              >
                <Input maxLength={50} />
              </Form.Item>
            ) : (
              <Form.Item
                label={intl.formatMessage({
                  id: 'sys.menu.icon1',
                })}
                name="icon"
                rules={[
                  {
                    required: true,
                    message: `${intl.formatMessage({
                      id: 'pages.form.select',
                    })}${intl.formatMessage({
                      id: 'sys.menu.icon1',
                    })}`,
                  },
                ]}
              >
                <IconSelect />
              </Form.Item>
            )}
          </Col>
          <Col span={12}>
            <Form.Item
              label={intl.formatMessage({
                id: 'sys.menu.orderNum1',
              })}
              name="orderNum"
              rules={[
                {
                  required: true,
                  message: `${intl.formatMessage({
                    id: 'pages.form.input',
                  })}${intl.formatMessage({
                    id: 'sys.menu.orderNum1',
                  })}`,
                },
              ]}
            >
              <InputNumber style={{ width: '89%' }} min={1} max={20} />
            </Form.Item>
          </Col>
        </Row>

        {menuType !== 'F' ? (
          <>
            <Row>
              <Col span={12}>
                <Form.Item
                  label={intl.formatMessage({
                    id: 'sys.menu.path',
                  })}
                  name="path"
                  rules={[
                    {
                      required: true,
                      message: `${intl.formatMessage({
                        id: 'pages.form.input',
                      })}${intl.formatMessage({
                        id: 'sys.menu.path',
                      })}`,
                    },
                  ]}
                >
                  <Input maxLength={100} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={intl.formatMessage({
                    id: 'sys.menu.isFrame',
                  })}
                  name="isFrame"
                  rules={[
                    {
                      required: true,
                      message: `${intl.formatMessage({
                        id: 'pages.form.select',
                      })}${intl.formatMessage({
                        id: 'sys.menu.isFrame',
                      })}`,
                    },
                  ]}
                >
                  <Radio.Group>
                    <Radio value={'0'}>
                      {intl.formatMessage({
                        id: 'pages.form.yes',
                      })}
                    </Radio>
                    <Radio value={'1'}>
                      {intl.formatMessage({
                        id: 'pages.form.no',
                      })}
                    </Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>

            {/* {menuType === 'C' ? (
              <Row>
                <Col span={12}>
                  <Form.Item
                    label="组件路径"
                    name="component"
                    rules={[{ required: true, message: '请输入组件路径!' }]}
                  >
                    <Input maxLength={100} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="权限字符"
                    name="perms"
                    rules={[{ required: false, message: '请输入权限字符!' }]}
                  >
                    <Input maxLength={50} style={{ width: '89%' }} />
                  </Form.Item>
                </Col>
              </Row>
            ) : null} */}

            <Row>
              <Col span={12}>
                <Form.Item
                  label={intl.formatMessage({
                    id: 'sys.menu.visible',
                  })}
                  name="visible"
                  rules={[
                    {
                      required: true,
                      message: `${intl.formatMessage({
                        id: 'pages.form.select',
                      })}${intl.formatMessage({
                        id: 'sys.menu.visible',
                      })}`,
                    },
                  ]}
                >
                  <Radio.Group>
                    <Radio value={'0'}>
                      {intl.formatMessage({
                        id: 'pages.form.show',
                      })}
                    </Radio>
                    <Radio value={'1'}>
                      {intl.formatMessage({
                        id: 'pages.form.hidden',
                      })}
                    </Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={intl.formatMessage({
                    id: 'sys.menu.status',
                  })}
                  name="status"
                  rules={[
                    {
                      required: true,
                      message: `${intl.formatMessage({
                        id: 'pages.form.select',
                      })}${intl.formatMessage({
                        id: 'sys.menu.status',
                      })}`,
                    },
                  ]}
                >
                  <DictSelect authorword="sys_normal_disable" type="radio" />
                </Form.Item>
              </Col>
            </Row>
          </>
        ) : null}

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
    </Modal>
  )
}

export default AddModal
