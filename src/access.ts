/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
import { treeDataToFlat } from './utils/base'

export default function access(initialState: any) {
  const { menus } = initialState ?? {}
  const menuPathArr = treeDataToFlat(menus)?.map((item) => item.path)

  return {
    hasMenu: (route: any) => {
      return menuPathArr ? menuPathArr.includes(route.path) : false
    },
  }
}
