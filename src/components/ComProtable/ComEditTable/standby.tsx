/* eslint-disable @typescript-eslint/no-unused-vars */
import { EditableProTable } from '@ant-design/pro-table'
import { message } from 'antd'
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'
import type { EditableFormInstance } from '@ant-design/pro-table'
import ProForm from '@ant-design/pro-form'
import type { ProFormInstance } from '@ant-design/pro-form'
import { useRef } from 'react'

interface comEditTableProps {
  columns: any[]
  initialValues: any[]
  isRequired?: boolean // 是否需要保留一条数据,默认至少需要一条数据,不需要时传入false
  onDelChange?: (row: any) => void // 获取点击删除时的数据
  optionEditable?: any // 控制操作栏的可编辑属性
  addOff?: boolean // 是否隐藏添加
  [propName: string]: any
}

function ComEditTable<T>(props: comEditTableProps) {
  const { columns, initialValues, rowKey, onDelChange, isRequired = true, addOff = false } = props
  const editorFormRef = useRef<EditableFormInstance>()
  const formRef = useRef<ProFormInstance<any>>()

  const columns2 = [
    ...columns,
    {
      title: (
        <PlusCircleOutlined
          style={{ fontSize: '18px' }}
          hidden={addOff}
          onClick={() => {
            const obj = {}
            obj[rowKey] = Date.now()
            const tableDataSource = formRef.current?.getFieldValue('table')
            const arr = tableDataSource.concat([{ ...obj }])
            const keys = arr.map((item) => item[rowKey])
            console.log(tableDataSource)
            props.editable.onChange(keys)
            formRef.current?.setFieldsValue({
              table: arr,
            })
          }}
        />
      ),
      valueType: 'option',
      align: 'center',
      width: 70,
      fixed: 'right',
      editable: props.optionEditable,
      render: () => <>-</>,
    },
  ]

  // 点击删除
  const deleteItem = (row: any) => {
    const rows = editorFormRef.current?.getRowsData?.() || []
    const rows2 = formRef.current?.getFieldValue('table') || []
    // const rows = form.getFieldsValue()
    console.log(23, rows2, rows)
    if (rows.length < 2) {
      message.warning('至少保留一条数据')
      return
    }
    const arr = rows.filter((item) => item.id !== row.id)
    formRef.current?.setFieldsValue({
      table: arr,
    })
  }

  return (
    <ProForm<{
      table: any[]
    }>
      formRef={formRef}
      submitter={{
        // 配置按钮文本
        searchConfig: {
          resetText: '重置',
          submitText: '确定',
        },
        // 配置按钮的属性
        resetButtonProps: {
          style: {
            // 隐藏重置按钮
            display: 'none',
          },
        },
        submitButtonProps: {
          style: {
            // 隐藏重置按钮
            display: 'none',
          },
        },

        // 完全自定义整个区域
        // render: (props, doms) => {
        //   console.log(props)
        //   return [
        //     <button type="button" key="rest" onClick={() => props.form?.resetFields()}>
        //       重置
        //     </button>,
        //     <button type="button" key="submit" onClick={() => props.form?.submit?.()}>
        //       提交
        //     </button>,
        //   ]
        // },
      }}
      initialValues={{
        table: initialValues,
      }}
      validateTrigger="onBlur"
    >
      <EditableProTable
        rowKey="id"
        headerTitle="可编辑表格"
        maxLength={15}
        recordCreatorProps={false}
        // recordCreatorProps={{
        //   record: () => ({ id: (Math.random() * 1000000).toFixed(0) }),
        // }}
        name="table"
        loading={false}
        columns={columns2}
        editableFormRef={editorFormRef}
        // value={tableData}
        editable={{
          ...props.editable,
          actionRender: (row) => {
            console.log(22, row)

            return [
              <MinusCircleOutlined
                key="delete"
                style={{ fontSize: '18px', color: '#DC204E' }}
                onClick={() => deleteItem(row)}
              />,
            ]
          },
        }}
      />
    </ProForm>
  )
}

export default ComEditTable
