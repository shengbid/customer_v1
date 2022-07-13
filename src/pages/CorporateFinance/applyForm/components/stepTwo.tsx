import { useImperativeHandle, forwardRef } from 'react'
import ComCard from '@/components/ComPage/ComCard'
import { Form } from 'antd'
import { useIntl } from 'umi'
import ComUpload from '@/components/ComUpload'
import DownloadFile from '@/components/ComUpload/downloadFile'
import RequiredLabel from '@/components/RequiredLabel'

interface stepsprops {
  type: string[]
}
const StepTwo = ({ type }: stepsprops, ref: any) => {
  const [form] = Form.useForm()
  const intl = useIntl()

  useImperativeHandle(ref, () => ({
    // getOneStepData 就是暴露给父组件的方法
    getOneStepData: () => {
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
    >
      <ComCard
        title={intl.formatMessage({
          id: 'credit.apply.companyBaseInfo',
        })}
      >
        <Form.Item
          name="accountStatement"
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
          name="cargoList"
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
          name="purchaseList"
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
            name="supplierList"
            style={{ display: 'inline-block', marginBottom: 0 }}
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
            <ComUpload />
          </Form.Item>
          <DownloadFile />
        </Form.Item>
      </ComCard>

      {type.includes('1') && (
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
              name="actualOperater"
              style={{ display: 'inline-block', marginBottom: 0 }}
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
              <ComUpload />
            </Form.Item>
            <DownloadFile />
          </Form.Item>
          <Form.Item
            name="saleList"
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
            name="platformReceivables"
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

      {type.includes('2') && (
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
              name="cooperateClient"
              style={{ display: 'inline-block', marginBottom: 0 }}
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
              <ComUpload />
            </Form.Item>
            <DownloadFile />
          </Form.Item>
          <Form.Item
            name="b2bSaleList"
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
    </Form>
  )
}

export default forwardRef(StepTwo)
