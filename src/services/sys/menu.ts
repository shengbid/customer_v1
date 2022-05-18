import { request } from 'umi'
import type { menuProps } from '@/services/types'

/** 获取菜单列表 */
export async function getMenuList(params: menuProps) {
  return request<{ data: any[] }>('/getRouters', {
    params,
  })
}
