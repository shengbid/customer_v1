import { request } from 'umi'
import type {
  timedTaskParamProps,
  timedTaskProps,
  timedTaskLogParamProps,
  timedTaskLogProps,
} from '@/services/types'
import { paramsToPageParams } from '@/utils/base'

const url = '/schedule/job'
const logUrl = '/schedule/job/log'

/** 获取定时任务列表 */
export async function getTimedTaskList(params: timedTaskParamProps) {
  return request<{ rows: timedTaskProps[]; total: number }>(`${url}/list`, {
    params: paramsToPageParams(params),
  })
}

/** 新增编辑定时任务 */
export async function addTimedTask(data: timedTaskProps) {
  return request<{ data: any[] }>(`${url}`, {
    method: data.jobId ? 'put' : 'post',
    data,
  })
}
/** 删除定时任务 */
export async function deleteTimedTask(id: number | string) {
  return request(`${url}/${id}`, {
    method: 'delete',
  })
}
/** 改变状态 */
export async function changeTaskStatus(data: { status: string; jobId: number }) {
  return request(`${url}/changeStatus`, {
    data,
    method: 'put',
  })
}
/** 执行任务 */
export async function runTaskStatus(data: { jobGroup: string; jobId: number }) {
  return request(`${url}/run`, {
    data,
    method: 'put',
  })
}
/** 获取定时任务详情 */
export async function timedTaskDetail(id: number) {
  return request<{ data: timedTaskProps }>(`${url}/${id}`)
}

/** 获取定时任务日志列表 */
export async function getTimedTaskLogList(params: timedTaskLogParamProps) {
  return request<{ rows: timedTaskLogProps[]; total: number }>(`${logUrl}/list`, {
    params: paramsToPageParams(params),
  })
}
/** 删除定时任务日志 */
export async function deleteTimedTaskLog(id: number | string) {
  return request(`${logUrl}/${id}`, {
    method: 'delete',
  })
}
