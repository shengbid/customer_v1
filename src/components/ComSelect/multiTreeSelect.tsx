import React, { useState, useEffect } from 'react'
import { TreeSelect } from 'antd'
import { getMenuTreeData, getDeptTreeList } from '@/services'
import { handleTreeData } from '@/utils/base'
import { useIntl } from 'umi'
import { find, uniq } from 'lodash'
export interface treeSelectProps {
  placeholder?: string
  value?: any
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
// 多选下拉组件
const MultiTreeDataSelect: React.FC<treeSelectProps> = (props) => {
  const [treeData, setTreeData] = useState<treeProps[]>([])
  const intl = useIntl()
  const {
    value,
    onChange = () => {},
    type = '0',
    treeCheckStrictly = true,
    placeholder = `${intl.formatMessage({
      id: 'pages.form.select',
    })}`,
  } = props
  const [values, setValues] = useState<string[]>(value || [])

  const getList = async () => {
    let data: any = {}
    switch (type) {
      case '0': //菜单
        data = await getMenuTreeData()
        break
      case '1': // 部门
        data = await getDeptTreeList()
        break

      default:
        break
    }
    setTreeData(handleTreeData(data.data, 'id', 'label'))
  }
  // 点击/取消 节点有子节点,将子节点也选中/取消选中,
  const handleTree = (data: any, selectType: number) => {
    let newValue: any
    const ids: any[] = []
    const render = (arr: any) => {
      arr.forEach((item: any) => {
        if (item.children) {
          render(item.children)
        }
        ids.push(item.value)
      })
    }
    render(data)
    if (selectType === 1) {
      newValue = uniq(values?.concat(ids)) // 去重,连接
    } else {
      newValue = values?.filter((item) => !ids.includes(item))
    }
    // console.log(33, data, newValue)
    setValues(newValue)
    onChange(newValue)
  }
  const changeTreeNode = (option: any, label: any, extra: any) => {
    let ids: any[] = []
    let currentItem: any = {}
    let selectType = 1 // 1选中 2取消选中
    if (option.length > extra.preValue.length) {
      // 选中
      currentItem = option.pop()
    } else {
      // 取消选中
      selectType = 2
      ids = option.map((item: any) => item.value)
      currentItem = find(extra.preValue, (item: any) => !ids.includes(item.value))
    }

    let selectTree: any[] = []
    const render = (data: any) => {
      data.forEach((item: any) => {
        if (item.value === currentItem.value) {
          if (item.children) {
            selectTree = item.children
          }
        } else if (item.children) {
          render(item.children)
        }
      })
    }
    render(treeData)
    handleTree([...selectTree, currentItem], selectType)
    // setValues(option.map((item: any) => item.value))
    // onChange(option)
  }

  useEffect(() => {
    if (value) {
      setValues(value)
    }
  }, [value])

  useEffect(() => {
    getList()
  }, [])

  return (
    <TreeSelect
      showSearch
      style={{ width: '100%' }}
      value={values}
      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
      placeholder={placeholder}
      allowClear
      treeCheckable
      showCheckedStrategy="SHOW_ALL"
      treeCheckStrictly={treeCheckStrictly}
      // treeDefaultExpandAll
      maxTagCount={7}
      onChange={changeTreeNode}
      treeData={treeData}
    />
  )
}

export default MultiTreeDataSelect
