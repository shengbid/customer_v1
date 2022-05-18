import React from 'react'
import { Modal, Button, Form, Input, Radio, Row, Col } from 'antd'
import type { addModalProps } from '@/services/types'
import DictSelect from '@/components/ComSelect'
import TreeDataSelect from '@/components/ComSelect/treeSelect'

const { TextArea } = Input

const AddModal: React.FC<addModalProps> = ({ modalVisible, handleSubmit, handleCancel, info }) => {
  const handleOk = async (values: any) => {
    handleSubmit(values)
  }

  const cancel = () => {
    handleCancel()
  }

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
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ status: 1 }}
        onFinish={handleOk}
        autoComplete="off"
      >
        <Row>
          <Col span={12}>
            <Form.Item
              label="用户名称"
              name="name"
              rules={[{ required: true, message: '请输入用户名称!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="所属部门"
              name="dept"
              rules={[{ required: true, message: '请选择所属部门!' }]}
            >
              <TreeDataSelect />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <Form.Item
              label="手机号码"
              name="phone"
              rules={[{ required: true, message: '请输入手机号码!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="邮箱"
              name="email"
              rules={[{ required: true, message: '请输入邮箱!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <Form.Item
              label="用户密码"
              name="password"
              rules={[{ required: true, message: '请输入用户密码!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="用户性别"
              name="sex"
              rules={[{ required: true, message: '请选择用户性别!' }]}
            >
              <DictSelect key="sex" />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <Form.Item
              label="角色"
              name="role"
              rules={[{ required: true, message: '请选择角色!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="状态"
              name="status"
              rules={[{ required: true, message: '请选择状态!' }]}
            >
              <Radio.Group>
                <Radio value={1}>正常</Radio>
                <Radio value={2}>停用</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="备注"
          name="remark"
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 20 }}
          rules={[{ required: true, message: '请输入备注!' }]}
        >
          <TextArea placeholder="请输入备注" autoSize={{ minRows: 3, maxRows: 5 }} />
        </Form.Item>

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
