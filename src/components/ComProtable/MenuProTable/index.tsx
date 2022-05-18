import { useState } from 'react'
import ProTable, {
  ProColumns as YueProColumns,
  ActionType as YueActionType,
  ProTableProps,
} from '@ant-design/pro-table'
import { Button } from 'antd'
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons'
import { handleSortParams } from '@/utils/base'
import MenuButton from './menuButton'

export interface FunctionProps {
  selectAll?: () => void // 查询触发
  request: (param?: any) => void
}

MenuProTable.Btn = MenuButton

export default function MenuProTable<T>(props: ProTableProps<T, any> & FunctionProps) {
  const [current, setCurrent] = useState<number>(1) // 当前页
  const [pageSize, setPageSize] = useState<number>(10) // 每页条数
  // 统一处理分页序号
  const columns: any = []
  if (props.columns) {
    props.columns.forEach((item) => {
      let newItem = {}
      if (item.title === '序号' || item.valueType === 'index') {
        newItem = {
          width: 60,
          ...item,
          render: (_: any, row: any, index: number) => {
            return <span>{(current - 1) * pageSize + index + 1}</span>
          },
        }
      } else {
        newItem = { ...item }
      }
      columns.push(newItem)
    })
  }
  return (
    <ProTable<T>
      className="yue-pro-table"
      pagination={props.pagination ? props.pagination : { defaultPageSize: 10 }} // 默认每页10条
      form={{
        labelAlign: 'left',
      }}
      search={{
        labelWidth: 'auto',
        optionRender: ({ searchText, resetText }, { form }) => [
          <Button
            key="search"
            type="primary"
            onClick={() => {
              ;(props.selectAll && props.selectAll()) || form?.submit()
            }}
          >
            <SearchOutlined />
            {searchText}
          </Button>,
          <Button
            key="rest"
            onClick={() => {
              ;(props.onReset && props.onReset()) || form?.resetFields()
            }}
          >
            <ReloadOutlined />
            {resetText}
          </Button>,
        ],
      }}
      sticky
      // bordered
      {...props}
      columns={columns}
      request={(param, sort, filter) => {
        setCurrent(param?.current || 1)
        setPageSize(param?.pageSize || 10)
        return props.request(handleSortParams(param, sort), sort, filter)
      }}
    />
  )
}

export declare type ProColumns<T> = YueProColumns<T>
export declare type ActionType = YueActionType
