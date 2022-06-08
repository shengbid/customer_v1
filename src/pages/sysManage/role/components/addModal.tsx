import React, { useState, useEffect } from 'react'
import { Modal, Button, Form, Input, InputNumber, message, Spin } from 'antd'
import type { addModalProps } from '@/services/types'
import MultiTreeDataSelect from '@/components/ComSelect/multiTreeSelect'
import { addRole, roleDetail, getRoleMenu } from '@/services'
import DictSelect from '@/components/ComSelect'
import { useIntl } from 'umi'

const { TextArea } = Input

const AddModal: React.FC<addModalProps> = ({ modalVisible, handleSubmit, handleCancel, info }) => {
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

  const getDetail = async () => {
    setSpinning(true)
    const { data } = await roleDetail(info)
    const res = await getRoleMenu(info)
    setSpinning(false)
    if (res && res.data) {
      form.setFieldsValue({ ...data, menuIds: res.data.checkedKeys })
    }
  }

  useEffect(() => {
    if (modalVisible && info) {
      getDetail()
    }
  }, [modalVisible])

  const handleOk = async (values: any) => {
    setConfirmLoading(true)
    try {
      // const menuIds = values.menuIds.map((item: any) => item.value)
      // await addRole({ ...values, menuIds })
      await addRole(values)
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
      title={`${text}${intl.formatMessage({
        id: 'sys.role.role',
      })}`}
      maskClosable={false}
      destroyOnClose
      width={600}
      visible={modalVisible}
      footer={false}
      onCancel={cancel}
    >
      <Spin spinning={spinning}>
        <Form
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 18 }}
          initialValues={{ status: '0' }}
          onFinish={handleOk}
          form={form}
          autoComplete="off"
        >
          <Form.Item label="id" name="roleId" style={{ display: 'none' }}>
            <Input />
          </Form.Item>
          <Form.Item
            label={intl.formatMessage({
              id: 'sys.role.roleName',
            })}
            name="roleName"
            rules={[
              {
                required: true,
                message: `${intl.formatMessage({
                  id: 'pages.form.input',
                })}${intl.formatMessage({
                  id: 'sys.role.roleName',
                })}`,
              },
            ]}
          >
            <Input maxLength={50} />
          </Form.Item>

          <Form.Item
            label={intl.formatMessage({
              id: 'sys.role.roleKey',
            })}
            name="roleKey"
            rules={[
              {
                required: true,
                message: `${intl.formatMessage({
                  id: 'pages.form.input',
                })}${intl.formatMessage({
                  id: 'sys.role.roleKey',
                })}`,
              },
            ]}
          >
            <Input maxLength={50} />
          </Form.Item>

          <Form.Item
            label={intl.formatMessage({
              id: 'sys.menu.orderNum',
            })}
            name="roleSort"
            rules={[
              {
                required: false,
                message: `${intl.formatMessage({
                  id: 'pages.form.input',
                })}${intl.formatMessage({
                  id: 'sys.menu.orderNum',
                })}`,
              },
            ]}
          >
            <InputNumber style={{ width: '100%' }} min={1} max={30} />
          </Form.Item>

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

          <Form.Item
            label={intl.formatMessage({
              id: 'sys.role.menuIds',
            })}
            name="menuIds"
            rules={[
              {
                required: true,
                message: `${intl.formatMessage({
                  id: 'pages.form.select',
                })}${intl.formatMessage({
                  id: 'sys.role.menuIds',
                })}`,
              },
            ]}
          >
            <MultiTreeDataSelect />
          </Form.Item>

          <Form.Item
            label={intl.formatMessage({
              id: 'pages.form.remark',
            })}
            name="remark"
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
            <TextArea autoSize={{ minRows: 3, maxRows: 5 }} maxLength={500} />
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
