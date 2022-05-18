import React /** useState */ from 'react'
import { TreeSelect } from 'antd'

export interface treeSelectProps {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
}

const TreeDataSelect: React.FC<treeSelectProps> = ({ value, onChange, placeholder = '请选择' }) => {
  const treeData = [
    {
      title: 'Node1',
      value: '0-0',
      children: [
        {
          title: 'Child Node1',
          value: '0-0-1',
        },
        {
          title: 'Child Node2',
          value: '0-0-2',
        },
      ],
    },
    {
      title: 'Node2',
      value: '0-1',
    },
  ]

  return (
    <TreeSelect
      showSearch
      style={{ width: '100%' }}
      value={value}
      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
      placeholder={placeholder}
      allowClear
      // treeDefaultExpandAll
      onChange={onChange}
      treeData={treeData}
    />
  )
}

export default TreeDataSelect
