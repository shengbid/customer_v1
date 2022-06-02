import { request } from 'umi'
import { paramsToPageParams } from '@/utils/base'

const Url = '/system'

/** 获取数据字典 */
export async function getDictSelectList(key: string) {
  return request<{ data: any[] }>(`${Url}/dict/data/type/${key}`)
}

/** 获取登录权限菜单 */
export async function getAuthorRoutes() {
  return request<{ data: any[] }>(`${Url}/menu/getRouters`)
}

/** 下载模板 */
export async function downloadFile(url: string) {
  const modelUrl = url.indexOf('/') > -1 ? url : `${Url}/${url}`
  return request(`${modelUrl}/importTemplate`, {
    responseType: 'blob',
    method: 'post',
  })
}

/** 导出模板 */
export async function exportFile(url: string, data: any) {
  const modelUrl = url.indexOf('/') > -1 ? url : `${Url}/${url}`
  return request(`${modelUrl}/export`, {
    responseType: 'blob',
    data: paramsToPageParams(data),
    method: 'post',
  })
}
