import React, { useCallback } from 'react'
import { LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Menu, Spin } from 'antd'
import { history, useModel } from 'umi'
import { stringify } from 'querystring'
import HeaderDropdown from '../HeaderDropdown'
import styles from './index.less'
import { outLogin } from '@/services'
import type { MenuInfo } from 'rc-menu/lib/interface'
import { useIntl } from 'umi'

export type GlobalHeaderRightProps = {
  menu?: boolean
}

/**
 * 退出登录，并且将当前的 url 保存
 */
const loginOut = async () => {
  await outLogin()
  const { query = {}, search, pathname } = history.location
  const { redirect } = query
  // Note: There may be security issues, please note
  if (window.location.pathname !== '/login' && !redirect) {
    history.replace({
      pathname: '/login',
      search: stringify({
        redirect: pathname + search,
      }),
    })
  }
}

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = () => {
  const { initialState, setInitialState } = useModel('@@initialState')
  const intl = useIntl()
  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const { key } = event
      if (key === 'logout') {
        setInitialState((s) => ({ ...s, currentUser: undefined }))
        loginOut()
        return
      }
      history.push(`/personal/center`)
    },
    [setInitialState],
  )

  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  )

  if (!initialState) {
    return loading
  }

  const { currentUser } = initialState

  // if (!currentUser || !currentUser.nickName) {
  //   return loading
  // }

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      <Menu.Item key="center">
        <UserOutlined />
        {intl.formatMessage({
          id: 'component.globalHeader.center',
        })}
      </Menu.Item>

      <Menu.Divider />

      <Menu.Item key="logout">
        <LogoutOutlined />
        {intl.formatMessage({
          id: 'component.globalHeader.loginout',
        })}
      </Menu.Item>
    </Menu>
  )
  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar size="small" className={styles.avatar}>
          {currentUser && currentUser.nickName ? currentUser.nickName.substring(0, 1) : '测'}
        </Avatar>
        <span className={`${styles.name} anticon`}>{currentUser?.nickName}</span>
      </span>
    </HeaderDropdown>
  )
}

export default AvatarDropdown
