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
import ComUpload from '@/components/ComUpload'

const { Link } = Typography

const ApplyForm: React.FC = (props: any) => {
  const [dataSource, setDataSource] = useState<any[]>([])
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [importVisible, setImportVisible] = useState<boolean>(false)
  const [tableData, setTableData] = useState<any[]>([])
  const [info, setInfo] = useState<any>()
  const { id, status } = props.location.query

  const intl = useIntl()

  const columns: ProColumns<productListProps>[] = [
    {
      title: '商品名称',
      key: 'goodName',
      dataIndex: 'goodName',
    },
    {
      title: '条形码',
      key: 'barCode',
      dataIndex: 'barCode',
    },
    {
      title: '有效期',
      key: 'warrantyMonth',
      dataIndex: 'warrantyMonth',
      width: 110,
      hideInSearch: true,
    },
    {
      title: '批次号',
      key: 'barCode',
      dataIndex: 'barCode',
    },
    {
      title: '正常数量',
      key: 'purchasePrice',
      dataIndex: 'purchasePrice',
      valueType: 'digit',
      width: 110,
      hideInSearch: true,
    },
    {
      title: '残次品数量',
      key: 'fairPrice',
      dataIndex: 'fairPrice',
      valueType: 'digit',
      width: 110,
      hideInSearch: true,
    },
    {
      title: '入库总数',
      key: 'fairPrice',
      dataIndex: 'fairPrice',
      valueType: 'digit',
      width: 110,
    },
    {
      title: '料号',
      key: 'barCode',
      dataIndex: 'barCode',
    },
    {
      title: '单位',
      key: 'unit',
      dataIndex: 'unit',
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
        <Link
          key="edit"
          onClick={() => {
            setDataSource(dataSource.filter((item: any) => item.barCode !== recored.barCode))
          }}
        >
          删除
        </Link>,
      ],
    },
  ]

  const columns2: ProColumns<any>[] = [
    {
      title: '文件类型',
      key: 'goodName',
      dataIndex: 'goodName',
    },
    {
      title: '附件',
      key: 'barCode',
      dataIndex: 'barCode',
      width: '40%',
      ellipsis: true,
      render: (_, recored: any) => (recored.files ? <ComUpload limit={1} /> : <>-</>),
    },
    {
      title: '上传时间',
      key: 'warrantyMonth',
      dataIndex: 'warrantyMonth',
    },
    {
      title: intl.formatMessage({
        id: 'pages.table.option',
      }),
      width: 100,
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
        <Link
          key="edit"
          onClick={() => {
            setDataSource(dataSource.filter((item: any) => item.barCode !== recored.barCode))
          }}
        >
          删除
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
          status === '1' ? (
            <>
              <Button
                style={{ marginRight: 12 }}
                type="primary"
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
          ) : null
        }
      >
        <SimpleProtable columns={columns} dataSource={dataSource} scroll={{ x: 1200 }} />
      </ComCard>

      <ComCard title="理货报告及附件">
        <SimpleProtable columns={columns2} dataSource={dataSource} />
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
