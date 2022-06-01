import React, { useState, useEffect } from 'react'
import { Modal, Button, Form, Input, Row, Col, InputNumber, message, Spin } from 'antd'
import type { addModalProps } from '@/services/types'
import TreeDataSelect from '@/components/ComSelect/treeSelect'
import { addDept, deptDetail } from '@/services'
import DictSelect from '@/components/ComSelect'
import { emailReg, phoneReg } from '@/utils/reg'
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

  // 获取详情
  const getDetail = async () => {
    setSpinning(true)
    const { data } = await deptDetail(info)
    form.setFieldsValue({ ...data })
    setSpinning(false)
  }

  useEffect(() => {
    if (modalVisible && info) {
      if (type) {
        form.setFieldsValue({ parentId: info })
      } else {
        getDetail()
      }
    }
  }, [modalVisible])

  const handleOk = async (values: any) => {
    console.log(values)
    setConfirmLoading(true)
    try {
      await addDept(values)
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
        id: 'sys.dept.name',
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
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 20 }}
          initialValues={{ menuType: 'C', isFrame: '1', visible: '0', status: '0' }}
          onFinish={handleOk}
          autoComplete="off"
        >
          <Form.Item label="部门id" name="deptId" style={{ display: 'none' }}>
            <Input />
          </Form.Item>

          <Form.Item
            label="上级部门"
            labelCol={labelCol}
            name="parentId"
            rules={[{ required: false, message: '请选择上级部门!' }]}
          >
            <TreeDataSelect type="0" />
          </Form.Item>

          <Row>
            <Col span={12}>
              <Form.Item
                label={intl.formatMessage({
                  id: 'sys.dept.deptName',
                })}
                name="deptName"
                rules={[
                  {
                    required: true,
                    message: `${intl.formatMessage({
                      id: 'pages.form.input',
                    })}${intl.formatMessage({
                      id: 'sys.dept.deptName',
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

          <Row>
            <Col span={12}>
              <Form.Item
                label={intl.formatMessage({
                  id: 'sys.dept.leader',
                })}
                name="leader"
                rules={[
                  {
                    required: true,
                    message: `${intl.formatMessage({
                      id: 'pages.form.input',
                    })}${intl.formatMessage({
                      id: 'sys.dept.leader',
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
                  id: 'sys.user.phonenumber',
                })}
                name="phone"
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
          </Row>

          <Row>
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
            <Col span={12}>
              <Form.Item
                label={intl.formatMessage({
                  id: 'sys.dept.status',
                })}
                name="status"
                rules={[
                  {
                    required: true,
                    message: `${intl.formatMessage({
                      id: 'pages.form.input',
                    })}${intl.formatMessage({
                      id: 'sys.dept.status',
                    })}`,
                  },
                ]}
              >
                <DictSelect authorword="sys_normal_disable" type="radio" />
              </Form.Item>
            </Col>
          </Row>

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
