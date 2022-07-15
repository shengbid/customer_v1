import React, { useState } from 'react'
import { Form, Input, Row, Col } from 'antd'
import DictSelect from '@/components/ComSelect'
import { phoneReg, idCardReg } from '@/utils/reg'
import RequiredLabel from '@/components/RequiredLabel'
import ComCard from '@/components/ComPage/ComCard'
import { useIntl } from 'umi'
import UploadImage from '@/components/ComUpload/uploadImage'

// 法人信息
const LegalPerson: React.FC = () => {
  const intl = useIntl()
  const [idType, setIdTyp] = useState<string>('xgsfz')

  const gutter = 10
  return (
    <ComCard
      title={intl.formatMessage({
        id: 'credit.apply.legalPersonInfo',
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
            name="legalName"
            label={intl.formatMessage({
              id: 'credit.apply.legalName',
            })}
            rules={[
              {
                required: true,
                message: `${intl.formatMessage({
                  id: 'pages.form.input',
                })}${intl.formatMessage({
                  id: 'credit.apply.legalName',
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
      <Row gutter={gutter}>
        <Col span={12}>
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
        </Col>
        <Col span={12}>
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
        </Col>
      </Row>
    </ComCard>
  )
}

export default LegalPerson
