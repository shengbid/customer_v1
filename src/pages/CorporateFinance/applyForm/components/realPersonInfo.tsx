import React, { useState } from 'react'
import { useIntl } from 'umi'
import ComCard from '@/components/ComPage/ComCard'
import DictSelect from '@/components/ComSelect'
import { phoneReg, idCardReg } from '@/utils/reg'
import RequiredLabel from '@/components/RequiredLabel'
import { Form, Input, Row, Col } from 'antd'
import ComUpload from '@/components/ComUpload'
import UploadImage from '@/components/ComUpload/uploadImage'

interface reralProps {
  changeRealMarital: (value: string) => void
}
// 实控人信息
const RealPersonInfo: React.FC<reralProps> = ({ changeRealMarital }) => {
  const intl = useIntl()
  const [idType, setIdTyp] = useState<number>(1)

  const gutter = 10
  return (
    <ComCard
      title={intl.formatMessage({
        id: 'credit.apply.RealPersonInfo',
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
            <DictSelect
              authorword="credit_status"
              onChange={(val: string) => setIdTyp(Number(val))}
            />
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
          {idType !== 3 && (
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
            <DictSelect authorword="credit_status" onChange={changeRealMarital} />
          </Form.Item>
        </Col>
        <Col span={12}>
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
        </Col>
      </Row>

      <Row gutter={gutter}>
        <Col span={12}>
          <Form.Item
            name="realPeriod"
            label={intl.formatMessage({
              id: 'credit.apply.realPeriod',
            })}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 14 }}
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
        </Col>
        <Col span={12}>
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
            <ComUpload limit={1} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={gutter}>
        <Col span={12}>
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
        </Col>
        <Col span={12}>
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
        </Col>
      </Row>

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
    </ComCard>
  )
}

export default RealPersonInfo
