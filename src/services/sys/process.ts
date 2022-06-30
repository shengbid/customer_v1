import { request } from 'umi'
// import { extend } from 'umi-request'
import type { roleParamProps, roleListProps } from '@/services/types'
import { paramsToPageParams } from '@/utils/base'

// const extendRequest = extend({
//   headers: {
//     'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
//     // 'Content-Type': 'multipart/form-data',
//   },
// })
const url = '/activiti/processDefinition'

/** 获取流程列表 */
export async function getProcessList(params: roleParamProps) {
  return request<{ rows: roleListProps[]; total: number }>(`${url}/list`, {
    params: paramsToPageParams(params),
  })
}

/** 新建流程 */
export async function addProcess(data: any) {
  return request(`${url}/addDeployment`, {
    method: 'post',
    data,
  })
}

/** 部署流程文件 */
export async function addProcessFile(data: any) {
  return request(`${url}/addDeployment`, {
    method: 'post',
    data,
  })
}
