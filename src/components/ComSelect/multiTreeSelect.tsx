import React, { useState, useEffect } from 'react'
import { TreeSelect } from 'antd'
import { getMenuTreeData } from '@/services'
import { handleTreeData } from '@/utils/base'
import { useIntl } from 'umi'
export interface treeSelectProps {
  placeholder?: string
  value?: string
  treeCheckStrictly?: boolean
  type?: string // 接口类型 默认菜单
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
const MultiTreeDataSelect: React.FC<treeSelectProps> = (props) => {
  const [treeData, setTreeData] = useState<treeProps[]>([])
  const intl = useIntl()
  const {
    value,
    onChange,
    type = '0',
    treeCheckStrictly = true,
    placeholder = `${intl.formatMessage({
      id: 'pages.form.select',
    })}`,
  } = props

  const getList = async () => {
    let data: any = {}
    switch (type) {
      case '0':
        data = await getMenuTreeData()
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
      treeCheckable
      showCheckedStrategy="SHOW_ALL"
      treeCheckStrictly={treeCheckStrictly}
      // treeDefaultExpandAll
      maxTagCount={7}
      onChange={onChange}
      treeData={treeData}
    />
  )
}

export default MultiTreeDataSelect
