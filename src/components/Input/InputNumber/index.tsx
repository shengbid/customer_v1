import React from 'react'
import { InputNumber } from 'antd'
import { numToThousandReg, thousandToNumReg } from '@/utils/reg'

interface inputProps {
  value?: any
  onChange?: () => void
}

const ComInputNumber: React.FC<inputProps> = ({ value, onChange }) => {
  return (
    <InputNumber
      value={value}
      maxLength={11}
      min={0}
      formatter={(val: any) => numToThousandReg(val)}
      parser={(val: any) => thousandToNumReg(val)}
      onChange={onChange}
      style={{ width: '100%' }}
    />
  )
}

export default ComInputNumber
