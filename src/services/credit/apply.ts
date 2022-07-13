import { request } from 'umi'

/** 新增 */
export async function addCredit(data: any) {
  return request<{ data: any[] }>(`activiti/sxsp/jinjian`, {
    method: 'post',
    data,
  })
}
