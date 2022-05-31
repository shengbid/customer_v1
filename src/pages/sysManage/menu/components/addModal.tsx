import React, { useState, useEffect } from 'react'
import { Modal, Button, Form, Input, Radio, Row, Col, InputNumber, message } from 'antd'
import type { addModalProps } from '@/services/types'
import TreeDataSelect from '@/components/ComSelect/treeSelect'
import IconSelect from '@/components/ComSelect/iconSelect'
import type { RadioChangeEvent } from 'antd'
import { addMenu, menuDetail } from '@/services'
import DictSelect from '@/components/ComSelect'

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

  const [form] = Form.useForm()

  const text = info && info.menuId ? '编辑' : '添加'

  const changeMenuType = (e: RadioChangeEvent) => {
    setMenuType(e.target.value)
  }

  // 获取详情
  const getMenuDetail = async () => {
    const { data } = await menuDetail(info.menuId)
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
      title={`${text}菜单`}
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
          label="上级菜单"
          labelCol={labelCol}
          name="parentId"
          rules={[{ required: false, message: '请选择上级菜单!' }]}
        >
          <TreeDataSelect type="1" />
        </Form.Item>

        <Form.Item
          label="菜单类型"
          name="menuType"
          labelCol={labelCol}
          rules={[{ required: true, message: '请选择菜单类型!' }]}
        >
          <Radio.Group onChange={changeMenuType}>
            <Radio value={'M'}>目录</Radio>
            <Radio value={'C'}>菜单</Radio>
            <Radio value={'F'}>按钮</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="菜单名称"
          labelCol={labelCol}
          name="menuName"
          rules={[{ required: true, message: '请输入菜单名称!' }]}
        >
          <Input maxLength={100} />
        </Form.Item>

        <Row>
          <Col span={12}>
            {menuType !== 'M' ? (
              <Form.Item
                label="权限字符"
                name="perms"
                rules={[{ required: true, message: '请输入权限字符!' }]}
              >
                <Input maxLength={50} />
              </Form.Item>
            ) : (
              <Form.Item
                label="菜单图标"
                name="icon"
                rules={[{ required: true, message: '请选择菜单图标!' }]}
              >
                <IconSelect />
              </Form.Item>
            )}
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

        {menuType !== 'F' ? (
          <>
            <Row>
              <Col span={12}>
                <Form.Item
                  label="路由地址"
                  name="path"
                  rules={[{ required: true, message: '请输入路由地址!' }]}
                >
                  <Input maxLength={100} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="是否外链"
                  name="isFrame"
                  rules={[{ required: true, message: '请选择是否外链!' }]}
                >
                  <Radio.Group>
                    <Radio value={'0'}>是</Radio>
                    <Radio value={'1'}>否</Radio>
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
                  label="显示状态"
                  name="visible"
                  rules={[{ required: true, message: '请选择显示状态!' }]}
                >
                  <Radio.Group>
                    <Radio value={'0'}>显示</Radio>
                    <Radio value={'1'}>隐藏</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="菜单状态"
                  name="status"
                  rules={[{ required: true, message: '请选择菜单状态!' }]}
                >
                  <DictSelect authorWord="sys_normal_disable" type="radio" />
                </Form.Item>
              </Col>
            </Row>
          </>
        ) : null}

        <div className="modal-btns">
          <Button type="primary" htmlType="submit" loading={confirmLoading}>
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
