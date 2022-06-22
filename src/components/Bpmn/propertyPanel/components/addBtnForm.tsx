import React, { useState, useEffect } from 'react'
import { Modal, Button, Table } from 'antd'
import buData from './buttons'

interface addbtnProps {
  visible: boolean
  initSelectBt: Array<any>
  handleCancel: () => void
  handleSubmit: (value: any) => void
}

const AddBtnForm: React.FC<addbtnProps> = ({
  visible,
  initSelectBt,
  handleCancel,
  handleSubmit,
}) => {
  const [slectBt, setSelectBt] = useState<any[]>([])
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([])

  const handleOk = () => {
    handleSubmit(slectBt)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: (_selectedRowKeys: React.Key[], selectedRows: any[]) => {
      setSelectBt(selectedRows)
    },
  }
  useEffect(() => {
    if (visible) {
      setSelectBt(initSelectBt)
      setSelectedRowKeys(initSelectBt.map((itme) => itme.code))
    }
  }, [initSelectBt, visible])

  useEffect(() => {
    setSelectedRowKeys(slectBt.map((itme) => itme.code))
  }, [slectBt])

  return (
    <Modal
      title="添加按钮"
      maskClosable={false}
      destroyOnClose
      width={600}
      visible={visible}
      onCancel={handleCancel}
      footer={
        <div style={{ textAlign: 'right' }}>
          <Button style={{ margin: '0 8px' }} onClick={handleCancel}>
            取消
          </Button>
          <Button type="primary" onClick={() => handleOk()}>
            提交
          </Button>
        </div>
      }
    >
      <Table
        columns={[
          {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: '编码',
            dataIndex: 'name',
            key: 'code',
          },
        ]}
        rowKey="code"
        dataSource={buData}
        pagination={false}
        rowSelection={{
          ...rowSelection,
        }}
      />
    </Modal>
  )
}

export default AddBtnForm
