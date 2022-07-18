import React, { useState, useRef, MutableRefObject } from 'react'
import { Button, Steps } from 'antd'
import StepOne from './components/stepOne'
import StepTwo from './components/stepTwo'
import StepThree from './components/stepThree'
import styles from './index.less'
import { addCreditOne, addCreditTwo, addCreditThree } from '@/services'
import Processing from './results/processing'
import Reject from './results/reject'
import Success from './results/success'
import { isEmpty } from 'lodash'

const { Step } = Steps

const ApplyForm: React.FC = () => {
  const [current, setCurrent] = useState(2)
  const [businessType, setBusinessType] = useState(['B2B', 'B2C'])
  const creditOneRef: MutableRefObject<any> = useRef({})
  const creditTwoRef: MutableRefObject<any> = useRef({})
  const creditThreeRef: MutableRefObject<any> = useRef({})
  const [status] = useState<number>(0)
  const [btnLoading, setBtnLoading] = useState<boolean>(false)
  const [subLoading, setSubLoading] = useState<boolean>(false)

  const steps = [
    {
      title: '步骤一',
      content: <StepOne ref={creditOneRef} />,
      description: '上传企业信息',
    },
    {
      title: '步骤二',
      content: <StepTwo type={businessType} ref={creditTwoRef} />,
      description: '上传企业运营文件',
    },
    {
      title: '步骤三',
      content: <StepThree ref={creditThreeRef} />,
      description: '上传法人、实控人、联系人信息',
    },
  ]

  const next = async () => {
    switch (current) {
      case 0:
        const { form, tableForm, dataSource } = creditOneRef.current.getStepData()
        await form.validateFields()
        await tableForm.validateFields()
        const data = form.getFieldsValue()
        setBusinessType(data.businessType)
        setBtnLoading(true)
        try {
          await addCreditOne({
            cusEnterpriseInfo: { ...data, businessType: 'B2C' },
            businessDetailsList: dataSource,
          })
        } catch (error) {
          setBtnLoading(false)
          return
        }
        setBtnLoading(false)
        console.log(data, dataSource)
        break
      case 1:
        const two = creditTwoRef.current.getStepData()
        await two.form.validateFields()
        const twoData = two.form.getFieldsValue()
        setBtnLoading(true)
        try {
          await addCreditTwo({
            ...twoData,
            businessTypeList: businessType,
          })
        } catch (error) {
          setBtnLoading(false)
          return
        }
        setBtnLoading(false)
      default:
        break
    }
    // setBusinessType(['1', '2'])
    setCurrent(current + 1)
  }

  const prev = () => {
    setCurrent(current - 1)
  }

  // 提交
  const submit = async () => {
    const { form, realform, marform, mainform, finaneform } = creditThreeRef.current.getStepData()
    await form.validateFields()
    await realform.validateFields()
    await marform.validateFields()
    await mainform.validateFields()
    await finaneform.validateFields()
    setSubLoading(true)
    const item1 = form.getFieldsValue()
    item1.frontFileName = item1.idFront[0].fileName
    item1.frontFileUrl = item1.idFront[0].fileUrl
    item1.pictureDomain = item1.idFront[0].pictureDomain
    if (!isEmpty(item1.idReverse)) {
      item1.backFileName = item1.idReverse[0].fileName
      item1.backFileUrl = item1.idReverse[0].fileUrl
    }
    const item2 = realform.getFieldsValue()
    item2.frontFileName = item2.idFront[0].fileName
    item2.frontFileUrl = item2.idFront[0].fileUrl
    item2.pictureDomain = item2.idFront[0].pictureDomain
    if (!isEmpty(item2.idReverse)) {
      item2.backFileName = item2.idReverse[0].fileName
      item2.backFileUrl = item2.idReverse[0].fileUrl
    }
    const item3 = marform.getFieldsValue()
    if (!isEmpty(item3.idReverse)) {
      item3.backFileName = item3.idReverse[0].fileName
      item3.backFileUrl = item3.idReverse[0].fileUrl
    }
    item3.frontFileName = item3.idFront[0].fileName
    item3.frontFileUrl = item3.idFront[0].fileUrl
    item3.pictureDomain = item3.idFront[0].pictureDomain

    const item4 = mainform.getFieldsValue()
    const item5 = finaneform.getFieldsValue()

    await addCreditThree([item1, item2, item3, item4, item5])
    setSubLoading(false)
  }

  return (
    <div className={styles.box}>
      <div className={styles.title}>企业授信申请</div>
      {status === 0 && (
        <>
          <div className={styles.step}>
            <Steps current={current} style={{ width: '97%' }}>
              {steps.map((item) => (
                <Step key={item.title} title={item.title} description={item.description} />
              ))}
            </Steps>
          </div>
          <div className={styles.content}>
            <div>{steps[current].content}</div>
          </div>
          <div className="applyBtn">
            {current > 0 && (
              <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                上一步
              </Button>
            )}
            {current < steps.length - 1 && (
              <Button type="primary" loading={btnLoading} onClick={() => next()}>
                下一步
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button type="primary" loading={subLoading} onClick={submit}>
                提交
              </Button>
            )}
          </div>
        </>
      )}
      {status === 1 && <Processing />}
      {status === 2 && <Reject />}
      {status === 3 && <Success />}
    </div>
  )
}

export default ApplyForm
