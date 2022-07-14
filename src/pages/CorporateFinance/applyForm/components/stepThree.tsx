import { useImperativeHandle, forwardRef, useState } from 'react'

import { Form } from 'antd'
import LegalPerson from './legalPerson'
import RealPersonInfo from './realPersonInfo'
import MetalPersonInfo from './metaInfo'
import MainPrincipal from './principal'
import FinancePrincipal from './financePrincipal'

const StepThree = ({}, ref: any) => {
  const [form] = Form.useForm()
  const [maritalStatus, setMaritalStatus] = useState<string>('2') // 婚姻状态

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
      {/* 法人信息 */}
      <LegalPerson />
      {/* 实控人信息 */}
      <RealPersonInfo changeRealMarital={setMaritalStatus} />
      {/* 实控人配偶信息 */}
      {Number(maritalStatus) === 1 && <MetalPersonInfo />}
      {/* 主要负责人信息 */}
      <MainPrincipal />
      {/* 财务负责人信息 */}
      <FinancePrincipal />
    </Form>
  )
}

export default forwardRef(StepThree)
