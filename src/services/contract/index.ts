import { request } from 'umi'
import type { contractListProps, contractListParamsProps } from '@/services/types'
import { paramsToPageParams } from '@/utils/base'

const url = '/cus/agreement'

/** 获取合同协议列表 */
export async function getContractList(params: contractListParamsProps) {
  return request<{ rows: contractListProps[]; total: number }>(`${url}/adminList`, {
    data: paramsToPageParams(params),
    method: 'post',
  })
}
