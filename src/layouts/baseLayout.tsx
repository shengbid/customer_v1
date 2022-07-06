import React from 'react'
import { BackTop, Carousel, Layout } from 'antd'
import styles from './index.less'
import Footer from '@/components/Footer'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import MyHeader from './components/Header'
import Menu from './components/ComMenu'

const { Header, Sider, Content } = Layout

const BaseLayout: React.FC = ({ children }) => {
  return (
    <div className={styles.contanier}>
      <Layout>
        <Header className={styles.header}>
          <MyHeader />
        </Header>
        <Layout className={styles.sider}>
          <Sider theme="light" className={styles.leftmenu}>
            <Menu />
          </Sider>
          <Content>
            <BackTop />
            <div className={styles.ad}>
              <Carousel
                autoplay
                arrows={true}
                prevArrow={<LeftOutlined />}
                nextArrow={<RightOutlined />}
              >
                <div>
                  <h3 className={styles.contentStyle}>1</h3>
                </div>
                <div>
                  <h3 className={styles.contentStyle}>2</h3>
                </div>
              </Carousel>
            </div>
            <div className={styles.content}>{children}</div>
          </Content>
        </Layout>
        <Footer />
      </Layout>
    </div>
  )
}

export default BaseLayout
