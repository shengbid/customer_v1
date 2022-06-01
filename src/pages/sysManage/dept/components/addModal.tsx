import React, { useState, useEffect } from 'react'
import { Modal, Button, Form, Input, Row, Col, InputNumber, message, Spin } from 'antd'
import type { addModalProps } from '@/services/types'
import TreeDataSelect from '@/components/ComSelect/treeSelect'
import { addDept, deptDetail } from '@/services'
import DictSelect from '@/components/ComSelect'
import { emailReg, phoneReg } from '@/utils/reg'

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

  const text = info ? '编辑' : '添加'

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
    message.success(`${text}成功`)
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
      title={`${text}部门`}
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
                label="部门名称"
                name="deptName"
                rules={[{ required: true, message: '请输入部门名称!' }]}
              >
                <Input maxLength={100} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="显示排序"
                name="orderNum"
                rules={[{ required: true, message: '请输入排序!' }]}
              >
                <InputNumber style={{ width: '89%' }} min={1} max={20} />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <Form.Item
                label="负责人"
                name="leader"
                rules={[{ required: true, message: '请输入负责人!' }]}
              >
                <Input maxLength={100} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="手机号码"
                name="phone"
                rules={[{ required: true, message: '请输入手机号码!' }, phoneReg]}
              >
                <Input maxLength={11} />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <Form.Item
                label="邮箱"
                name="email"
                rules={[{ required: true, message: '请输入邮箱!' }, emailReg]}
              >
                <Input maxLength={50} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="部门状态"
                name="status"
                rules={[{ required: true, message: '请选择部门状态!' }]}
              >
                <DictSelect authorword="sys_normal_disable" type="radio" />
              </Form.Item>
            </Col>
          </Row>

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
