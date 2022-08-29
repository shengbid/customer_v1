import { useState } from 'react'
import ProTable, {
  ProColumns as YueProColumns,
  ActionType as YueActionType,
  ProTableProps,
} from '@ant-design/pro-table'
import { useIntl } from 'umi'
export interface FunctionProps {
  isPagination?: boolean // 当不要分页时，需要自己传递分页参数
}

export default function ProjectProTable<T>(props: ProTableProps<T, any> & FunctionProps) {
  const { isPagination = true } = props
  const [current, setCurrent] = useState<number>(1) // 当前页
  const intl = useIntl()
  // 统一处理分页序号
  const columns: any = []
  if (props.columns) {
    props.columns.forEach((item) => {
      let newItem = {}
      if (
        item.title === intl.formatMessage({ id: 'pages.table.index' }) ||
        item.valueType === 'index'
      ) {
        newItem = {
          ...item,
          render: (_: any, row: any, index: number) => {
            return <span>{(current - 1) * 5 + index + 1}</span>
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
      className="pro-search-container"
      form={{
        labelAlign: 'left',
      }}
      pagination={
        isPagination
          ? {
              defaultPageSize: 5,
              hideOnSinglePage: true,
              showSizeChanger: false,
              onChange: (page: number) => {
                setCurrent(page)
              },
            }
          : false
      }
      toolBarRender={false}
      {...props}
      columns={columns}
      locale={{ emptyText: intl.formatMessage({ id: 'component.noticeIcon.empty' }) }}
      options={false}
      search={
        props.search
          ? {
              ...props.search,
              labelWidth: 'auto',
            }
          : false
      }
    />
  )
}

export declare type ProColumns<T> = YueProColumns<T>
export declare type ActionType = YueActionType
