import { Space } from 'antd'
import React from 'react'
import { /*useModel,*/ SelectLang } from 'umi'
import Avatar from './AvatarDropdown'
import styles from './index.less'
import defaultSettings from '../../../config/defaultSettings'

export type SiderTheme = 'light' | 'dark'

const GlobalHeaderRight: React.FC = () => {
  // const { initialState } = useModel('@@initialState')

  // if (!initialState || !initialState.settings) {
  //   return null
  // }

  const { navTheme } = defaultSettings
  let className = styles.right

  if (navTheme === 'dark') {
    className = `${styles.right}  ${styles.dark}`
  }
  return (
    <Space className={className}>
      <Avatar />
      <SelectLang className={styles.action} />
    </Space>
  )
}
export default GlobalHeaderRight
