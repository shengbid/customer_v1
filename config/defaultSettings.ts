import { Settings as LayoutSettings } from '@ant-design/pro-layout'

const Settings: LayoutSettings & {
  pwa?: boolean
  logo?: string
} = {
  navTheme: 'light',
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: true,
  fixSiderbar: true,
  colorWeak: false,
  splitMenus: true,
  title: '供应链系统',
  pwa: false,
  iconfontUrl: '',
}

export default Settings
