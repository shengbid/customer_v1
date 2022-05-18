import React, { useState } from 'react'
import ComEditTable from '@/components/ComProtable/ComEditTable'
// import ComEditTable2 from '@/components/ComProtable/ComEditTable/standby'
import { Button, Form } from 'antd'
import style from './index.less'

const Add: React.FC = () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([1])
  const [tableData, setTableData] = useState<any[]>([{ id: 1 }])
  const [form] = Form.useForm()

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      formItemProps: () => {
        return {
          rules: [{ required: true, message: '此项为必填项' }],
        }
      },
    },
    {
      title: '昵称',
      dataIndex: 'mname',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      valueType: 'digit',
    },
    {
      title: '生日',
      dataIndex: 'birthday',
      valueType: 'date',
    },
  ]

  // 提交
  const submit = () => {
    console.log(tableData)
    form.validateFields()
  }

  return (
    <div>
      <h1 className={style.title}>文本标题1</h1>
      {/* <Input /> */}
      <ComEditTable
        rowKey="id"
        columns={columns}
        value={tableData}
        editable={{
          form: form,
          type: 'multiple',
          editableKeys,
          onValuesChange: (record: any, recordList: any) => setTableData(recordList),
          onChange: (keys: number[], data: any[]) => {
            console.log(keys, data)
            setEditableRowKeys(keys)
            setTableData(data)
          },
        }}
      />
      <Button type="primary" onClick={submit}>
        Primary Button
      </Button>
      {/* <ComEditTable2
        rowKey="id"
        columns={columns}
        initialValues={tableData}
        editable={{
          type: 'multiple',
          editableKeys,
          onChange: (keys: number[], data: any[]) => {
            console.log(keys, data)
            setEditableRowKeys(keys)
          },
        }}
      /> */}
    </div>
  )
}

export default Add
