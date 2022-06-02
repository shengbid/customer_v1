import { request } from 'umi'
import type { paramsParamProps, paramsProps } from '@/services/types'
import { paramsToPageParams } from '@/utils/base'

const url = '/system/config'

/** 获取参数列表 */
export async function getParamList(params: paramsParamProps) {
  return request<{ rows: paramsProps[]; total: number }>(`${url}/list`, {
    params: paramsToPageParams(params),
  })
}

/** 新增编辑参数 */
export async function addParam(data: paramsProps) {
  return request<{ data: any[] }>(`${url}`, {
    method: data.configId ? 'put' : 'post',
    data,
  })
}
/** 删除参数 */
export async function deleteParam(id: number | string) {
  return request(`${url}/${id}`, {
    method: 'delete',
  })
}

/** 获取参数详情 */
export async function paramDetail(id: number) {
  return request<{ data: paramsProps }>(`${url}/${id}`)
}
