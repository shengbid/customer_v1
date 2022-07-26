import React, { useState } from 'react'
import { useIntl } from 'umi'
import ComCard from '@/components/ComPage/ComCard'
import DictSelect from '@/components/ComSelect'
import { phoneReg, idCardReg } from '@/utils/reg'
import RequiredLabel from '@/components/RequiredLabel'
import { Form, Input, Row, Col, Radio } from 'antd'
import ComUpload from '@/components/ComUpload'
import UploadImage from '@/components/ComUpload/uploadImage'

interface reralProps {
  changeRealMarital: (value: string) => void
  changeLegalFlag: (value: string) => void
}
// 实控人信息
const RealPersonInfo: React.FC<reralProps> = ({ changeRealMarital, changeLegalFlag }) => {
  const intl = useIntl()
  const [idType, setIdTyp] = useState<string>('xgsfz')

  const gutter = 10
  return (
    <ComCard
      title={intl.formatMessage({
        id: 'credit.apply.RealPersonInfo',
      })}
    >
      <Form.Item label="identity" name="identity" style={{ display: 'none' }}>
        <Input />
      </Form.Item>
      <Form.Item label="id" name="id" style={{ display: 'none' }}>
        <Input />
      </Form.Item>
      <Row gutter={gutter}>
        <Col span={12}>
          <Form.Item
            name="legalFlag"
            label={intl.formatMessage({
              id: 'credit.apply.legalFlag',
            })}
            rules={[
              {
                required: true,
                message: `${intl.formatMessage({
                  id: 'pages.form.select',
                })}${intl.formatMessage({
                  id: 'credit.apply.legalFlag',
                })}`,
              },
            ]}
          >
            <Radio.Group onChange={(e: any) => changeLegalFlag(e.target.value)}>
              <Radio value={'yes'}>
                {intl.formatMessage({
                  id: 'pages.form.yes',
                })}
              </Radio>
              <Radio value={'no'}>
                {intl.formatMessage({
                  id: 'pages.form.no',
                })}
              </Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={gutter}>
        <Col span={12}>
          <Form.Item
            name="identityType"
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
            <DictSelect authorword="cus_sfzlx" onChange={(val: string) => setIdTyp(val)} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="identityNumber"
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
              <UploadImage limit={1} />
            </Form.Item>
          )}
        </Col>
      </Row>

      <Row gutter={gutter}>
        <Col span={12}>
          <Form.Item
            name="name"
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
        </Col>
      </Row>

      <Row gutter={gutter}>
        <Col span={12}>
          <Form.Item
            name="marriageStatus"
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
            <DictSelect authorword="hyqk" onChange={changeRealMarital} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="houseStatus"
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
            <DictSelect authorword="zfqk" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={gutter}>
        <Col span={12}>
          <Form.Item
            name="workYear"
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
            name="spouseCreditReport"
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
            name="houseLicense"
            label={intl.formatMessage({
              id: 'credit.apply.owerCertificate',
            })}
            rules={[
              {
                required: false,
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
            name="driveLicense"
            label={intl.formatMessage({
              id: 'credit.apply.drivingLicense',
            })}
            rules={[
              {
                required: false,
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
        name="houseAddr"
        label={intl.formatMessage({
          id: 'credit.apply.address',
        })}
        wrapperCol={{
          span: 19,
        }}
        labelCol={{ span: 3 }}
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
