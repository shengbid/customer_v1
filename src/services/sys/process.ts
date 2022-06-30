import { request } from 'umi'
// import { extend } from 'umi-request'
import type { processListParamProps, processListProps, getdetailProps } from '@/services/types'
import { paramsToPageParams } from '@/utils/base'

// const extendRequest = extend({
//   headers: {
//     'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
//     // 'Content-Type': 'multipart/form-data',
//   },
// })
const url = '/activiti/processDefinition'

/** 获取流程列表 */
export async function getProcessList(params: processListParamProps) {
  return request<{ rows: processListProps[]; total: number }>(`${url}/list`, {
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
  return request(`${url}/uploadStreamAndDeployment`, {
    method: 'post',
    data,
  })
}

/** 删除流程 */
export async function deleteProcess(deploymentId: string) {
  return request(`${url}/remove/${deploymentId}`, {
    method: 'delete',
  })
}
/** 修改流程 */
export async function editProcess(data: getdetailProps) {
  return request(`${url}/ModifyDefinition`, {
    method: 'put',
    data,
  })
}
/** 获取流程详情 */
export async function processDetail(params: getdetailProps) {
  return request(`${url}/getDefinitionXML`, {
    params,
  })
}
