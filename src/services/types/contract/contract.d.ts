// 授信合同协议列表
export interface creditContractListProps {
  id: number
  enterpriseId?: string
  contractNo: string
  contractName: string
  contractType: string
  fileName: string
  fileUrl: string
}
// 合同协议筛选列表
export interface contractListParamsProps {
  enterpriseCreditName: string
  contractNo: string
  contractName: string
  signStatus: number
  signWay: string
  signTimeStart: string
  signTimeEnd: string
}
// 合同协议列表
export interface contractListProps {
  id: number
  enterpriseId?: string
  enterpriseCreditName: string
  contractNo: string
  contractName: string
  contractType: string
  signStatus: number
  signWay: string
  signTime: string
  recipientsList: any[]
}
