import type { pageLimitProps } from './base'

// 流程查询参数
export interface processListParamProps extends pageLimitProps {
  name?: string
  key?: string
}

// 流程详情查询
export interface getdetailProps {
  deploymentId: string
  resourceName: string
}

// 流程列表
export interface processListProps {
  id: string
  deploymentId: string
  resourceName: string
  name?: string
  key?: string
  version?: string
  deploymentTime?: string
  suspendState?: string
}
