import React, { useState, useEffect } from 'react'
import { Modal, Button, Form, Select, Spin, Row, Col } from 'antd'
import { EditableProTable } from '@ant-design/pro-table'
import { emailReg } from '@/utils/reg'
import RequiredLabel from '@/components/RequiredLabel'
import { getTemplates, getTemplateSigners } from '@/services'
import type { selectOptionProps } from '@/services/types'

// const { Option } = Select

interface modalPrps {
  modalVisible: boolean
  handleSubmit: (value: any) => void
  handleCancel: () => void
}
const FileModal: React.FC<modalPrps> = ({ modalVisible, handleSubmit, handleCancel }) => {
  const [templateOptions, setTemplateOptions] = useState<selectOptionProps[]>([])
  const [spinning, setSpinning] = useState<boolean>(false)
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([])
  const [tableData, setTableData] = useState<any[]>([])
  // const [tableData, setTableData] = useState<any[]>([
  //   { userId: 1, name: 'ShouMei Lai', email: 'lsm2022@163.com', roleName: 'partyA' },
  //   { userId: 2, name: '吉祥', email: '361087115@qq.com', roleName: 'partyB' },
  // ])

  const [form] = Form.useForm()
  const [editForm] = Form.useForm()
  const text = '填写模板信息'

  const getTemplateList = async () => {
    const { data } = await getTemplates()
    setSpinning(false)
    if (data && data.length) {
      setTemplateOptions(
        data.map((item: any) => {
          return {
            label: item.name,
            value: item.templateId,
          }
        }),
      )
    }
  }

  useEffect(() => {
    getTemplateList()
  }, [])

  const changeTemplate = async (value: string) => {
    const { data } = await getTemplateSigners({ templateId: value })
    console.log(data)
    if (data && data.length) {
      setTableData(data)
      setEditableRowKeys(data.map((item: any) => item.userId))
    }
  }

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      formItemProps: () => {
        return {
          rules: [{ required: true, message: '此项为必填项' }],
        }
      },
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      formItemProps: () => {
        return {
          rules: [emailReg, { required: true, message: '此项为必填项' }],
        }
      },
    },
    {
      title: '签约角色',
      dataIndex: 'roleName',
      editable: false,
      // renderFormItem: () => (
      //   <Select style={{ width: '100%' }}>
      //     <Option value="partyA">甲方</Option>
      //     <Option value="partyB">乙方</Option>
      //   </Select>
      // ),
      // formItemProps: () => {
      //   return {
      //     rules: [{ required: true, message: '此项为必填项' }],
      //   }
      // },
    },
  ]

  const handleOk = async (values: any) => {
    await editForm.validateFields()
    console.log(tableData)
    handleSubmit(values)
    // form.resetFields()
  }

  const cancel = () => {
    handleCancel()
    form.resetFields()
  }

  const previewModel = () => {
    window.open('/pdf/sgin1.pdf', '_blank')
  }

  return (
    <Modal
      title={`${text}`}
      maskClosable={false}
      destroyOnClose
      width={800}
      visible={modalVisible}
      footer={false}
      onCancel={cancel}
    >
      <Spin spinning={spinning}>
        <Form
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 18 }}
          onFinish={handleOk}
          form={form}
          autoComplete="off"
        >
          <Form.Item label={<RequiredLabel label="模板文件" />}>
            <Row gutter={8}>
              <Col span={18}>
                <Form.Item
                  name="templateId"
                  rules={[
                    {
                      required: true,
                      message: `请选择签约模板`,
                    },
                  ]}
                >
                  <Select
                    style={{ width: '100%' }}
                    onChange={changeTemplate}
                    options={templateOptions}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Button type="primary" onClick={previewModel}>
                  预览模板文件
                </Button>
              </Col>
            </Row>
          </Form.Item>
          <div style={{ paddingLeft: 22 }}>
            <RequiredLabel label="签约人" />
          </div>
          <EditableProTable
            rowKey="userId"
            columns={columns}
            value={tableData}
            recordCreatorProps={false}
            editable={{
              form: editForm,
              type: 'multiple',
              editableKeys,
              onValuesChange: (record: any, recordList: any) => setTableData(recordList),
              onChange: (keys: number[], data: any[]) => {
                setEditableRowKeys(keys)
                setTableData(data)
              },
            }}
          />

          <div className="modal-btns">
            <Button type="primary" htmlType="submit">
              确定
            </Button>
            <Button onClick={cancel} className="cancel-btn">
              取消
            </Button>
          </div>
        </Form>
      </Spin>
    </Modal>
  )
}

export default FileModal
