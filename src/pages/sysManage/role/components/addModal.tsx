import React, { useState, useEffect } from 'react'
import { Modal, Button, Form, Input, InputNumber, message, Spin } from 'antd'
import type { addModalProps } from '@/services/types'
import MultiTreeDataSelect from '@/components/ComSelect/multiTreeSelect'
import { addRole, roleDetail, getRoleMenu } from '@/services'
import DictSelect from '@/components/ComSelect'

const { TextArea } = Input

const AddModal: React.FC<addModalProps> = ({ modalVisible, handleSubmit, handleCancel, info }) => {
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [spinning, setSpinning] = useState<boolean>(false)
  const [form] = Form.useForm()
  const text = info ? '编辑' : '添加'

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
      const menuIds = values.menuIds.map((item: any) => item.value)
      await addRole({ ...values, menuIds })
      setConfirmLoading(false)
    } catch (error) {
      setConfirmLoading(false)
      return
    }
    message.success(`${text}成功`)
    handleSubmit()
    form.resetFields()
  }

  const cancel = () => {
    handleCancel()
    form.resetFields()
  }

  return (
    <Modal
      title={`${text}角色`}
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
            label="角色名称"
            name="roleName"
            rules={[{ required: true, message: '请输入角色名称!' }]}
          >
            <Input maxLength={50} />
          </Form.Item>

          <Form.Item
            label="权限字符"
            name="roleKey"
            rules={[{ required: true, message: '请输入权限字符!' }]}
          >
            <Input maxLength={50} />
          </Form.Item>

          <Form.Item
            label="角色顺序"
            name="roleSort"
            rules={[{ required: true, message: '请输入角色顺序!' }]}
          >
            <InputNumber style={{ width: '100%' }} min={1} max={30} />
          </Form.Item>

          <Form.Item
            label="状态"
            name="status"
            rules={[{ required: true, message: '请选择状态!' }]}
          >
            <DictSelect authorword="sys_normal_disable" type="radio" />
          </Form.Item>

          <Form.Item
            label="菜单权限"
            name="menuIds"
            rules={[{ required: false, message: '请选择菜单权限!' }]}
          >
            <MultiTreeDataSelect />
          </Form.Item>

          <Form.Item
            label="备注"
            name="remark"
            rules={[{ required: true, message: '请输入备注!' }]}
          >
            <TextArea
              placeholder="请输入备注"
              autoSize={{ minRows: 3, maxRows: 5 }}
              maxLength={500}
            />
          </Form.Item>

          <div className="modal-btns">
            <Button type="primary" htmlType="submit" loading={confirmLoading}>
              确定
            </Button>
            <Button onClick={cancel} className="cancel-btn">
              取消
            </Button>
          </div>
        </Form>
      </Spin>
    </Modal>
  )
}

export default AddModal
