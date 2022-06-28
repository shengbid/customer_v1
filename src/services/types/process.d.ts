import type { pageLimitProps } from './base'

// 菜单查询参数
export interface processListParamProps extends pageLimitProps {
  name?: string
  key?: string
}

// 流程列表
export interface processListProps {
  id: string
  name?: string
  key?: string
  version?: string
  deploymentTime?: string
  suspendState?: string
}
