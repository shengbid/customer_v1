import React, { useState, useEffect } from 'react'
import { Modal, Form, Select, Input, Button } from 'antd'

const FlowListener: React.FC<{
  visible: boolean
  initIndex: number | null
  initData: any
  toggleModal: () => void
  onFinish: (data: any, index: number | null, isTaskEvent: boolean) => void
  isTaskEvent: boolean
}> = ({ visible = false, initIndex, initData, toggleModal, onFinish, isTaskEvent = false }) => {
  const [formValue, setFormValue] = useState<any>({
    event: isTaskEvent ? 'create' : 'start',
    listenerType: 'class',
    value: '',
  })

  const [form] = Form.useForm()

  const eventTypes = [
    { value: 'start', label: 'start' },
    { value: 'take', label: 'take' },
    { value: 'end', label: 'end' },
  ]
  const eventTypesTask = [
    { value: 'create', label: 'create' },
    { value: 'assignment', label: 'assignment' },
    { value: 'complete', label: 'complete' },
    { value: 'delete', label: 'delete' },
  ]
  const listenerTypes = [
    { value: 'class', label: '类' },
    { value: 'expression', label: '表达式' },
    { value: 'delegateExpression', label: '代理表达式' },
  ]
  const listenerTypeName: any = {
    class: '类',
    expression: '表达式',
    delegateExpression: '代理表达式',
  }
  const handleOk = async () => {
    // 提交表单
    try {
      const formResults = await form.validateFields()
      formResults.listenerTypeName = listenerTypeName[formResults.listenerType]
      onFinish(formResults, initIndex, isTaskEvent)
      // eslint-disable-next-line no-empty
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    if (visible) {
      setFormValue({
        event: initData?.event || (isTaskEvent ? 'create' : 'start'),
        listenerType: initData?.listenerType || 'class',
        value: initData?.value || '',
      })
    }
  }, [initData, visible, isTaskEvent])
  useEffect(() => {
    form?.resetFields()
  }, [form, formValue])

  return (
    <Modal
      title="添加按钮"
      maskClosable={false}
      destroyOnClose
      width={600}
      visible={visible}
      onCancel={toggleModal}
      footer={
        <div style={{ textAlign: 'right' }}>
          <Button
            style={{ margin: '0 8px' }}
            onClick={() => {
              toggleModal()
            }}
          >
            取消
          </Button>
          <Button type="primary" onClick={() => handleOk()}>
            提交
          </Button>
        </div>
      }
    >
      <Form form={form} layout="vertical" initialValues={formValue}>
        <Form.Item
          label="事件类型"
          name="event"
          rules={[{ required: true, message: '请选择事件类型' }]}
        >
          <Select options={isTaskEvent ? eventTypesTask : eventTypes} />
        </Form.Item>
        <Form.Item
          label="监听类型"
          name="listenerType"
          rules={[{ required: true, message: '请选择监听类型' }]}
        >
          <Select options={listenerTypes} />
        </Form.Item>
        <Form.Item label="值" name="value" rules={[{ required: true, message: '请输入值' }]}>
          <Input placeholder="请输入值" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default FlowListener
