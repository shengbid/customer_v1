/* eslint-disable @typescript-eslint/no-unused-vars */
import { EditableProTable } from '@ant-design/pro-table'
import { message } from 'antd'
// import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'
import type { EditableFormInstance } from '@ant-design/pro-table'
import { useRef } from 'react'
import { useIntl } from 'umi'

interface comEditTableProps {
  columns: any[]
  value: any[]
  isRequired?: boolean // 是否需要保留一条数据,默认至少需要一条数据,不需要时传入false
  onDelChange?: (row: any) => void // 获取点击删除时的数据
  optionEditable?: any // 控制操作栏的可编辑属性
  addOff?: boolean // 是否隐藏添加
  [propName: string]: any
}

function ComEditTable<T>(props: comEditTableProps) {
  const { columns, value, rowKey, onDelChange, isRequired = true } = props
  const editorFormRef = useRef<EditableFormInstance>()
  const intl = useIntl()

  const columns2 = [
    ...columns,
    {
      // 自定义新建按钮
      // title: (
      //   <PlusCircleOutlined
      //     style={{ fontSize: '18px' }}
      //     hidden={addOff}
      //     onClick={() => {
      //       const obj = {}
      //       obj[rowKey] = Date.now()
      //       const arr = value.concat([{ ...obj }])
      //       const keys = arr.map((item) => item[rowKey])
      //       props.editable.onChange(keys, arr)
      //     }}
      //   />
      // ),
      title: intl.formatMessage({
        id: 'pages.table.option',
      }),
      valueType: 'option',
      align: 'center',
      width: 70,
      fixed: 'right',
      editable: props.optionEditable,
      render: () => <>-</>,
    },
  ]

  return (
    <>
      <EditableProTable<T>
        {...props}
        maxLength={15}
        // 关闭默认的新建按钮
        // recordCreatorProps={false}
        recordCreatorProps={{
          newRecordType: 'dataSource',
          record: () => {
            const obj = {}
            obj[rowKey] = Date.now()
            return {
              ...obj,
            }
          },
        }}
        columns={columns2}
        editableFormRef={editorFormRef}
        locale={{
          emptyText: intl.formatMessage({
            id: 'component.noticeIcon.empty',
          }),
        }}
        editable={{
          ...props.editable,
          // deleteText: <MinusCircleOutlined style={{ fontSize: '18px', color: '#DC204E' }} />,
          onDelete: (row) => {
            return new Promise((resolve, reject) => {
              if (value.length < 2 && isRequired) {
                message.warning(
                  intl.formatMessage({
                    id: 'pages.table.oneData',
                  }),
                )
                reject()
              }
              if (onDelChange) {
                onDelChange(row) // 获取点击删除时的数据
              }
              resolve(1)
            })
          },
          actionRender: (row, config, defaultDom) => [defaultDom.delete],
        }}
      />
    </>
  )
}

export default ComEditTable
