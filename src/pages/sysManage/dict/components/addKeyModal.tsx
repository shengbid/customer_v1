import React, { useState, useEffect } from 'react'
import { Modal, Button, Form, Input, message, Spin, InputNumber } from 'antd'
import type { addModalProps } from '@/services/types'
import { addDictKey, dictKeyDetail } from '@/services'
import DictSelect from '@/components/ComSelect'

const { TextArea } = Input

const AddModal: React.FC<addModalProps> = ({ modalVisible, handleSubmit, handleCancel, info }) => {
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [spinning, setSpinning] = useState<boolean>(false)
  const [form] = Form.useForm()
  const text = info && info.dictCode ? '编辑' : '添加'

  const getDetail = async () => {
    setSpinning(true)
    const { data } = await dictKeyDetail(info.dictCode)
    setSpinning(false)
    if (data) {
      form.setFieldsValue({ ...data })
    }
  }

  useEffect(() => {
    if (modalVisible && info) {
      if (info.dictCode) {
        getDetail()
      }
      form.setFieldsValue({
        dictType: info.dictType,
      })
    }
  }, [modalVisible])

  const handleOk = async (values: any) => {
    setConfirmLoading(true)
    try {
      await addDictKey(values)
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
      title={`${text}字典类型`}
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
          <Form.Item label="id" name="dictCode" style={{ display: 'none' }}>
            <Input />
          </Form.Item>

          <Form.Item
            label="字典类型"
            name="dictType"
            rules={[{ required: true, message: '请输入字典类型!' }]}
          >
            <Input maxLength={50} disabled />
          </Form.Item>

          <Form.Item
            label="数据标签"
            name="dictLabel"
            rules={[{ required: true, message: '请输入数据标签!' }]}
          >
            <Input maxLength={50} />
          </Form.Item>
          <Form.Item
            label="数据键值"
            name="dictValue"
            rules={[{ required: true, message: '请输入数据键值!' }]}
          >
            <Input maxLength={3} />
          </Form.Item>

          <Form.Item
            label="显示排序"
            name="dictSort"
            rules={[{ required: true, message: '请输入显示排序!' }]}
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
