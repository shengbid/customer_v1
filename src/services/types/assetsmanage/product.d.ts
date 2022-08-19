import type { pageLimitProps } from './base'

// 商品管理列表
export interface productListParamProps extends pageLimitProps {
  goodName?: string
  goodBrand?: string
  barCode?: any
}

// 商品管理列表
export interface productListProps {
  id: number
  existFlag: boolean
  goodName?: string
  goodBrand: string
  barCode?: string
  purchasePrice: string
  fairPrice: string
  warrantyMonth: string
}
