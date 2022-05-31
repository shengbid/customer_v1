import { request } from 'umi'
import type { menuParamProps, menuListProps } from '@/services/types'
const url = '/system/menu'

/** 获取菜单列表 */
export async function getMenuList(params: menuParamProps) {
  return request<{ data: any[] }>('/getRouters', {
    params,
  })
}

/** 获取菜单树形列表 */
export async function getMenuTreeList(params: menuParamProps) {
  return request<{ data: any[] }>(`${url}/tree/list`, {
    params,
  })
}
/** 获取菜单树形下拉列表 */
export async function getMenuTreeData() {
  return request<{ data: any[] }>(`${url}/treeselect`)
}

/** 新增编辑菜单 */
export async function addMenu(data: menuListProps) {
  return request<{ data: any[] }>(`${url}`, {
    method: data.menuId ? 'put' : 'post',
    data,
  })
}
/** 删除菜单 */
export async function deleteMenu(id: number) {
  return request(`${url}/${id}`, {
    method: 'delete',
  })
}

/** 获取菜单详情 */
export async function menuDetail(id: number) {
  return request<{ data: menuListProps }>(`${url}/${id}`)
}

/** 获取角色菜单id */
export async function getRoleMenu(id: number) {
  return request<{ data: { checkedKeys: number[] } }>(`${url}/roleMenuTreeselect/${id}`)
}
