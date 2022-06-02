import { request } from 'umi'
import type { operateInfoParamProps, operateInfoProps } from '@/services/types'
import { paramsToPageParams } from '@/utils/base'

const url = '/monitor/operlog'

/** 获取操作日志列表 */
export async function getOperateInfoList(params: operateInfoParamProps) {
  return request<{ rows: operateInfoProps[]; total: number }>(`${url}/list`, {
    params: paramsToPageParams(params),
  })
}

/** 删除操作日志 */
export async function deleteOperateInfo(id: number | string) {
  return request(`${url}/${id}`, {
    method: 'delete',
  })
}

/** 获取操作日志详情 */
export async function operateInfoDetail(id: number) {
  return request<{ data: operateInfoProps }>(`${url}/${id}`)
}
