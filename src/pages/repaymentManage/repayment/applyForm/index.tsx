import React, { useState, useRef, MutableRefObject } from 'react'
import { Button, Steps, message } from 'antd'
import StepOne from './components/stepOne'
import StepTwo from './components/stepTwo'
import StepThree from './components/stepThree'
import styles from './index.less'
// import { addCreditOne, addCreditTwo, addCreditThree } from '@/services'
import { isEmpty } from 'lodash'
import { useIntl, history } from 'umi'

const { Step } = Steps

const ApplyForm: React.FC = () => {
  const [current, setCurrent] = useState(0)
  const creditOneRef: MutableRefObject<any> = useRef({})
  const creditTwoRef: MutableRefObject<any> = useRef({})
  const creditThreeRef: MutableRefObject<any> = useRef({})
  const [btnLoading, setBtnLoading] = useState<boolean>(false)
  const [subLoading, setSubLoading] = useState<boolean>(false)
  const intl = useIntl()
  const twoInfo = {}

  const steps = [
    {
      title: intl.formatMessage({
        id: 'credit.stepOne',
      }),
      content: <StepOne ref={creditOneRef} />,
      description: '选择还款的融资订单',
    },
    {
      title: intl.formatMessage({
        id: 'credit.stepTwo',
      }),
      content: <StepTwo info={twoInfo} ref={creditTwoRef} />,
      description: '填写赎回货物数量',
    },
    {
      title: intl.formatMessage({
        id: 'credit.stepThree',
      }),
      content: <StepThree ref={creditThreeRef} />,
      description: '赎回货物信息',
    },
  ]

  const next = async () => {
    switch (current) {
      case 0:
        const { selectedRowKeys } = creditOneRef.current.getBusinessData()
        // console.log(4, selectedRowKeys)
        if (isEmpty(selectedRowKeys)) {
          message.warning('请先选择融资订单!')
          return
        }
        break
      case 1:
        setBtnLoading(false)
        const businessData = await creditTwoRef.current.getBusinessData()
        if (!businessData) {
          return
        }
      // await two.form.validateFields()
      // const twoData = two.form.getFieldsValue()
      // setBtnLoading(true)
      // try {
      //   await addCreditTwo({
      //     ...twoData,
      //     businessTypeList: businessType,
      //   })
      // } catch (error) {
      //   setBtnLoading(false)
      //   return
      // }
      // setBtnLoading(false)
      default:
        break
    }
    setCurrent(current + 1)
  }

  const prev = () => {
    setCurrent(current - 1)
  }

  // 提交
  const submit = async () => {
    setSubLoading(true)

    try {
      // await addCreditThree({ cusEnterprisePersonInfoList: arr, id })
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
    history.push('/finance/create')
  }

  return (
    <div className={styles.box}>
      <div className={styles.title}>申请还款</div>

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
        {current === 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => history.push('/finance/create')}>
            {intl.formatMessage({
              id: 'pages.btn.back',
            })}
          </Button>
        )}
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
    </div>
  )
}

export default ApplyForm
