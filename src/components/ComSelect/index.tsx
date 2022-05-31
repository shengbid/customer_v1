import React, { useState, useEffect } from 'react'
import { Select, Radio } from 'antd'
import type { dictListProps } from '@/services/types'
import { getDictSelectList } from '@/services'

const { Option } = Select

export interface iconSelectProps {
  placeholder?: string
  type?: string // 类型 deflaut下拉 radio  checkbox
  authorWord: string
  value?: string
  onChange?: (value: any) => void
}
// 数据字典
const DictSelect: React.FC<iconSelectProps> = ({
  value,
  onChange,
  placeholder = '请选择',
  authorWord,
  type,
}) => {
  const [dictList, setDictList] = useState<dictListProps[]>([])

  const getList = async () => {
    const { data } = await getDictSelectList(authorWord)
    if (data) setDictList(data)
  }

  useEffect(() => {
    getList()
  }, [])

  if (type === 'radio') {
    return (
      <Radio.Group onChange={onChange} value={value}>
        {dictList.map((item) => {
          return (
            <Radio value={item.dictValue} key={item.dictValue}>
              {item.dictLabel}
            </Radio>
          )
        })}
      </Radio.Group>
    )
  }

  // 表格默认传入请输入
  let place = placeholder
  if (placeholder === '请输入') {
    place = '请选择'
  }
  return (
    <Select
      placeholder={place}
      // showSearch
      allowClear
      value={value}
      onChange={onChange}
      style={{ width: '100%' }}
    >
      {dictList.map((item) => {
        return (
          <Option value={item.dictValue} key={item.dictValue}>
            {item.dictLabel}
          </Option>
        )
      })}
    </Select>
  )
}

export default DictSelect
