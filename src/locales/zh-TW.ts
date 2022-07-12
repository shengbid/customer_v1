import component from './zh-TW/component'
import globalHeader from './zh-TW/globalHeader'
import menu from './zh-TW/menu'
import settingDrawer from './zh-TW/settingDrawer'
import sysManage from './zh-TW/sysManage'
import credit from './zh-TW/credit'

export default {
  'navBar.lang': '語言',
  'layout.user.link.help': '幫助',
  'layout.user.link.privacy': '隱私',
  'layout.user.link.terms': '條款',
  'app.preview.down.block': '下載此頁面到本地項目',
  ...globalHeader,
  ...menu,
  ...settingDrawer,
  ...component,
  ...sysManage,
  ...credit,
}
