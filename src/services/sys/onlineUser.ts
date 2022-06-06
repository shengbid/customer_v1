import { request } from 'umi'
import type { onlineUserParamProps, onlineUserProps } from '@/services/types'
import { paramsToPageParams } from '@/utils/base'

const url = '/system/online'

/** 获取在线用户列表 */
export async function getOnlineList(params: onlineUserParamProps) {
  return request<{ rows: onlineUserProps[]; total: number }>(`${url}/list`, {
    params: paramsToPageParams(params),
  })
}

/** 强制退出 */
export async function outOnline(id: number | string) {
  return request(`${url}/${id}`, {
    method: 'delete',
  })
}
