import React from 'react'
import { useIntl } from 'umi'
import ComCard from '@/components/ComPage/ComCard'
import DictSelect from '@/components/ComSelect'
import { phoneReg } from '@/utils/reg'
import RequiredLabel from '@/components/RequiredLabel'
import { Form, Input } from 'antd'
import ComUpload from '@/components/ComUpload'

// 实控人信息
const RealPersonInfo: React.FC = () => {
  const intl = useIntl()

  return (
    <ComCard
      title={intl.formatMessage({
        id: 'credit.apply.RealPersonInfo',
      })}
    >
      <Form.Item
        name="RealName"
        label={intl.formatMessage({
          id: 'credit.apply.RealName',
        })}
        rules={[
          {
            required: true,
            message: `${intl.formatMessage({
              id: 'pages.form.input',
            })}${intl.formatMessage({
              id: 'credit.apply.RealName',
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
        name="maritalStatus"
        label={intl.formatMessage({
          id: 'credit.apply.maritalStatus',
        })}
        rules={[
          {
            required: true,
            message: `${intl.formatMessage({
              id: 'pages.form.select',
            })}${intl.formatMessage({
              id: 'credit.apply.maritalStatus',
            })}`,
          },
        ]}
      >
        <DictSelect authorword="credit_status" />
      </Form.Item>
      <Form.Item
        name="addressStatus"
        label={intl.formatMessage({
          id: 'credit.apply.addressStatus',
        })}
        rules={[
          {
            required: true,
            message: `${intl.formatMessage({
              id: 'pages.form.select',
            })}${intl.formatMessage({
              id: 'credit.apply.addressStatus',
            })}`,
          },
        ]}
      >
        <DictSelect authorword="credit_status" />
      </Form.Item>
      <Form.Item
        name="address"
        label={intl.formatMessage({
          id: 'credit.apply.address',
        })}
        rules={[
          {
            required: true,
            message: `${intl.formatMessage({
              id: 'pages.form.input',
            })}${intl.formatMessage({
              id: 'credit.apply.address',
            })}`,
          },
        ]}
      >
        <Input maxLength={50} />
      </Form.Item>
      <Form.Item
        name="realPeriod"
        label={intl.formatMessage({
          id: 'credit.apply.realPeriod',
        })}
        rules={[
          {
            required: true,
            message: `${intl.formatMessage({
              id: 'pages.form.input',
            })}${intl.formatMessage({
              id: 'credit.apply.realPeriod',
            })}`,
          },
        ]}
      >
        <Input maxLength={50} />
      </Form.Item>
      <Form.Item
        name="realCrediReport"
        label={intl.formatMessage({
          id: 'credit.apply.realCrediReport',
        })}
        rules={[
          {
            required: true,
            message: `${intl.formatMessage({
              id: 'pages.form.upload',
            })}${intl.formatMessage({
              id: 'credit.apply.realCrediReport',
            })}`,
          },
        ]}
      >
        <ComUpload />
      </Form.Item>
      <Form.Item
        name="owerCertificate"
        label={intl.formatMessage({
          id: 'credit.apply.owerCertificate',
        })}
        rules={[
          {
            required: true,
            message: `${intl.formatMessage({
              id: 'pages.form.upload',
            })}${intl.formatMessage({
              id: 'credit.apply.owerCertificate',
            })}`,
          },
        ]}
      >
        <ComUpload />
      </Form.Item>
      <Form.Item
        name="drivingLicense"
        label={intl.formatMessage({
          id: 'credit.apply.drivingLicense',
        })}
        rules={[
          {
            required: true,
            message: `${intl.formatMessage({
              id: 'pages.form.upload',
            })}${intl.formatMessage({
              id: 'credit.apply.drivingLicense',
            })}`,
          },
        ]}
      >
        <ComUpload />
      </Form.Item>
    </ComCard>
  )
}

export default RealPersonInfo
