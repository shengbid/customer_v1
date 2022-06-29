import { request } from 'umi'
import { extend } from 'umi-request'
import type { roleParamProps, roleListProps } from '@/services/types'
import { paramsToPageParams } from '@/utils/base'

const extendRequest = extend({
  headers: {
    'Content-Type': 'multipart/form-data',
  },
})

const url = '/activiti/processDefinition'

/** 获取流程列表 */
export async function getProcessList(params: roleParamProps) {
  return request<{ rows: roleListProps[]; total: number }>(`${url}/list`, {
    params: paramsToPageParams(params),
  })
}

/** 新建流程 */
export async function addProcess(data: any) {
  return extendRequest(`${url}/addDeployment`, {
    method: 'post',
    dataType: 'json',
    data,
  })
}
