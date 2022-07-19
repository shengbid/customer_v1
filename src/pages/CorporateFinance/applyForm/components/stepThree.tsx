import { useImperativeHandle, forwardRef, useState } from 'react'
import { Form } from 'antd'
import LegalPerson from './legalPerson'
import RealPersonInfo from './realPersonInfo'
import MetalPersonInfo from './metaInfo'
import MainPrincipal from './principal'
import FinancePrincipal from './financePrincipal'

const StepThree = ({}, ref: any) => {
  const [maritalStatus, setMaritalStatus] = useState<string>('ds') // 婚姻状态
  const [form] = Form.useForm()
  const [realform] = Form.useForm()
  const [marform] = Form.useForm()
  const [mainform] = Form.useForm()
  const [finaneform] = Form.useForm()

  useImperativeHandle(ref, () => ({
    // getOneStepData 就是暴露给父组件的方法
    getStepData: () => {
      return { form, realform, marform, mainform, finaneform } // 将表格form实例导出
    },
  }))

  return (
    <>
      <Form
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ phoneArea: '1', identity: 'qyfr' }}
        form={form}
        autoComplete="off"
        scrollToFirstError
      >
        {/* 法人信息 */}
        <LegalPerson />
      </Form>
      <Form
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ phoneArea: '1', identity: 'skr' }}
        form={realform}
        autoComplete="off"
        scrollToFirstError
      >
        {/* 实控人信息 */}
        <RealPersonInfo changeRealMarital={setMaritalStatus} />
      </Form>
      <Form
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ phoneArea: '1', identity: 'skrpo' }}
        form={marform}
        autoComplete="off"
        scrollToFirstError
      >
        {/* 实控人配偶信息 */}
        {maritalStatus === 'yh' && <MetalPersonInfo />}
      </Form>
      <Form
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ phoneArea: '1', identity: 'zyfzr' }}
        form={mainform}
        autoComplete="off"
        scrollToFirstError
      >
        {/* 主要负责人信息 */}
        <MainPrincipal />
      </Form>
      <Form
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ phoneArea: '1', identity: 'cwfzr' }}
        form={finaneform}
        autoComplete="off"
        scrollToFirstError
      >
        {/* 财务负责人信息 */}
        <FinancePrincipal />
      </Form>
    </>
  )
}

export default forwardRef(StepThree)
