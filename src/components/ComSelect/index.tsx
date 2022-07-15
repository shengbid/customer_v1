import React, { useState, useEffect } from 'react'
import { Select, Radio, Checkbox } from 'antd'
import type { dictListProps } from '@/services/types'
import { getDictSelectList } from '@/services'
import { useIntl } from 'umi'
import type { SizeType } from 'antd/lib/config-provider/SizeContext'
import { handleOptionData } from '@/utils/base'

const { Option } = Select

export interface iconSelectProps {
  placeholder?: string
  type?: string // 类型 deflaut下拉 radio  checkbox
  authorword: string
  value?: any
  onChange?: (value: any) => void
  getDictData?: (value: any) => void
  labelInValue?: boolean
  allowClear?: boolean
  size?: SizeType
}
// 数据字典
const DictSelect: React.FC<iconSelectProps> = (props) => {
  const [dictList, setDictList] = useState<dictListProps[]>([])
  const intl = useIntl()
  const {
    value,
    onChange,
    placeholder = `${intl.formatMessage({
      id: 'pages.form.input',
    })}`,
    authorword,
    type,
    getDictData,
    size,
    labelInValue = false,
    allowClear = true,
  } = props

  const getList = async () => {
    const { data } = await getDictSelectList(authorword)
    if (data) setDictList(data)
    if (getDictData) {
      const obj = {}
      data.forEach((item) => {
        obj[item.dictValue] = item.dictLabel
      })
      getDictData(obj)
    }
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
  if (type === 'checkbox') {
    return (
      <Checkbox.Group
        onChange={onChange}
        value={value}
        options={handleOptionData({ data: dictList, value: 'dictValue', label: 'dictLabel' })}
      />
    )
  }

  // 表格默认传入请输入
  let place = placeholder
  if (
    placeholder ===
    `${intl.formatMessage({
      id: 'pages.form.input',
    })}`
  ) {
    place = `${intl.formatMessage({
      id: 'pages.form.select',
    })}`
  }
  return (
    <Select
      placeholder={place}
      // showSearch
      allowClear={allowClear}
      labelInValue={labelInValue}
      value={value}
      size={size}
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
