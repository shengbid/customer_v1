export interface pageLimitProps {
  pageNum: number
  pageSize: number
}

export interface addModalProps {
  modalVisible: boolean
  handleSubmit: (data: any) => void
  handleCancel: () => void
  info?: any
}
