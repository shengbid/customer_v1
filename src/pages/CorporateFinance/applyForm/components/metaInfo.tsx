import React, { useState, useEffect } from 'react'
import { useIntl } from 'umi'
import ComCard from '@/components/ComPage/ComCard'
import DictSelect from '@/components/ComSelect'
import { idReg } from '@/utils/reg'
import PhoneInput from '@/components/Input/phoneInput'
import { Form, Input, Row, Col } from 'antd'
import ComUpload from '@/components/ComUpload'
import UploadImage from '@/components/ComUpload/uploadImage'

// 实控人配偶信息
const MetalPersonInfo: React.FC<{ form: any; info?: any }> = ({ form, info = {} }) => {
  const intl = useIntl()
  const [idType, setIdTyp] = useState<string>('')

  useEffect(() => {
    if (info && info.identity) {
      setIdTyp(info.identity)
    }
  }, [info])

  // 回显身份信息
  const setIdInfo = (files: any) => {
    if (files && files.length) {
      const item = files[0]
      if (idType === 'hz') {
        form.setFieldsValue({
          identityNumber: item.passportNumber,
          name: item.passportName,
        })
      } else {
        form.setFieldsValue({
          identityNumber: item.number,
          name: item.identityName,
        })
      }
    }
  }

  const gutter = 10
  return (
    <ComCard
      title={intl.formatMessage({
        id: 'credit.apply.metalInfo',
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
            <DictSelect
              allowClear={false}
              authorword="cus_sfzlx"
              onChange={(val: string) => setIdTyp(val)}
            />
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
              idReg[idType],
            ]}
          >
            <Input maxLength={18} />
          </Form.Item>
        </Col>
      </Row>

      {idType ? (
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
              <UploadImage
                urlStr={idType !== 'hz' ? '/file/upload/identity' : '/file/upload/passport'}
                limit={1}
                infoData={{ cardSide: 'front' }}
                onChange={setIdInfo}
              />
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
      ) : null}

      <Row gutter={gutter}>
        <Col span={12}>
          <Form.Item
            name="name"
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
          <PhoneInput initType={info.phoneArea} />
        </Col>
      </Row>

      <Form.Item
        name="creditReport"
        label={intl.formatMessage({
          id: 'credit.apply.metalCreditReport',
        })}
        wrapperCol={{
          span: 18,
        }}
        labelCol={{ span: 4 }}
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
