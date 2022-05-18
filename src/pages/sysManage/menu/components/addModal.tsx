import React from 'react'
import { Modal, Button, Form, Input, Radio, Row, Col, InputNumber } from 'antd'
import type { addModalProps } from '@/services/types'
import IconSelect from '@/components/ComSelect/iconSelect'

const AddModal: React.FC<addModalProps> = ({ modalVisible, handleSubmit, handleCancel, info }) => {
  const handleOk = async (values: any) => {
    handleSubmit(values)
  }

  const cancel = () => {
    handleCancel()
  }

  const labelCol = { span: 6 }
  return (
    <Modal
      title={info ? '添加' : '编辑'}
      maskClosable={false}
      destroyOnClose
      width={'60%'}
      visible={modalVisible}
      footer={false}
      onCancel={cancel}
    >
      <Form
        name="basic"
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 20 }}
        initialValues={{ menuType: 1, isFrame: 1 }}
        onFinish={handleOk}
        autoComplete="off"
      >
        <Form.Item
          label="上级菜单"
          name="parentId"
          rules={[{ required: true, message: '请选择上级菜单!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="菜单类型"
          name="menuType"
          rules={[{ required: true, message: '请选择菜单类型!' }]}
        >
          <Radio.Group>
            <Radio value={1}>菜单</Radio>
            <Radio value={2}>按钮</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="菜单名称"
          name="menuName"
          rules={[{ required: true, message: '请输入菜单名称!' }]}
        >
          <Input />
        </Form.Item>

        <Row>
          <Col span={12}>
            <Form.Item
              label="菜单图标"
              name="icon"
              labelCol={labelCol}
              rules={[{ required: true, message: '请选择菜单图标!' }]}
            >
              <IconSelect />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="显示排序"
              name="orderNum"
              labelCol={labelCol}
              rules={[{ required: true, message: '请输入排序!' }]}
            >
              <InputNumber style={{ width: '89%' }} min={1} max={10} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="路由地址"
          name="path"
          rules={[{ required: true, message: '请输入路由地址!' }]}
        >
          <Input />
        </Form.Item>

        <Row>
          <Col span={12}>
            <Form.Item
              label="显示状态"
              name="isFrame"
              labelCol={labelCol}
              rules={[{ required: true, message: '请选择显示状态!' }]}
            >
              <Radio.Group>
                <Radio value={1}>显示</Radio>
                <Radio value={2}>隐藏</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="菜单状态"
              name="isFrame"
              labelCol={labelCol}
              rules={[{ required: true, message: '请选择菜单状态!' }]}
            >
              <Radio.Group>
                <Radio value={1}>正常</Radio>
                <Radio value={2}>停用</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>

        <div className="modal-btns">
          <Button type="primary" htmlType="submit">
            确定
          </Button>
          <Button onClick={cancel} className="cancel-btn">
            取消
          </Button>
        </div>
      </Form>
    </Modal>
  )
}

export default AddModal
