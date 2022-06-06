import { request } from 'umi'
import type { loginInfoParamProps, loginInfoProps } from '@/services/types'
import { paramsToPageParams } from '@/utils/base'

const url = '/system/logininfor'

/** 获取登录信息列表 */
export async function getLoginInfoList(params: loginInfoParamProps) {
  return request<{ rows: loginInfoProps[]; total: number }>(`${url}/list`, {
    params: paramsToPageParams(params),
  })
}

/** 删除登录信息 */
export async function deleteLoginInfo(id: number | string) {
  return request(`${url}/${id}`, {
    method: 'delete',
  })
}
