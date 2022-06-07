import React, { useState, useEffect } from 'react'
import { Modal, Button, Form, Input, message, Spin } from 'antd'
import type { addModalProps } from '@/services/types'
import MultiTreeDataSelect from '@/components/ComSelect/multiTreeSelect'
import { addDataPerms, roleDetail, getRoleDeptTreeList } from '@/services'
import DictSelect from '@/components/ComSelect'
import { useIntl } from 'umi'

const AddModal: React.FC<addModalProps> = ({ modalVisible, handleSubmit, handleCancel, info }) => {
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [spinning, setSpinning] = useState<boolean>(false)
  const [form] = Form.useForm()
  const intl = useIntl()

  const getDetail = async () => {
    setSpinning(true)
    const { data } = await roleDetail(info)
    const res = await getRoleDeptTreeList(info)
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
      const menuIds = values.menuIds.map((item: any) => item.value)
      await addDataPerms({ ...values, menuIds })
      setConfirmLoading(false)
    } catch (error) {
      setConfirmLoading(false)
      return
    }
    message.success(
      `${intl.formatMessage({
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
      title={`${intl.formatMessage({
        id: 'pages.form.allot',
      })}${intl.formatMessage({
        id: 'sys.role.dataPerm',
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
            <Input disabled maxLength={50} />
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
            <Input disabled maxLength={50} />
          </Form.Item>

          <Form.Item
            label={intl.formatMessage({
              id: 'sys.role.dataScope',
            })}
            name="dataScope"
            rules={[
              {
                required: true,
                message: `${intl.formatMessage({
                  id: 'pages.form.select',
                })}${intl.formatMessage({
                  id: 'sys.role.dataScope',
                })}`,
              },
            ]}
          >
            <DictSelect authorword="sys_normal_disable" type="radio" />
          </Form.Item>

          <Form.Item
            label={intl.formatMessage({
              id: 'sys.role.dataPerm',
            })}
            name="deptIds"
            rules={[
              {
                required: true,
                message: `${intl.formatMessage({
                  id: 'pages.form.select',
                })}${intl.formatMessage({
                  id: 'sys.role.dataPerm',
                })}`,
              },
            ]}
          >
            <MultiTreeDataSelect />
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
