import React from 'react'
import { InputNumber } from 'antd'
import { numIntegerToThousandReg, thousandToNumReg } from '@/utils/reg'

interface inputProps {
  max?: number
  addonAfter?: any
  value?: any
  onChange?: () => void
}

// 整数输入框
const PointInput: React.FC<inputProps> = ({ value, onChange, max = 99999.99, addonAfter }) => {
  return (
    <InputNumber
      addonAfter={addonAfter}
      onChange={onChange}
      value={value}
      max={max}
      maxLength={9}
      min={0}
      formatter={(vals: any) => numIntegerToThousandReg(vals)}
      parser={(vals: any) => thousandToNumReg(vals)}
      style={{ width: '100%' }}
    />
  )
}

export default PointInput
