import { request } from 'umi'
import { paramsToPageParams } from '@/utils/base'

const Url = '/system'

/** 获取数据字典 */
export async function getDictSelectList(key: string) {
  return request<{ data: any[] }>(`${Url}/dict/data/type/${key}`)
}

/** 获取登录权限菜单 */
export async function getAuthorRoutes() {
  return request<{ data: any[] }>(`/cus/user/getRouters`)
}

/** 下载模板 */
export async function downloadFile(url: string, data?: any) {
  return request(url, {
    responseType: 'blob',
    method: 'post',
    data,
  })
}
// 下载上传的文件
export async function downFile(url: string, params: any) {
  return request(url, {
    params,
    responseType: 'blob',
    getResponse: true,
  })
}

/** 列表导出模板 */
export async function exportFile(url: string, data: any) {
  return request(`${url}`, {
    responseType: 'blob',
    data: paramsToPageParams(data),
    method: 'post',
  })
}
