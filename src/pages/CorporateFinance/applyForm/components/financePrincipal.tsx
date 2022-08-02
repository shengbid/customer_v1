import React from 'react'
import { useIntl } from 'umi'
import ComCard from '@/components/ComPage/ComCard'
import PhoneInput from '@/components/Input/phoneInput'
import { Form, Input } from 'antd'

// 财务负责人信息
const MetalPersonInfo: React.FC<{ phoneType?: string }> = ({ phoneType }) => {
  const intl = useIntl()

  return (
    <ComCard
      title={intl.formatMessage({
        id: 'credit.apply.financeAdmin',
      })}
    >
      <Form.Item label="identity" name="identity" style={{ display: 'none' }}>
        <Input />
      </Form.Item>
      <Form.Item label="id" name="id" style={{ display: 'none' }}>
        <Input />
      </Form.Item>
      <Form.Item
        name="name"
        label={intl.formatMessage({
          id: 'credit.apply.financeAdminName',
        })}
        rules={[
          {
            required: true,
            message: `${intl.formatMessage({
              id: 'pages.form.input',
            })}${intl.formatMessage({
              id: 'credit.apply.financeAdminName',
            })}`,
          },
        ]}
      >
        <Input maxLength={50} />
      </Form.Item>

      <Form.Item
        name="duty"
        label={intl.formatMessage({
          id: 'credit.apply.duty',
        })}
        rules={[
          {
            required: true,
            message: `${intl.formatMessage({
              id: 'pages.form.input',
            })}${intl.formatMessage({
              id: 'credit.apply.duty',
            })}`,
          },
        ]}
      >
        <Input maxLength={50} />
      </Form.Item>

      <PhoneInput initType={phoneType} />
    </ComCard>
  )
}

export default MetalPersonInfo
