// 企业经营信息
export interface companyBusProps {
  id: string
  enterpriseName: string
  businessTypeList: string
  sellProduct: string
  enterpriseDebt: string
  applyQuota: string
  updateTime: string
  businessDetailsList: companyBusinessProps[]
}

// 企业经营年度营业额情况
export interface companyBusinessProps {
  year?: string | number
  businessVolume?: string
  businessVolume2?: string
}
