export interface pageLimitProps {
  pageNum: number
  pageSize: number
}

export interface addModalProps {
  modalVisible: boolean
  handleSubmit: () => void
  handleCancel: () => void
  info?: any
}

// select option
export interface selectOptionProps {
  label: string
  value: string | number
}
