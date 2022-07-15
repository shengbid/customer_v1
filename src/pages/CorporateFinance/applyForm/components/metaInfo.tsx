import React, { useState } from 'react'
import { useIntl } from 'umi'
import ComCard from '@/components/ComPage/ComCard'
import DictSelect from '@/components/ComSelect'
import { phoneReg, idCardReg } from '@/utils/reg'
import RequiredLabel from '@/components/RequiredLabel'
import { Form, Input, Row, Col } from 'antd'
import ComUpload from '@/components/ComUpload'
import UploadImage from '@/components/ComUpload/uploadImage'

// 实控人配偶信息
const MetalPersonInfo: React.FC = () => {
  const intl = useIntl()
  const [idType, setIdTyp] = useState<string>('xgsfz')

  const gutter = 10
  return (
    <ComCard
      title={intl.formatMessage({
        id: 'credit.apply.metalInfo',
      })}
    >
      <Row gutter={gutter}>
        <Col span={12}>
          <Form.Item
            name="idType"
            label={intl.formatMessage({
              id: 'credit.apply.idType',
            })}
            rules={[
              {
                required: true,
                message: `${intl.formatMessage({
                  id: 'pages.form.select',
                })}${intl.formatMessage({
                  id: 'credit.apply.idType',
                })}`,
              },
            ]}
          >
            <DictSelect authorword="sfzlx" onChange={(val: string) => setIdTyp(val)} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="idNo"
            label={intl.formatMessage({
              id: 'credit.apply.idNo',
            })}
            rules={[
              {
                required: true,
                message: `${intl.formatMessage({
                  id: 'pages.form.input',
                })}${intl.formatMessage({
                  id: 'credit.apply.idNo',
                })}`,
              },
              idCardReg,
            ]}
          >
            <Input maxLength={50} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={gutter}>
        <Col span={12}>
          <Form.Item
            name="idFront"
            label={intl.formatMessage({
              id: 'credit.apply.idFront',
            })}
            rules={[
              {
                required: true,
                message: `${intl.formatMessage({
                  id: 'pages.form.upload',
                })}${intl.formatMessage({
                  id: 'credit.apply.idFront',
                })}`,
              },
            ]}
          >
            <UploadImage limit={1} />
          </Form.Item>
        </Col>
        <Col span={12}>
          {idType !== 'hz' && (
            <Form.Item
              name="idReverse"
              label={intl.formatMessage({
                id: 'credit.apply.idReverse',
              })}
              rules={[
                {
                  required: true,
                  message: `${intl.formatMessage({
                    id: 'pages.form.upload',
                  })}${intl.formatMessage({
                    id: 'credit.apply.idReverse',
                  })}`,
                },
              ]}
            >
              <UploadImage />
            </Form.Item>
          )}
        </Col>
      </Row>

      <Row gutter={gutter}>
        <Col span={12}>
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
        </Col>
        <Col span={12}>
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
        </Col>
      </Row>

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
        <ComUpload limit={1} />
      </Form.Item>
    </ComCard>
  )
}

export default MetalPersonInfo
