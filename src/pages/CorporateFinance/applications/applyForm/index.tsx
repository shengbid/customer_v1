import React, { useState, useRef, MutableRefObject, useEffect } from 'react'
import ComCard from '@/components/ComPage/ComCard'
import { EditableProTable } from '@ant-design/pro-table'
import RequiredLabel from '@/components/RequiredLabel'
import { Form, Button } from 'antd'
import Product from './components/product'
import Finance from './components/finance'
import styles from './index.less'
import { useIntl, history } from 'umi'
import DictSelect from '@/components/ComSelect'
import CardTilte from '@/components/ComPage/ComTiltle'

const ApplyForm: React.FC = (props: any) => {
  const [dataSource, setDataSource] = useState<any[]>([{ id: 1 }])
  const [editableKeys, setEditableRowKeys] = useState<any[]>([1])
  const [subLoading, setSubLoading] = useState<boolean>(false)
  const [title, setTitle] = useState<string>('')
  const [tableForm] = Form.useForm()
  const productRef: MutableRefObject<any> = useRef({})
  const financeRef: MutableRefObject<any> = useRef({})
  const intl = useIntl()
  const { type } = props.location.query

  useEffect(() => {
    switch (type) {
      case '1':
        setTitle('代理采购-代理采购申请')
        break
      case '2':
        setTitle('B2B质押-在途质押')
        break
      case '3':
        setTitle('B2B质押-仓内质押申请')
        break

      default:
        break
    }
  }, [])

  const columns = [
    {
      title: <RequiredLabel label="账户名称" />,
      dataIndex: 'barCode',
      width: '20%',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项是必填项',
          },
        ],
      },
      renderFormItem: () => <DictSelect authorword="warehouse_type" />,
    },
    {
      title: <RequiredLabel label="账号" />,
      dataIndex: 'barCode',
      width: '20%',
      editable: false,
    },
    {
      title: <RequiredLabel label="收款银行" />,
      dataIndex: 'barCode',
      width: '17%',
      editable: false,
    },
    {
      title: <RequiredLabel label="银行地址" />,
      dataIndex: 'barCode',
      width: '25%',
      editable: false,
    },
    {
      title: <RequiredLabel label="SWIFT Code" />,
      dataIndex: 'barCode',
      width: '18%',
      editable: false,
    },
  ]

  const submit = () => {
    setSubLoading(false)
  }

  return (
    <div className={styles.box}>
      <CardTilte title={title} />

      {/* 采购信息 */}
      <Product type={type} ref={productRef} />

      {/* 融资信息 */}
      <Finance ref={financeRef} />

      <ComCard title="指定供应商收款账号">
        <EditableProTable<any>
          rowKey="id"
          className="nopaddingtable"
          maxLength={5}
          columns={columns}
          value={dataSource}
          scroll={{
            x: 1000,
          }}
          onChange={setDataSource}
          recordCreatorProps={false}
          editable={{
            form: tableForm,
            editableKeys,
            onValuesChange: (record: any, recordList: any) => {
              setDataSource(recordList)
            },
            onChange: setEditableRowKeys,
          }}
        />
      </ComCard>

      <div className="applyBtn">
        <Button style={{ margin: '0 8px' }} onClick={() => history.push('/finance/apply')}>
          {intl.formatMessage({
            id: 'pages.btn.back',
          })}
        </Button>

        <Button type="primary" loading={subLoading} onClick={submit}>
          {intl.formatMessage({
            id: 'pages.btn.submit',
          })}
        </Button>
      </div>
    </div>
  )
}

export default ApplyForm
