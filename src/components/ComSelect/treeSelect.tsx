import React, { useState, useEffect } from 'react'
import { TreeSelect } from 'antd'
import { getDeptTreeList, getMenuTreeData } from '@/services'
import { handleTreeData } from '@/utils/base'
import { useIntl } from 'umi'
export interface treeSelectProps {
  placeholder?: string
  value?: string
  type?: string // 接口类型 默认部门 1菜单
  onChange?: (value: string) => void
}

export interface treeItemProps {
  title: string
  key: number | string
}
export interface treeProps {
  title: string
  key: number | string
  children: treeItemProps[]
}
const TreeDataSelect: React.FC<treeSelectProps> = (props) => {
  const [treeData, setTreeData] = useState<treeProps[]>([])
  const intl = useIntl()
  const {
    value,
    onChange,
    type = '0',
    placeholder = `${intl.formatMessage({
      id: 'pages.form.select',
    })}`,
  } = props
  const getList = async () => {
    let data: any = {}
    switch (type) {
      case '0':
        data = await getDeptTreeList()
        break
      case '1':
        const arr = await getMenuTreeData()
        data.data = [
          {
            id: 0,
            label: '主类目',
            children: arr.data,
          },
        ]
        break

      default:
        break
    }
    setTreeData(handleTreeData(data.data, 'id', 'label'))
  }

  useEffect(() => {
    getList()
  }, [])

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
