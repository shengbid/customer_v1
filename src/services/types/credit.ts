import type { pageLimitProps } from './base'

// 授信查询参数
export interface customerListParamProps extends pageLimitProps {
  fullName?: string
  shortName?: string
}

// 企业信息
export interface customerListProps {
  id: string
  fullName?: string
  shortName?: string
  code?: string
  createTime?: string
  status: string
}

// 企业经营情况
export interface companyBusinessProps {
  year?: string | number
  businessVolume?: string
  businessVolume2?: string
}
