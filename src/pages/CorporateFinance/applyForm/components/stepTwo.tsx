import { useImperativeHandle, forwardRef, useEffect } from 'react'
import ComCard from '@/components/ComPage/ComCard'
import { Form, Input } from 'antd'
import { useIntl } from 'umi'
import ComUpload from '@/components/ComUpload'
import DownloadFile from '@/components/ComUpload/downloadFile'
import RequiredLabel from '@/components/RequiredLabel'
import { getCreditDetail } from '@/services'
import { useState } from 'react'

interface stepsprops {
  type: string[]
}
const StepTwo = ({ type }: stepsprops, ref: any) => {
  const [types, setTypes] = useState(type)
  const [show1, setshow1] = useState(0)
  const [show2, setshow2] = useState(0)
  const [show3, setshow3] = useState(0)
  const [form] = Form.useForm()
  const intl = useIntl()

  // 获取详情
  const getDetail = async () => {
    const { data } = await getCreditDetail()
    if (data && data.id) {
      form.setFieldsValue({ ...data.dsList, ...data.qyList })
      if (data.businessTypeList) {
        setTypes(data.businessTypeList)
      }
    }
  }

  useEffect(() => {
    getDetail()
  }, [])

  useImperativeHandle(ref, () => ({
    // getOneStepData 就是暴露给父组件的方法
    getStepData: () => {
      return { form }
    },
  }))
  return (
    <Form
      name="basic"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 17 }}
      initialValues={{ phoneArea: '1' }}
      form={form}
      autoComplete="off"
      scrollToFirstError
    >
      <ComCard
        title={intl.formatMessage({
          id: 'credit.apply.companyBaseInfo',
        })}
      >
        <Form.Item label="creditId" name="creditId" style={{ display: 'none' }}>
          <Input />
        </Form.Item>
        <Form.Item
          name="lszh"
          label={intl.formatMessage({
            id: 'credit.apply.accountStatement',
          })}
          rules={[
            {
              required: true,
              message: `${intl.formatMessage({
                id: 'pages.form.upload',
              })}${intl.formatMessage({
                id: 'credit.apply.accountStatement',
              })}`,
            },
          ]}
        >
          <ComUpload />
        </Form.Item>
        <Form.Item
          name="hwqd"
          label={intl.formatMessage({
            id: 'credit.apply.cargoList',
          })}
          rules={[
            {
              required: true,
              message: `${intl.formatMessage({
                id: 'pages.form.upload',
              })}${intl.formatMessage({
                id: 'credit.apply.cargoList',
              })}`,
            },
          ]}
        >
          <ComUpload />
        </Form.Item>
        <Form.Item
          name="cgqd"
          label={intl.formatMessage({
            id: 'credit.apply.purchaseList',
          })}
          rules={[
            {
              required: true,
              message: `${intl.formatMessage({
                id: 'pages.form.upload',
              })}${intl.formatMessage({
                id: 'credit.apply.purchaseList',
              })}`,
            },
          ]}
        >
          <ComUpload />
        </Form.Item>
        <Form.Item
          label={
            <RequiredLabel
              label={intl.formatMessage({
                id: 'credit.apply.supplierList',
              })}
            />
          }
        >
          <Form.Item
            name="gysqd"
            style={{
              display: 'inline-block',
              width: '90%',
              marginBottom: 0,
              marginTop: show1 ? 25 : 0,
            }}
            rules={[
              {
                required: true,
                message: `${intl.formatMessage({
                  id: 'pages.form.upload',
                })}${intl.formatMessage({
                  id: 'credit.apply.supplierList',
                })}`,
              },
            ]}
          >
            <ComUpload limit={1} onChange={(val) => setshow1(val.length)} />
          </Form.Item>
          <DownloadFile
            style={{
              position: 'absolute',
              left: 50,
            }}
            templateId="eOIa0c2I6R0NC5MeHR3"
          />
        </Form.Item>
      </ComCard>

      {types.includes('B2B') && (
        <ComCard
          title={intl.formatMessage({
            id: 'credit.apply.B2BInfo',
          })}
        >
          <Form.Item
            label={
              <RequiredLabel
                label={intl.formatMessage({
                  id: 'credit.apply.cooperateClient',
                })}
              />
            }
          >
            <Form.Item
              name="xykhqd"
              style={{
                display: 'inline-block',
                width: '90%',
                marginBottom: 0,
                marginTop: show2 ? 25 : 0,
              }}
              rules={[
                {
                  required: true,
                  message: `${intl.formatMessage({
                    id: 'pages.form.upload',
                  })}${intl.formatMessage({
                    id: 'credit.apply.cooperateClient',
                  })}`,
                },
              ]}
            >
              <ComUpload limit={1} onChange={(val) => setshow2(val.length)} />
            </Form.Item>
            <DownloadFile
              style={{ position: 'absolute', left: 50 }}
              templateId="4IjAsqinzus91Msi9ln"
            />
          </Form.Item>
          <Form.Item
            name="btobSdqd"
            label={intl.formatMessage({
              id: 'credit.apply.b2bSaleList',
            })}
            rules={[
              {
                required: true,
                message: `${intl.formatMessage({
                  id: 'pages.form.upload',
                })}${intl.formatMessage({
                  id: 'credit.apply.b2bSaleList',
                })}`,
              },
            ]}
          >
            <ComUpload />
          </Form.Item>
        </ComCard>
      )}

      {types.includes('B2C') && (
        <ComCard
          title={intl.formatMessage({
            id: 'credit.apply.b2cInfo',
          })}
        >
          <Form.Item
            label={
              <RequiredLabel
                label={intl.formatMessage({
                  id: 'credit.apply.actualOperater',
                })}
              />
            }
          >
            <Form.Item
              name="jyrsm"
              style={{
                display: 'inline-block',
                width: '90%',
                marginBottom: 0,
                marginTop: show3 ? 25 : 0,
              }}
              rules={[
                {
                  required: true,
                  message: `${intl.formatMessage({
                    id: 'pages.form.upload',
                  })}${intl.formatMessage({
                    id: 'credit.apply.actualOperater',
                  })}`,
                },
              ]}
            >
              <ComUpload limit={1} onChange={(val) => setshow3(val.length)} />
            </Form.Item>
            <DownloadFile
              style={{ position: 'absolute', left: 50 }}
              templateId="Dn1IyZvubOpjcYpgWzY"
            />
          </Form.Item>
          <Form.Item
            name="btocSdqd"
            label={intl.formatMessage({
              id: 'credit.apply.saleList',
            })}
            rules={[
              {
                required: true,
                message: `${intl.formatMessage({
                  id: 'pages.form.upload',
                })}${intl.formatMessage({
                  id: 'credit.apply.saleList',
                })}`,
              },
            ]}
          >
            <ComUpload />
          </Form.Item>
          <Form.Item
            name="skjt"
            label={intl.formatMessage({
              id: 'credit.apply.platformReceivables',
            })}
            rules={[
              {
                required: true,
                message: `${intl.formatMessage({
                  id: 'pages.form.upload',
                })}${intl.formatMessage({
                  id: 'credit.apply.platformReceivables',
                })}`,
              },
            ]}
          >
            <ComUpload />
          </Form.Item>
        </ComCard>
      )}
    </Form>
  )
}

export default forwardRef(StepTwo)
