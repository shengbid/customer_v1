import React, { useState, useEffect } from 'react'
import { Modal, Button, Form, Input, message, Spin, Row, Col, DatePicker } from 'antd'
import IntergerInput from '@/components/Input/integerInput'
import PointInput from '@/components/Input/InputNumber'
import { useIntl } from 'umi'
import type { addModalProps } from '@/services/types'

const AddModal: React.FC<addModalProps> = ({ modalVisible, handleSubmit, handleCancel, info }) => {
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [spinning] = useState<boolean>(false)
  const [form] = Form.useForm()
  const [title, setTitle] = useState<string>('新增商品信息')

  useEffect(() => {
    if (modalVisible && info) {
      setTitle('修改商品信息')
      form.setFieldsValue(info)
    }
  }, [modalVisible, info])

  const intl = useIntl()

  const handleOk = async (values: any) => {
    setConfirmLoading(true)
    message.success(`新增成功`)
    handleSubmit(values)
    form.resetFields()
  }

  const cancel = () => {
    handleCancel()
    form.resetFields()
  }

  return (
    <Modal
      title={title}
      maskClosable={false}
      destroyOnClose
      width={800}
      visible={modalVisible}
      footer={false}
      onCancel={cancel}
    >
      <Spin spinning={spinning}>
        <Form
          name="basic"
          initialValues={{ id: Math.floor(Math.random() * 100) }}
          onFinish={handleOk}
          form={form}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item label="id" name="id" style={{ display: 'none' }}>
            <Input maxLength={150} />
          </Form.Item>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="商品条码"
                name="barCode"
                rules={[
                  {
                    required: true,
                    message: `请输入商品条码`,
                  },
                ]}
              >
                <Input maxLength={150} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="商品名称"
                name="goodName"
                rules={[
                  {
                    required: true,
                    message: `请输入商品名称`,
                  },
                ]}
              >
                <Input maxLength={150} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="效期到期日"
                name="date"
                rules={[
                  {
                    required: true,
                    message: `请选择效期到期日`,
                  },
                ]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="批次号"
                name="no"
                rules={[
                  {
                    required: true,
                    message: `请输入批次号`,
                  },
                ]}
              >
                <Input maxLength={150} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="良品数量"
                name="fairPrice"
                rules={[
                  {
                    required: true,
                    message: `请输入良品数量`,
                  },
                ]}
              >
                <IntergerInput />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="残次品数量"
                name="warrantyMonth"
                rules={[
                  {
                    required: true,
                    message: `请输入残次品数量`,
                  },
                ]}
              >
                <IntergerInput />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="商品编码"
                name="goodBrand"
                rules={[
                  {
                    required: true,
                    message: `请输入商品企业编码`,
                  },
                ]}
              >
                <Input placeholder="请输入企业内部对商品的唯一编码" maxLength={150} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="商品HScode"
                name="goodHscode"
                rules={[
                  {
                    required: true,
                    message: `请输入商品HScode`,
                  },
                ]}
              >
                <Input maxLength={150} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="最近采购价"
                name="purchasePrice"
                rules={[
                  {
                    required: false,
                    message: `请输入最近采购价`,
                  },
                ]}
              >
                <PointInput addonBefore="$" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="商品单位"
                name="warrantyMonth"
                rules={[
                  {
                    required: false,
                    message: `请输入商品单位`,
                  },
                ]}
              >
                <Input placeholder="请输入商品单位, 例如: 个" maxLength={10} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="商品SKU NO"
                name="goodSku"
                rules={[
                  {
                    required: false,
                    message: `请输入商品SKU NO`,
                  },
                ]}
              >
                <Input placeholder="请输入商品SKU NO, 如果有多个以逗号(半角)隔开" maxLength={150} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="商品料号"
                name="goodHscode"
                rules={[
                  {
                    required: false,
                    message: `请输入商品料号`,
                  },
                ]}
              >
                <Input maxLength={150} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="商品REF码"
                name="goodRef"
                rules={[
                  {
                    required: false,
                    message: `请输入商品REF码`,
                  },
                ]}
              >
                <Input placeholder="请输入商品REF码, 如果有多个以逗号(半角)隔开" maxLength={150} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="商品品牌"
                name="goodBrand"
                rules={[
                  {
                    required: false,
                    message: `请输入商品品牌`,
                  },
                ]}
              >
                <Input maxLength={150} />
              </Form.Item>
            </Col>
          </Row>

          <div className="modal-btns" style={{ marginTop: 24 }}>
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
