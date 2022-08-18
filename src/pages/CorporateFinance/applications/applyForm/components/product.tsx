import { useImperativeHandle, forwardRef, useState } from 'react'
import ComCard from '@/components/ComPage/ComCard'
import ComEditTable from '@/components/ComProtable/ComEditTable'
import { Form, Row, Col, DatePicker } from 'antd'
import RequiredLabel from '@/components/RequiredLabel'
import IntergerInput from '@/components/Input/integerInput'
import PointInput from '@/components/Input/InputNumber'
import DictSelect from '@/components/ComSelect'

const Product = ({}, ref: any) => {
  const [dataSource, setDataSource] = useState<any[]>([{ id: 1 }])
  const [editableKeys, setEditableRowKeys] = useState<any[]>([1])

  const [tableForm] = Form.useForm()
  const [form] = Form.useForm()

  useImperativeHandle(ref, () => ({
    // 暴露给父组件的方法
    getBusinessData: async () => {
      try {
        await tableForm.validateFields()
        await form.validateFields()
        return { businessData: dataSource, product: form.getFieldsValue() }
      } catch (error) {
        return ''
      }
    },
  }))

  const columns = [
    {
      title: <RequiredLabel label="商品条形码" />,
      dataIndex: 'barCode',
      width: '8%',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项是必填项',
          },
        ],
      },
    },
    {
      title: <RequiredLabel label="描述 DESCRIPTION" />,
      dataIndex: 'goodName',
      width: '8%',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项是必填项',
          },
        ],
      },
    },
    {
      title: <RequiredLabel label="品牌 BRAND" />,
      dataIndex: 'goodBrand',
      width: '8%',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项是必填项',
          },
        ],
      },
    },
    {
      title: <RequiredLabel label="SKU NO" />,
      dataIndex: 'goodSku',
      width: '8%',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项是必填项',
          },
        ],
      },
    },
    {
      title: <RequiredLabel label="参考编码REF NO" />,
      dataIndex: 'goodSku',
      width: '8%',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项是必填项',
          },
        ],
      },
    },
    {
      title: <RequiredLabel label="有效期至" />,
      dataIndex: 'date',
      width: '8%',
      valueType: 'date',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项是必填项',
          },
        ],
      },
    },
    {
      title: <RequiredLabel label="单价(美元)" />,
      dataIndex: 'price',
      width: '8%',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项是必填项',
          },
        ],
      },
      renderFormItem: () => <PointInput />,
    },
    {
      title: <RequiredLabel label="数量" />,
      dataIndex: 'price',
      width: '8%',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项是必填项',
          },
        ],
      },
      renderFormItem: () => <IntergerInput />,
    },
    {
      title: <RequiredLabel label="采购金额(美元)" />,
      dataIndex: 'price',
      width: '8%',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项是必填项',
          },
        ],
      },
      renderFormItem: () => <PointInput />,
    },
    {
      title: <RequiredLabel label="保证金比例" />,
      dataIndex: 'price',
      width: '8%',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项是必填项',
          },
        ],
      },
      renderFormItem: () => <PointInput max={100} />,
    },
    {
      title: <RequiredLabel label="委托方应付保证金(美元)" />,
      dataIndex: 'price',
      width: '8%',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项是必填项',
          },
        ],
      },
      renderFormItem: () => <PointInput />,
    },
    {
      title: <RequiredLabel label="受托方垫付金额(美元)" />,
      dataIndex: 'price',
      width: '8%',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项是必填项',
          },
        ],
      },
      renderFormItem: () => <PointInput />,
    },
  ]

  return (
    <ComCard title="录入采购信息">
      <ComEditTable<any>
        rowKey="id"
        className="nopaddingtable"
        maxLength={5}
        columns={columns}
        value={dataSource}
        scroll={{
          x: 1350,
        }}
        onChange={setDataSource}
        editable={{
          form: tableForm,
          type: 'multiple',
          editableKeys,
          onValuesChange: (record: any, recordList: any) => {
            setDataSource(recordList)
          },
          onChange: setEditableRowKeys,
        }}
      />

      <Form name="basic" form={form} autoComplete="off" layout="vertical">
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              label="运输方式"
              name="warehouseName"
              rules={[
                {
                  required: true,
                  message: `请选择运输方式`,
                },
              ]}
            >
              <DictSelect authorword="warehouse_type" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="交货地点"
              name="warehouseType"
              rules={[
                {
                  required: true,
                  message: `请选择交货地点`,
                },
              ]}
            >
              <DictSelect authorword="warehouse_type" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="预计交货时间"
              name="time"
              rules={[
                {
                  required: true,
                  message: `请选择预计交货时间`,
                },
              ]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </ComCard>
  )
}

export default forwardRef(Product)
