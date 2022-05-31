import { request } from 'umi'
import type { postParamProps, postListProps } from '@/services/types'
import { paramsToPageParams } from '@/utils/base'

const url = '/system/post'

/** 获取岗位列表 */
export async function getPostList(params: postParamProps) {
  return request<{ rows: postListProps[]; total: number }>(`${url}/list`, {
    params: paramsToPageParams(params),
  })
}

/** 新增编辑岗位 */
export async function addPost(data: postListProps) {
  return request<{ data: any[] }>(`${url}`, {
    method: data.postId ? 'put' : 'post',
    data,
  })
}
/** 删除岗位 */
export async function deletePost(id: number | string) {
  return request(`${url}/${id}`, {
    method: 'delete',
  })
}

/** 获取岗位详情 */
export async function postDetail(id: number) {
  return request<{ data: postListProps }>(`${url}/${id}`)
}
