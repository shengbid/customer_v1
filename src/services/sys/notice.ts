import { request } from 'umi'
import type { noticeParamProps, noticeProps } from '@/services/types'
import { paramsToPageParams } from '@/utils/base'

const url = '/system/notice'

/** 获取通知公告列表 */
export async function getNoticeList(params: noticeParamProps) {
  return request<{ rows: noticeProps[]; total: number }>(`${url}/list`, {
    params: paramsToPageParams(params),
  })
}

/** 新增编辑通知公告 */
export async function addNotice(data: noticeProps) {
  return request<{ data: any[] }>(`${url}`, {
    method: data.noticeId ? 'put' : 'post',
    data,
  })
}
/** 删除通知公告 */
export async function deleteNotice(id: number | string) {
  return request(`${url}/${id}`, {
    method: 'delete',
  })
}

/** 获取通知公告详情 */
export async function noticeDetail(id: number) {
  return request<{ data: noticeProps }>(`${url}/${id}`)
}
