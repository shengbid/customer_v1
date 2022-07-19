import React, { useState, useRef, MutableRefObject } from 'react'
import { Button, Steps, message } from 'antd'
import StepOne from './components/stepOne'
import StepTwo from './components/stepTwo'
import StepThree from './components/stepThree'
import styles from './index.less'
import { addCreditOne, addCreditTwo, addCreditThree } from '@/services'
import Processing from './results/processing'
import Reject from './results/reject'
import Success from './results/success'
import { isEmpty } from 'lodash'
import { useIntl } from 'umi'

const { Step } = Steps

const ApplyForm: React.FC = () => {
  const [current, setCurrent] = useState(1)
  const [businessType, setBusinessType] = useState(['B2B', 'B2C'])
  const creditOneRef: MutableRefObject<any> = useRef({})
  const creditTwoRef: MutableRefObject<any> = useRef({})
  const creditThreeRef: MutableRefObject<any> = useRef({})
  const [status] = useState<number>(0)
  const [btnLoading, setBtnLoading] = useState<boolean>(false)
  const [subLoading, setSubLoading] = useState<boolean>(false)
  const intl = useIntl()

  const steps = [
    {
      title: intl.formatMessage({
        id: 'credit.stepOne',
      }),
      content: <StepOne ref={creditOneRef} />,
      description: intl.formatMessage({
        id: 'credit.upcompany',
      }),
    },
    {
      title: intl.formatMessage({
        id: 'credit.stepTwo',
      }),
      content: <StepTwo type={businessType} ref={creditTwoRef} />,
      description: intl.formatMessage({
        id: 'credit.upcompanyfile',
      }),
    },
    {
      title: intl.formatMessage({
        id: 'credit.stepThree',
      }),
      content: <StepThree ref={creditThreeRef} />,
      description: intl.formatMessage({
        id: 'credit.upperson',
      }),
    },
  ]

  const next = async () => {
    switch (current) {
      case 0:
        const { form, tableForm, dataSource } = creditOneRef.current.getStepData()
        await form.validateFields()
        await tableForm.validateFields()
        const data = form.getFieldsValue()
        setBusinessType(data.businessTypeList)
        setBtnLoading(true)
        try {
          await addCreditOne({
            cusEnterpriseInfo: data,
            businessDetailsList: dataSource,
          })
        } catch (error) {
          setBtnLoading(false)
          return
        }
        setBtnLoading(false)
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
    // 文件转成字符串
    item2.spouseCreditReport = JSON.stringify(item2.spouseCreditReport)
    item2.houseLicense = JSON.stringify(item2.houseLicense)
    item2.driveLicense = JSON.stringify(item2.driveLicense)

    const item3 = marform.getFieldsValue()
    if (!isEmpty(item3.idReverse)) {
      item3.backFileName = item3.idReverse[0].fileName
      item3.backFileUrl = item3.idReverse[0].fileUrl
    }
    item3.frontFileName = item3.idFront[0].fileName
    item3.frontFileUrl = item3.idFront[0].fileUrl
    item3.pictureDomain = item3.idFront[0].pictureDomain

    item3.creditReport = JSON.stringify(item2.creditReport)

    const item4 = mainform.getFieldsValue()
    const item5 = finaneform.getFieldsValue()

    try {
      await addCreditThree({ cusEnterprisePersonInfoList: [item1, item2, item3, item4, item5] })
    } catch (error) {
      setSubLoading(false)
      return
    }
    message.success(
      intl.formatMessage({
        id: 'pages.form.success',
      }),
    )
    setSubLoading(false)
  }

  return (
    <div className={styles.box}>
      <div className={styles.title}>
        {intl.formatMessage({
          id: 'credit.cusApply',
        })}
      </div>
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
                {intl.formatMessage({
                  id: 'credit.pre',
                })}
              </Button>
            )}
            {current < steps.length - 1 && (
              <Button type="primary" loading={btnLoading} onClick={() => next()}>
                {intl.formatMessage({
                  id: 'credit.next',
                })}
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button type="primary" loading={subLoading} onClick={submit}>
                {intl.formatMessage({
                  id: 'pages.btn.submit',
                })}
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
