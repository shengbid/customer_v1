import type { pageLimitProps } from './base'

export interface menuProps extends pageLimitProps {
  menuName?: string
}

export interface userProps extends pageLimitProps {
  name?: string
  dept?: string
  phone?: string
  status?: string
  createTimes?: string
}
