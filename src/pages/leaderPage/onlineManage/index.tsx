import React from 'react'
import { Row, Col } from 'antd'
import Middle1 from './components/middle1'
import Middle2 from './components/middle2'
import Middle3 from './components/middle3'
import Right1 from './components/right1'
import style from './index.less'
import LeftStatic from './components/leftStatic'
import Right2 from './components/right2'

const onlineManage: React.FC = () => {
  return (
    <Row gutter={16} className={style.contanier}>
      <Col className={style.leftstatic} span={4}>
        <LeftStatic />
      </Col>
      <Col className={style.middlestatic} span={14}>
        <Row gutter={16}>
          <Col span={15}>
            <Middle1 />
          </Col>
          <Col span={9}>
            <Middle2 />
          </Col>
        </Row>
        <Row gutter={16} style={{ margin: '16px 0' }}>
          <Col span={9}>
            <Middle3 />
          </Col>
          <Col span={15}>
            <Middle1 />
          </Col>
        </Row>
      </Col>
      <Col className={style.rightstatic} span={6}>
        <div>
          <Right1 />
        </div>
        <div style={{ margin: '16px 0' }}>
          <Right2 />
        </div>
      </Col>
    </Row>
  )
}

export default onlineManage
