import React, { useState, useRef, MutableRefObject } from 'react'
import { Button, Steps } from 'antd'
import StepOne from './components/stepOne'
import StepTwo from './components/stepTwo'
import StepThree from './components/stepThree'
import styles from './index.less'
import { addCredit } from '@/services'
import { useModel } from 'umi'
import Processing from './results/processing'
import Reject from './results/reject'
import Success from './results/success'

const { Step } = Steps

const ApplyForm: React.FC = () => {
  const [current, setCurrent] = useState(2)
  const [businessType, setBusinessType] = useState(['1'])
  const creditOneRef: MutableRefObject<any> = useRef({})
  const creditTwoRef: MutableRefObject<any> = useRef({})
  const creditThreeRef: MutableRefObject<any> = useRef({})
  const { initialState } = useModel('@@initialState')
  const { currentUser } = initialState || {}
  const [status] = useState<number>(0)

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
    // switch (current) {
    //   case 0:
    //     const { form, tableForm, dataSource } = creditOneRef.current.getOneStepData()
    //     await form.validateFields()
    //     await tableForm.validateFields()
    //     const data = form.getFieldsValue()
    //     setBusinessType(data.business)
    //     console.log(data, dataSource)
    //     break
    //   case 1:
    //     break

    //   default:
    //     break
    // }
    setBusinessType(['1', '2'])
    setCurrent(current + 1)
  }

  const prev = () => {
    setCurrent(current - 1)
  }

  // 提交
  const submit = async () => {
    await addCredit({ enterpriseCreditname: currentUser?.userName })
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
              <Button type="primary" onClick={() => next()}>
                下一步
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button type="primary" onClick={submit}>
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
