import React, { useState, useEffect } from 'react'
import { Row, Col, Button } from 'antd'
import styles from './index.less'
import { useIntl, history } from 'umi'
import Processing from './applyForm/results/processing'
import Reject from './applyForm/results/reject'
import Success from './applyForm/results/success'
import { getCreditDetail } from '@/services'

const CreateCredit: React.FC = () => {
  const intl = useIntl()
  const [createTime, setCreateTime] = useState<string>('')
  const [status, setStatus] = useState<number>()

  // 获取详情
  const getDetail = async () => {
    const { data } = await getCreditDetail()
    if (data) {
      if (data.auditStatus) {
        setStatus(Number(data.auditStatus))
        setCreateTime(data.updateTime || '')
      } else {
        setStatus(0)
      }
    } else {
      setStatus(0)
    }
  }

  useEffect(() => {
    getDetail()
  }, [])

  const apply = () => {
    history.replace('/finance/create/form')
  }

  return (
    <div className={styles.box}>
      {status === 0 && (
        <>
          <div className={styles.product}>
            <h3>
              {intl.formatMessage({
                id: 'credit.product',
              })}
              :
            </h3>
            <Row gutter={16}>
              <Col className="gutter-row" span={6}>
                <div className={styles.bg}>col-6</div>
              </Col>
              <Col className="gutter-row" span={6}>
                <div className={styles.bg}>col-6</div>
              </Col>
              <Col className="gutter-row" span={6}>
                <div className={styles.bg}>col-6</div>
              </Col>
              <Col className="gutter-row" span={6}>
                <div className={styles.bg}>col-6</div>
              </Col>
            </Row>
            <div className="applyBtn">
              <Button type="primary" onClick={apply}>
                {intl.formatMessage({
                  id: 'credit.apply',
                })}
              </Button>
            </div>
          </div>

          <div className={styles.loan}>
            <h3>
              {intl.formatMessage({
                id: 'credit.loanprocess',
              })}
              :
            </h3>
            <Row gutter={16}>
              <Col className="gutter-row" span={6}>
                <div className={styles.bg}>col-6</div>
              </Col>
              <Col className="gutter-row" span={6}>
                <div className={styles.bg}>col-6</div>
              </Col>
              <Col className="gutter-row" span={6}>
                <div className={styles.bg}>col-6</div>
              </Col>
              <Col className="gutter-row" span={6}>
                <div className={styles.bg}>col-6</div>
              </Col>
            </Row>
          </div>
        </>
      )}
      {status === 2 && <Processing time={createTime} />}
      {status === 3 && <Reject />}
      {status === 1 && <Success />}
    </div>
  )
}

export default CreateCredit
