import { useState, useEffect, useImperativeHandle, forwardRef } from 'react'
import ComCard from '@/components/ComPage/ComCard'
import { Form, Input, Tooltip } from 'antd'
import { useIntl, useModel } from 'umi'
import DictSelect from '@/components/ComSelect'
import RequiredLabel from '@/components/RequiredLabel'
import type { companyBusinessProps } from '@/services/types'
import { EditableProTable } from '@ant-design/pro-table'
import type { ProColumns } from '@ant-design/pro-table'
import moment from 'moment'
import ComInputNumber from '@/components/Input/InputNumber'
import { QuestionCircleOutlined } from '@ant-design/icons'

const { TextArea } = Input

const StepOne = (ref: any) => {
  const intl = useIntl()
  const [form] = Form.useForm()
  const [tableForm] = Form.useForm()
  const { initialState } = useModel('@@initialState')
  const { currentUser } = initialState || {}
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([2022, 2021])
  const [dataSource, setDataSource] = useState<companyBusinessProps[]>([])

  useEffect(() => {
    const year = moment().year()
    const preYear = year - 1
    setEditableRowKeys([year, preYear])
    setDataSource([{ year }, { year: preYear }])
  }, [])

  useImperativeHandle(ref, () => ({
    // getOneStepData 就是暴露给父组件的方法
    getOneStepData: () => {
      return { form, tableForm, dataSource } // 将表格form实例与表格元素导出
    },
  }))

  const columns: ProColumns<companyBusinessProps>[] = [
    {
      title: '年度',
      dataIndex: 'year',
      editable: false,
      width: '20%',
    },
    {
      title: (
        <span>
          B2B/BBC营业额（万元）
          <Tooltip title="B2B/BBC营业额（万元）">
            <QuestionCircleOutlined />
          </Tooltip>
        </span>
      ),
      dataIndex: 'businessVolume',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
      width: '40%',
      renderFormItem: () => <ComInputNumber />,
    },
    {
      title: (
        <span>
          B2C营业额（万元）
          <Tooltip title="B2C营业额（万元）">
            <QuestionCircleOutlined />
          </Tooltip>
        </span>
      ),
      dataIndex: 'businessVolume2',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
      width: '40%',
      renderFormItem: () => <ComInputNumber />,
    },
  ]
  return (
    <ComCard title="企业信息">
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        initialValues={{ phoneArea: '1' }}
        form={form}
        autoComplete="off"
      >
        <Form.Item
          name="companyName"
          label={intl.formatMessage({
            id: 'credit.apply.companyName',
          })}
          rules={[
            {
              required: true,
              message: `${intl.formatMessage({
                id: 'pages.form.input',
              })}${intl.formatMessage({
                id: 'credit.apply.companyName',
              })}`,
            },
          ]}
        >
          <span>{currentUser?.userName}</span>
        </Form.Item>
        <Form.Item
          name="business"
          label={intl.formatMessage({
            id: 'credit.apply.business',
          })}
          rules={[
            {
              required: true,
              message: `${intl.formatMessage({
                id: 'pages.form.input',
              })}${intl.formatMessage({
                id: 'credit.apply.business',
              })}`,
            },
          ]}
        >
          <DictSelect authorword="credit_status" type="checkbox" />
        </Form.Item>
        <Form.Item
          name="type"
          label={intl.formatMessage({
            id: 'credit.apply.type',
          })}
          rules={[
            {
              required: true,
              message: `${intl.formatMessage({
                id: 'pages.form.input',
              })}${intl.formatMessage({
                id: 'credit.apply.type',
              })}`,
            },
          ]}
        >
          <Input maxLength={50} />
        </Form.Item>
        <Form.Item
          label={
            <RequiredLabel
              label={intl.formatMessage({
                id: 'credit.apply.businessCondition',
              })}
            />
          }
        >
          <EditableProTable<companyBusinessProps>
            rowKey="year"
            scroll={{
              x: 560,
            }}
            maxLength={5}
            // 关闭默认的新建按钮
            recordCreatorProps={false}
            columns={columns}
            value={dataSource}
            onChange={setDataSource}
            editable={{
              form: tableForm,
              editableKeys,
              onChange: setEditableRowKeys,
            }}
          />
        </Form.Item>
        <Form.Item
          name="debt"
          label={intl.formatMessage({
            id: 'credit.apply.debt',
          })}
          rules={[
            {
              required: true,
              message: `${intl.formatMessage({
                id: 'pages.form.input',
              })}${intl.formatMessage({
                id: 'credit.apply.debt',
              })}`,
            },
          ]}
        >
          <TextArea maxLength={1000} autoSize={{ minRows: 3, maxRows: 5 }} />
        </Form.Item>
        <Form.Item
          name="amount"
          label={intl.formatMessage({
            id: 'credit.apply.amount',
          })}
          tooltip="最高不超过月均销售额的2倍，实际以批复为准"
          rules={[
            {
              required: true,
              message: `${intl.formatMessage({
                id: 'pages.form.input',
              })}${intl.formatMessage({
                id: 'credit.apply.amount',
              })}`,
            },
          ]}
        >
          <ComInputNumber />
        </Form.Item>
      </Form>
    </ComCard>
  )
}

export default forwardRef(StepOne)
