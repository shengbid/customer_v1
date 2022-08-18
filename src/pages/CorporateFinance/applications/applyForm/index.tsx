import React, { useState, useRef, MutableRefObject } from 'react'
import ComCard from '@/components/ComPage/ComCard'
import ComEditTable from '@/components/ComProtable/ComEditTable'
import { Form } from 'antd'
import Product from './components/product'
import styles from './index.less'

const ApplyForm: React.FC = () => {
  const [dataSource, setDataSource] = useState<any[]>([])
  const [editableKeys, setEditableRowKeys] = useState<any[]>([])
  const [tableForm] = Form.useForm()
  const productRef: MutableRefObject<any> = useRef({})
  const columns = [{}]

  return (
    <div className={styles.box}>
      <div className={styles.header}>
        <div className={styles.title}>代理采购-代理采购申请</div>
      </div>
      {/* 采购信息 */}
      <Product ref={productRef} />

      <ComCard title="指定供应商收款账号">
        <ComEditTable<any>
          rowKey="id"
          className="nopaddingtable"
          maxLength={5}
          columns={columns}
          value={dataSource}
          scroll={{
            x: 1000,
          }}
          onChange={setDataSource}
          editable={{
            form: tableForm,
            type: 'multiple',
            editableKeys,
            onValuesChange: (record: any, recordList: any) => {
              setDataSource(recordList)
            },
            onChange: setEditableRowKeys,
          }}
        />
      </ComCard>
    </div>
  )
}

export default ApplyForm
