import React, { useState } from 'react'
import CardTilte from '@/components/ComPage/ComTiltle'
import BasicInfo from './components/basicInfo'
import ComCard from '@/components/ComPage/ComCard'
import SimpleProtable from '@/components/ComProtable/SimpleProTable'
import { Button, Typography } from 'antd'
import ImportFile from '@/components/ComUpload/importFile'
import ImportProduct from './components/importProduct'
import AddModal from './components/addModal'
import { useIntl } from 'umi'
import type { ProColumns } from '@ant-design/pro-table'
import type { productListProps } from '@/services/types'

const { Link } = Typography

const ApplyForm: React.FC = (props: any) => {
  const [dataSource, setDataSource] = useState<any[]>([])
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [importVisible, setImportVisible] = useState<boolean>(false)
  const [tableData, setTableData] = useState<any[]>([])
  const [info, setInfo] = useState<any>()
  const { id } = props.location.query

  const intl = useIntl()

  const columns: ProColumns<productListProps>[] = [
    {
      title: '商品名称',
      key: 'goodName',
      dataIndex: 'goodName',
    },
    {
      title: '品牌名称',
      key: 'goodBrand',
      dataIndex: 'goodBrand',
    },
    {
      title: '商品条码',
      key: 'barCode',
      dataIndex: 'barCode',
    },
    {
      title: '最近采购价(美元)',
      key: 'purchasePrice',
      dataIndex: 'purchasePrice',
      valueType: 'digit',
      width: 127,
      hideInSearch: true,
    },
    {
      title: '公允价(美元)',
      key: 'fairPrice',
      dataIndex: 'fairPrice',
      valueType: 'digit',
      width: 110,
      hideInSearch: true,
    },
    {
      title: '保质期(月)',
      key: 'warrantyMonth',
      dataIndex: 'warrantyMonth',
      width: 90,
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({
        id: 'pages.table.option',
      }),
      width: 85,
      key: 'option',
      valueType: 'option',
      render: (_, recored) => [
        <Link
          key="edit"
          onClick={() => {
            setModalVisible(true)
            setInfo(recored)
          }}
        >
          编辑
        </Link>,
      ],
    },
  ]

  // 新增
  const submit = (data: any) => {
    const arr = dataSource
    arr.push(data)
    setDataSource(arr)
    setModalVisible(false)
  }

  // 文件导入成功
  const handleSuccess = (data: any[]) => {
    setTableData(data)
    setImportVisible(true)
  }

  // 批量导入新增
  const submitImport = (data: any[]) => {
    setImportVisible(false)
    setDataSource(dataSource.concat(data))
  }

  return (
    <>
      <CardTilte title="库存质押申请详情" />

      <BasicInfo id={id} />

      <ComCard
        title="本次入仓商品信息"
        extra={
          <>
            <Button
              onClick={() => {
                setModalVisible(true)
              }}
            >
              新增商品
            </Button>
            <ImportFile
              authorword="system:user:import"
              key="import"
              actionUrl="/system/goodManage/importData"
              downUrl="/system/goodManage/importTemplate"
              title={'商品列表'}
              handleSuccess={handleSuccess}
            />
          </>
        }
      >
        <SimpleProtable columns={columns} dataSource={dataSource} scroll={{ x: 1300 }} />
      </ComCard>
      {/* 新增编辑商品 */}
      <AddModal
        modalVisible={modalVisible}
        handleSubmit={submit}
        info={info}
        handleCancel={() => setModalVisible(false)}
      />

      {/* 批量导入 */}
      <ImportProduct
        modalVisible={importVisible}
        handleSubmit={submitImport}
        info={tableData}
        handleCancel={() => setImportVisible(false)}
      />
    </>
  )
}

export default ApplyForm
