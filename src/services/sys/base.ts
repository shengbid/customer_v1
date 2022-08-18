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
export async function downloadFile(url: string) {
  return request(`${url}`, {
    responseType: 'blob',
    method: 'post',
  })
}
// 下载上传的文件
export async function downFile(params: { name: string; fileUrl: string }) {
  return request(`/file/download/common`, {
    params,
    responseType: 'blob',
    getResponse: true,
  })
}
// 下载模板管理上传的文件
export async function downloadTemplate(templateId: string) {
  return request(`/file/download`, {
    params: { templateId },
    responseType: 'blob',
    getResponse: true,
    // method: 'post',
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
