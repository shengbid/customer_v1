import { request } from 'umi'
import type { roleParamProps, roleListProps } from '@/services/types'
import { paramsToPageParams } from '@/utils/base'

const url = '/system/role'

/** 获取角色列表 */
export async function getRoleList(params: roleParamProps) {
  return request<{ rows: roleListProps[]; total: number }>(`${url}/list`, {
    params: paramsToPageParams(params),
  })
}

/** 新增编辑角色 */
export async function addRole(data: roleListProps) {
  return request(`${url}`, {
    method: data.roleId ? 'put' : 'post',
    data,
  })
}
/** 删除角色 */
export async function deleteRole(id: number | string) {
  return request(`${url}/${id}`, {
    method: 'delete',
  })
}

/** 获取角色详情 */
export async function roleDetail(id: number) {
  return request<{ data: roleListProps }>(`${url}/${id}`)
}

/** 改变角色状态 */
export async function changeRoleStatus(data: { status: string; roleId: number }) {
  return request(`${url}/changeStatus`, {
    data,
    method: 'put',
  })
}
