import React, { useState, useEffect } from 'react'
import { Form, Input } from 'antd'
import DictSelect from '@/components/ComSelect'
import { phoneCodeReg } from '@/utils/reg'
import RequiredLabel from '@/components/RequiredLabel'
import { useIntl } from 'umi'
import { MobileOutlined } from '@ant-design/icons'

interface phoneProps {
  initType?: string | number
  icon?: boolean
}
const PhoneInput: React.FC<phoneProps> = ({ initType = '1', icon = false }) => {
  const intl = useIntl()
  const [phoneType, setPhoneType] = useState<number>(Number(initType))

  useEffect(() => {
    if (initType) {
      setPhoneType(Number(initType))
    }
  }, [initType])

  return (
    <Form.Item
      label={
        icon ? null : (
          <RequiredLabel
            label={intl.formatMessage({
              id: 'credit.apply.phone',
            })}
          />
        )
      }
    >
      <Form.Item
        name="phoneArea"
        style={{ display: 'inline-block', marginBottom: 0, width: '30%' }}
      >
        <DictSelect
          size={icon ? 'large' : 'middle'}
          authorword="phone_code"
          allowClear={false}
          onChange={setPhoneType}
        />
      </Form.Item>
      <Form.Item
        name={icon ? 'phone' : 'phoneNumber'}
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
          phoneCodeReg[Number(phoneType)],
        ]}
      >
        <Input
          size={icon ? 'large' : 'middle'}
          prefix={icon ? <MobileOutlined /> : null}
          placeholder="手机号"
          maxLength={15}
        />
      </Form.Item>
    </Form.Item>
  )
}

export default PhoneInput
