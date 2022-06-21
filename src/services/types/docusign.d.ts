export interface signerProps {
  signerName: string // name
  signerEmail: string
  roleName: string // 角色名称
  envelopeId?: string // 信封ID
  countryCode?: string // 国家代码 +86
  phoneNumber?: string // 电话号码
}
export interface envelopeProps {
  templateId: string // 模板ID
  signers: signerProps
}
