import React, { useState, useEffect } from 'react'
import { Form, Input, Row, Col } from 'antd'
import DictSelect from '@/components/ComSelect'
import { idReg } from '@/utils/reg'
import ComCard from '@/components/ComPage/ComCard'
import { useIntl } from 'umi'
import UploadImage from '@/components/ComUpload/uploadImage'
import PhoneInput from '@/components/Input/phoneInput'

// 法人信息
const LegalPerson: React.FC<{ form: any; info?: any }> = ({ form, info = {} }) => {
  const intl = useIntl()
  const [idType, setIdTyp] = useState<string>('')

  useEffect(() => {
    if (info && info.identityType) {
      setIdTyp(info.identityType)
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
          // houseAddr: item.birthPlace,
        })
      } else {
        form.setFieldsValue({
          identityNumber: item.number,
          name: item.identityName,
          // houseAddr: item.address,
        })
      }
    }
  }

  const gutter = 10
  return (
    <ComCard
      title={intl.formatMessage({
        id: 'credit.apply.legalPersonInfo',
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
          <PhoneInput initType={info.phoneArea} />
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
            <DictSelect authorword="hyqk" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="houseAddr"
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
