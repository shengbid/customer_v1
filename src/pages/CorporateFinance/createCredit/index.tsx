import React from 'react'
import { Row, Col, Button } from 'antd'
import styles from './index.less'
import { useIntl, history } from 'umi'

const CreateCredit: React.FC = () => {
  const intl = useIntl()

  const apply = () => {
    history.replace('/finance/create/form')
  }

  return (
    <div className={styles.box}>
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
    </div>
  )
}

export default CreateCredit
