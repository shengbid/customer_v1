import React from 'react'
import { useIntl } from 'umi'
import ComCard from '@/components/ComPage/ComCard'
import DictSelect from '@/components/ComSelect'
import { phoneReg } from '@/utils/reg'
import RequiredLabel from '@/components/RequiredLabel'
import { Form, Input } from 'antd'

// 财务负责人信息
const MetalPersonInfo: React.FC = () => {
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

      <Form.Item
        label={
          <RequiredLabel
            label={intl.formatMessage({
              id: 'credit.apply.phone',
            })}
          />
        }
      >
        <Form.Item
          name="phoneArea"
          style={{ display: 'inline-block', marginBottom: 0, width: '30%' }}
        >
          <DictSelect authorword="phone_code" allowClear={false} />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          style={{ display: 'inline-block', marginBottom: 0, width: '70%' }}
          rules={[
            {
              required: true,
              message: `${intl.formatMessage({
                id: 'pages.form.input',
              })}${intl.formatMessage({
                id: 'credit.apply.phone',
              })}`,
            },
            phoneReg,
          ]}
        >
          <Input maxLength={50} />
        </Form.Item>
      </Form.Item>
    </ComCard>
  )
}

export default MetalPersonInfo
