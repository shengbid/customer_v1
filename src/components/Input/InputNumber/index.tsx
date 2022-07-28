import React, { useEffect, useState } from 'react'
import { InputNumber } from 'antd'
import { numToThousandReg, thousandToNumReg } from '@/utils/reg'

interface inputProps {
  value?: any
  onChange?: (vals: any) => void
  unit?: number // 单位 1万元 2亿元 无元
}

const ComInputNumber: React.FC<inputProps> = ({ value, onChange = () => {}, unit }) => {
  const [val, setVal] = useState<number | string>(value)
  useEffect(() => {
    if (value && unit) {
      let newVal = value / 10000
      if (unit === 1) {
      } else if (unit === 2) {
        newVal = value / 100000000
      }
      setVal(newVal)
      onChange(newVal)
    }
  }, [unit])

  return (
    <InputNumber
      value={val}
      maxLength={7}
      min={0}
      formatter={(vals: any) => numToThousandReg(vals)}
      parser={(vals: any) => thousandToNumReg(vals)}
      onChange={(vals) => {
        console.log(vals)
        setVal(vals)
        onChange(vals)
      }}
      style={{ width: '100%' }}
    />
  )
}

export default ComInputNumber
