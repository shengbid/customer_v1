import React, { useState, useEffect } from 'react'
import { Form, Input } from 'antd'
import DictSelect from '@/components/ComSelect'
import { phoneCodeReg } from '@/utils/reg'
import RequiredLabel from '@/components/RequiredLabel'
import { useIntl } from 'umi'

const PhoneInput: React.FC<{ initType?: string | number }> = ({ initType = '1' }) => {
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
        <DictSelect authorword="phone_code" allowClear={false} onChange={setPhoneType} />
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
          phoneCodeReg[Number(phoneType)],
        ]}
      >
        <Input maxLength={15} />
      </Form.Item>
    </Form.Item>
  )
}

export default PhoneInput
