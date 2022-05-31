import React, { useState, useEffect } from 'react'
import { Modal, Button, Form, Input, Row, Col, Select, message, Spin } from 'antd'
import type { addModalProps, postListProps, roleListProps } from '@/services/types'
import DictSelect from '@/components/ComSelect'
import TreeDataSelect from '@/components/ComSelect/treeSelect'
import { emailReg, passwordReg, phoneReg } from '@/utils/reg'
import { handleTreeData } from '@/utils/base'
import { getUser, addUser, userDetail } from '@/services'

const { TextArea } = Input

const AddModal: React.FC<addModalProps> = ({ modalVisible, handleSubmit, handleCancel, info }) => {
  const [postsList, setPostsList] = useState<postListProps[]>([])
  const [roleList, setRoleList] = useState<roleListProps[]>([])
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [spinning, setSpinning] = useState<boolean>(false)
  const [form] = Form.useForm()
  const text = info ? '编辑' : '添加'

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
      title={`${text}用户`}
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
                  label="用户名称"
                  name="userName"
                  rules={[{ required: true, message: '请输入用户名称!' }]}
                >
                  <Input maxLength={50} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="用户密码"
                  name="password"
                  rules={[{ required: true, message: '请输入用户密码!' }, passwordReg]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          )}

          <Row>
            <Col span={12}>
              <Form.Item
                label="手机号码"
                name="phonenumber"
                rules={[{ required: true, message: '请输入手机号码!' }, phoneReg]}
              >
                <Input maxLength={11} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="邮箱"
                name="email"
                rules={[{ required: true, message: '请输入邮箱!' }, emailReg]}
              >
                <Input maxLength={50} />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <Form.Item
                label="所属部门"
                name="deptId"
                rules={[{ required: true, message: '请选择所属部门!' }]}
              >
                <TreeDataSelect />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="用户性别"
                name="sex"
                rules={[{ required: true, message: '请选择用户性别!' }]}
              >
                <DictSelect authorWord="sys_user_sex" />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <Form.Item
                label="用户昵称"
                name="nickName"
                rules={[{ required: true, message: '请输入用户昵称!' }]}
              >
                <Input maxLength={50} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="状态"
                name="status"
                rules={[{ required: true, message: '请选择状态!' }]}
              >
                <DictSelect authorWord="sys_normal_disable" type="radio" />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <Form.Item
                label="角色"
                name="roleIds"
                rules={[{ required: true, message: '请选择角色!' }]}
              >
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: '100%' }}
                  placeholder="请选择"
                  options={roleList}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="岗位"
                name="postIds"
                rules={[{ required: true, message: '请选择岗位!' }]}
              >
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: '100%' }}
                  placeholder="请选择"
                  options={postsList}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="备注"
            name="remark"
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 20 }}
            rules={[{ required: false, message: '请输入备注!' }]}
          >
            <TextArea
              placeholder="请输入备注"
              maxLength={500}
              autoSize={{ minRows: 3, maxRows: 5 }}
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
