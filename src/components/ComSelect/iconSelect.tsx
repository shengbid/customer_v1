import React from 'react'
import { Select } from 'antd'
import Icon from '@ant-design/icons'
import * as icons from '@ant-design/icons'
import { useIntl } from 'umi'

const { Option } = Select

export interface iconSelectProps {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
}

const IconSelect: React.FC<iconSelectProps> = (props) => {
  const iconList = Object.keys(icons).filter((item) => typeof icons[item] === 'object')
  const intl = useIntl()
  const {
    value,
    onChange,
    placeholder = `${intl.formatMessage({
      id: 'pages.form.select',
    })}${intl.formatMessage({ id: 'sys.menu.icon' })}`,
  } = props

  // console.log(typeof icons['AccountBookFilled'], typeof icons['setTwoToneColor']) // object function
  const filterOption = (input: string, option: any) => {
    return option.value.toLowerCase().includes(input.toLowerCase())
  }
  return (
    <Select
      placeholder={placeholder}
      showSearch
      allowClear
      style={{ width: '100%' }}
      value={value}
      filterOption={filterOption}
      onChange={onChange}
    >
      {iconList.map((item) => {
        return (
          <Option value={item} key={item}>
            <Icon component={icons[item]} style={{ marginRight: '8px' }} />
            {item}
          </Option>
        )
      })}
    </Select>
  )
}

export default IconSelect
