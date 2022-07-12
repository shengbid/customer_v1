import React from 'react'
import ComCard from '@/components/ComPage/ComCard'
import { Form, Input, InputNumber } from 'antd'
import { useIntl, useModel } from 'umi'
import DictSelect from '@/components/ComSelect'

const { TextArea } = Input

const StepOne: React.FC = () => {
  const intl = useIntl()
  const [form] = Form.useForm()
  const { initialState } = useModel('@@initialState')
  const { currentUser } = initialState

  return (
    <ComCard title="企业信息">
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        initialValues={{ phoneArea: '1' }}
        form={form}
        autoComplete="off"
      >
        <Form.Item
          name="companyName"
          label={intl.formatMessage({
            id: 'credit.apply.companyName',
          })}
          rules={[
            {
              required: true,
              message: `${intl.formatMessage({
                id: 'pages.form.input',
              })}${intl.formatMessage({
                id: 'credit.apply.companyName',
              })}`,
            },
          ]}
        >
          <span>{currentUser.userName}</span>
        </Form.Item>
        <Form.Item
          name="business"
          label={intl.formatMessage({
            id: 'credit.apply.business',
          })}
          rules={[
            {
              required: true,
              message: `${intl.formatMessage({
                id: 'pages.form.input',
              })}${intl.formatMessage({
                id: 'credit.apply.business',
              })}`,
            },
          ]}
        >
          <DictSelect authorword="credit_status" type="checkbox" />
        </Form.Item>
        <Form.Item
          name="type"
          label={intl.formatMessage({
            id: 'credit.apply.type',
          })}
          rules={[
            {
              required: true,
              message: `${intl.formatMessage({
                id: 'pages.form.input',
              })}${intl.formatMessage({
                id: 'credit.apply.type',
              })}`,
            },
          ]}
        >
          <Input maxLength={50} />
        </Form.Item>
        <Form.Item
          name="debt"
          label={intl.formatMessage({
            id: 'credit.apply.debt',
          })}
          rules={[
            {
              required: true,
              message: `${intl.formatMessage({
                id: 'pages.form.input',
              })}${intl.formatMessage({
                id: 'credit.apply.debt',
              })}`,
            },
          ]}
        >
          <TextArea maxLength={1000} autoSize={{ minRows: 3, maxRows: 5 }} />
        </Form.Item>
        <Form.Item
          name="amount"
          label={intl.formatMessage({
            id: 'credit.apply.amount',
          })}
          rules={[
            {
              required: true,
              message: `${intl.formatMessage({
                id: 'pages.form.input',
              })}${intl.formatMessage({
                id: 'credit.apply.amount',
              })}`,
            },
          ]}
        >
          <InputNumber maxLength={10} min={0} style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </ComCard>
  )
}

export default StepOne
