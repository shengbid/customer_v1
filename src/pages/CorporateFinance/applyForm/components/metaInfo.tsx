import React from 'react'
import { useIntl } from 'umi'
import ComCard from '@/components/ComPage/ComCard'
import DictSelect from '@/components/ComSelect'
import { phoneReg } from '@/utils/reg'
import RequiredLabel from '@/components/RequiredLabel'
import { Form, Input } from 'antd'
import ComUpload from '@/components/ComUpload'

// 实控人配偶信息
const MetalPersonInfo: React.FC = () => {
  const intl = useIntl()

  return (
    <ComCard
      title={intl.formatMessage({
        id: 'credit.apply.metalInfo',
      })}
    >
      <Form.Item
        name="metalName"
        label={intl.formatMessage({
          id: 'credit.apply.metalName',
        })}
        rules={[
          {
            required: true,
            message: `${intl.formatMessage({
              id: 'pages.form.input',
            })}${intl.formatMessage({
              id: 'credit.apply.metalName',
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
          name="phone"
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

      <Form.Item
        name="metalCreditReport"
        label={intl.formatMessage({
          id: 'credit.apply.metalCreditReport',
        })}
        rules={[
          {
            required: true,
            message: `${intl.formatMessage({
              id: 'pages.form.select',
            })}${intl.formatMessage({
              id: 'credit.apply.metalCreditReport',
            })}`,
          },
        ]}
      >
        <ComUpload />
      </Form.Item>
    </ComCard>
  )
}

export default MetalPersonInfo
