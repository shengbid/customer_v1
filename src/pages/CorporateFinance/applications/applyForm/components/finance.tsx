import { useImperativeHandle, forwardRef, useState, useEffect } from 'react'
import ComCard from '@/components/ComPage/ComCard'
import { Form, Row, Col, Input, Radio } from 'antd'
import { formatAmount } from '@/utils/base'

const Finance = ({}, ref: any) => {
  const [infoData, setInfoData] = useState<any>({})
  const [form] = Form.useForm()

  useEffect(() => {
    setInfoData({})
  }, [])

  useImperativeHandle(ref, () => ({
    // 暴露给父组件的方法
    getBusinessData: async () => {
      try {
        await form.validateFields()
        return { product: form.getFieldsValue() }
      } catch (error) {
        return ''
      }
    },
  }))

  return (
    <ComCard title="融资信息">
      <Form name="basic" form={form} autoComplete="off" layout="vertical">
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item label="可用额度信息" name="warehouseName">
              <span>{infoData.amount}</span>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="代垫资金"
              name="warehouseType"
              rules={[
                {
                  required: true,
                  message: `请输入代垫资金`,
                },
              ]}
            >
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="委托方应付保证金" name="time">
              <span>{formatAmount(infoData.amount)}</span>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              label="垫资期限"
              name="datetype"
              rules={[
                {
                  required: true,
                  message: `请选择垫资期限`,
                },
              ]}
            >
              <Radio.Group>
                <Radio value={90}>90天</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="还款方式"
              name="warehouseName"
              rules={[
                {
                  required: true,
                  message: `请选择还款方式`,
                },
              ]}
            >
              <Radio.Group>
                <Radio value={1}>到期还款付息</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="代理服务费" name="rate">
              <span>{infoData.amount}</span>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </ComCard>
  )
}

export default forwardRef(Finance)
