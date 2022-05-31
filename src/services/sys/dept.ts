import { request } from 'umi'
import type { deptParamProps, deptListProps } from '@/services/types'

const url = '/system/dept'

/** 获取部门列表 */
export async function getDeptList(params: deptParamProps) {
  return request<{ data: deptListProps[] }>(`${url}/tree/list`, {
    params,
  })
}

/** 获取部门列表下拉 */
export async function getDeptTreeList() {
  return request<{ data: any[] }>(`${url}/treeselect`)
}

/** 新增编辑部门 */
export async function addDept(data: deptListProps) {
  return request<{ data: any[] }>(`${url}`, {
    method: data.deptId ? 'put' : 'post',
    data,
  })
}
/** 删除部门 */
export async function deleteDept(id: number) {
  return request(`${url}/${id}`, {
    method: 'delete',
  })
}

/** 获取部门详情 */
export async function deptDetail(id: number) {
  return request<{ data: deptListProps }>(`${url}/${id}`)
}
