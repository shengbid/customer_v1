import type { Settings as LayoutSettings } from '@ant-design/pro-layout'
import { SettingDrawer } from '@ant-design/pro-layout'
import { PageLoading } from '@ant-design/pro-layout'
import { /* message, */ notification } from 'antd'
import type { RunTimeLayoutConfig, RequestConfig } from 'umi'
import type { userProps } from '@/services/types'
import { history, Link } from 'umi'
import { stringify } from 'querystring'
import RightContent from '@/components/RightContent'
import Footer from '@/components/Footer'
import { ResponseError, OnionMiddleware } from 'umi-request'
import { queryCurrentUser } from './services'
import { LinkOutlined } from '@ant-design/icons'
import { getPageQuery } from '@/utils/base'
import Cookies from 'js-cookie'
import defaultSettings from '../config/defaultSettings'

const isDev = process.env.NODE_ENV === 'development'
const loginPath = '/user/login'

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
}

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>
  currentUser?: userProps
  loading?: boolean
  fetchUserInfo?: () => Promise<userProps | undefined>
}> {
  const fetchUserInfo = async () => {
    try {
      // const msg = await queryCurrentUser()
      const msg = { user: {} }
      return msg.user
    } catch (error) {
      history.push(loginPath)
    }
    return undefined
  }
  // 如果不是登录页面，执行
  if (history.location.pathname !== loginPath) {
    const user = await fetchUserInfo()
    return {
      fetchUserInfo,
      currentUser: user,
      settings: defaultSettings,
    }
  }
  return {
    fetchUserInfo,
    settings: defaultSettings,
  }
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  console.log(initialState?.currentUser?.nickName)
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      // content: initialState?.currentUser?.nickName,
      zIndex: 9,
      content: 'nickName',
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history
      // 如果没有登录，重定向到 login
      // if (!initialState?.currentUser && location.pathname !== loginPath) {
      //   history.push(loginPath)
      // }
    },
    links: isDev
      ? [
          <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
            <LinkOutlined />
            <span>OpenAPI 文档</span>
          </Link>,
        ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children, props) => {
      // if (initialState?.loading) return <PageLoading />
      return (
        <>
          {children}
          {!props.location?.pathname?.includes('/login') && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }))
              }}
            />
          )}
        </>
      )
    },
    ...initialState?.settings,
  }
}

/**
 * 网络请求设置
 */

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  405: '请求方法不被允许。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
}

const loginOut = () => {
  const { redirect } = getPageQuery()
  if (window.location.pathname !== '/login' && !redirect) {
    history.replace({
      pathname: '/login',
      search: stringify({
        redirect: window.location.href,
      }),
    })
  }
}

/**
 * 异常处理程序
 */
const errorHandler = (
  error: ResponseError & { responseCode?: string; responseMsg?: string; url?: string },
) => {
  const { responseMsg, responseCode, url, response } = error
  // console.log(error)

  if (responseMsg && responseCode && url) {
    if (responseCode === 'B00001') {
      loginOut()
      notification.warning({
        key: 'error',
        message: `${process.env.NODE_ENV === 'development' ? url : ''}${responseMsg}`,
      })
      return
    }
    notification.error({
      key: 'error',
      message: `${process.env.NODE_ENV === 'development' ? url : ''}${responseMsg}`,
    })
  } else if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText
    const { status } = response
    if (status === 500) {
      loginOut()
      notification.warning({
        key: 'error',
        message: `账号已登录超时或者被登出，请重新登录！`,
      })
      return
    }
    notification.error({
      key: 'error',
      message: `请求错误 ${status}: ${process.env.NODE_ENV === 'development' ? url : ''}`,
      description: errorText,
    })
  } else {
    notification.error({
      key: 'error',
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    })
  }

  throw error
}

const middleware: OnionMiddleware = async (ctx, next) => {
  const {
    req: { url },
  } = ctx
  ctx.req.options.headers = {
    Authorization: Cookies.get('token'),
  }

  await next()
  if (ctx.res.responseCode && ctx.res.responseCode !== '000000') {
    // if (!(ctx.res && ctx.res.size))
    throw { ...ctx.res, url }
  }
}

export const request: RequestConfig = {
  prefix: URL_PREFIX,
  // method: 'POST',
  middlewares: [middleware],
  credentials: 'include',
  errorHandler,
}
