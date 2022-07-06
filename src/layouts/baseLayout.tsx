import React, { useState } from 'react'
import { BackTop, Carousel, Layout } from 'antd'
import styles from './index.less'
import Footer from '@/components/Footer'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import MyHeader from './components/Header'
// import Menu from './components/ComMenu'
import { ProLayout } from '@ant-design/pro-layout'
import { useModel, history, Link } from 'umi'

const { Header, Content } = Layout

const loginPath = '/login'
const signRoute = ['/sign', '/complete']

const BaseLayout: React.FC = (props: any) => {
  const { children } = props
  const { initialState } = useModel('@@initialState')
  const { location } = history
  const [pathname, setPathname] = useState<string>(location.pathname)
  console.log(props)
  return (
    <div className={styles.contanier}>
      <Layout>
        <Header className={styles.header}>
          <MyHeader />
        </Header>
        <Layout className={styles.sider}>
          <ProLayout
            menuHeaderRender={false}
            footerRender={false}
            headerRender={false}
            navTheme="light"
            onPageChange={() => {
              // 如果没有登录，重定向到 login
              if (
                !initialState?.currentUser &&
                location.pathname !== loginPath &&
                !signRoute.includes(location.pathname)
              ) {
                history.push(loginPath)
              }
            }}
            location={{
              pathname,
            }}
            menuDataRender={() => {
              console.log(initialState?.menus)
              return [...(initialState?.menus || [])]
            }}
            menuItemRender={(item, dom) => (
              <Link
                to={item.path}
                target={item.target}
                onClick={() => {
                  setPathname(item.path || '/welcome')
                }}
              >
                {dom}
              </Link>
            )}
            collapsedButtonRender={false}
            // 增加一个 loading 的状态
            // childrenRender={(childrens: any) => {
            //   if (initialState?.loading) return <PageLoading />
            //   return <>{childrens}</>
            // }}
          >
            <Content className={styles.rightcontent}>
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
          </ProLayout>

          {/* <Sider theme="light" className={styles.leftmenu}>
            <Menu pathname={location.pathname} />
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
          </Content> */}
        </Layout>
        <Footer />
      </Layout>
    </div>
  )
}

export default BaseLayout
