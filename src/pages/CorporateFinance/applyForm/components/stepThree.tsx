import { useImperativeHandle, forwardRef } from 'react'
import ComCard from '@/components/ComPage/ComCard'
import { Form, Input } from 'antd'
import { useIntl } from 'umi'
import DictSelect from '@/components/ComSelect'
import { phoneReg } from '@/utils/reg'
import RequiredLabel from '@/components/RequiredLabel'
import RealPersonInfo from './realPersonInfo'
import MetalPersonInfo from './metaInfo'
import MainPrincipal from './principal'
import FinancePrincipal from './financePrincipal'

const StepThree = ({}, ref: any) => {
  const [form] = Form.useForm()
  const intl = useIntl()

  useImperativeHandle(ref, () => ({
    // getOneStepData 就是暴露给父组件的方法
    getOneStepData: () => {
      return {} // 将表格form实例与表格元素导出
    },
  }))

  return (
    <Form
      name="basic"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ phoneArea: '1' }}
      form={form}
      autoComplete="off"
    >
      <ComCard
        title={intl.formatMessage({
          id: 'credit.apply.legalPersonInfo',
        })}
      >
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
      {/* 实控人信息 */}
      <RealPersonInfo />
      {/* 实控人配偶信息 */}
      <MetalPersonInfo />
      {/* 主要负责人信息 */}
      <MainPrincipal />
      {/* 财务负责人信息 */}
      <FinancePrincipal />
    </Form>
  )
}

export default forwardRef(StepThree)
