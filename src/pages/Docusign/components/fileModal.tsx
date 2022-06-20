import React, { useState, useEffect } from 'react'
import { Modal, Button, Form, Select, Spin } from 'antd'
import ComEditTable from '@/components/ComProtable/ComEditTable'
import { emailReg, phoneReg } from '@/utils/reg'
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
  // const [tableData, setTableData] = useState<any[]>([{ userId: 1 }])
  const [roleLoading, setRoleLoading] = useState<boolean>(false)
  // const [roleList, setRoleList] = useState<any[]>([[]])

  const [form] = Form.useForm()
  const [editForm] = Form.useForm()
  const text = '填写模板信息'

  const initialValues = {
    signerName: 'ShouMei Lai',
    signerEmail: 'lsm2022@163.com',
    countryCode: '+86',
    phoneNumber: '18033098150',
  }

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

  // const getTemplateList = () => {
  //   setTemplateOptions([
  //     { label: '授信合同', value: 'bc831ebc-6160-4d68-b9f4-036b7932e3d6' },
  //     { label: '借款合同', value: '2f9bf387-68e4-4168-b90a-df821830161c' },
  //   ])
  // }

  useEffect(() => {
    getTemplateList()
  }, [])

  const changeTemplate = async (value: any) => {
    // console.log(value, index)
    setRoleLoading(true)
    const { data } = await getTemplateSigners({ templateId: value.value })
    // const arr: any[] = roleList
    // arr[index] = data.map((item: any) => {
    //   return {
    //     label: item.roleName,
    //     value: item.roleName,
    //   }
    // })
    // setRoleList(arr)
    setTableData(
      data.map((item: any) => {
        return {
          ...item,
          signerName: 'ShouMei Lai',
          signerEmail: 'lsm2022@163.com',
          countryCode: '+86',
          phoneNumber: '18033098150',
        }
      }),
    )
    setEditableRowKeys(data.map((item: any) => item.userId))
    setRoleLoading(false)
    // console.log(2, arr, roleList)
  }

  const columns = [
    {
      title: <RequiredLabel label="名字" />,
      dataIndex: 'signerName',
      formItemProps: () => {
        return {
          rules: [{ required: true, message: '此项为必填项' }],
        }
      },
    },
    {
      title: <RequiredLabel label="邮箱" />,
      dataIndex: 'signerEmail',
      formItemProps: () => {
        return {
          rules: [emailReg, { required: true, message: '此项为必填项' }],
        }
      },
    },
    {
      title: <RequiredLabel label="国家地区" />,
      dataIndex: 'countryCode',
      formItemProps: () => {
        return {
          rules: [{ required: true, message: '此项为必填项' }],
        }
      },
    },
    {
      title: <RequiredLabel label="电话号码" />,
      dataIndex: 'phoneNumber',
      formItemProps: () => {
        return {
          rules: [phoneReg, { required: true, message: '此项为必填项' }],
        }
      },
    },
    {
      title: <RequiredLabel label="签约角色" />,
      dataIndex: 'roleName',
      // editable: false,
      // renderFormItem: ({ index }: any) => {
      //   return <Select style={{ width: '100%' }} options={roleList[index]} loading={roleLoading} />
      // },
      formItemProps: () => {
        return {
          rules: [{ required: true, message: '此项为必填项' }],
        }
      },
    },
  ]

  const handleOk = async (values: any) => {
    await editForm.validateFields()
    console.log(tableData)
    handleSubmit({
      ...values.templateInfo,
      signerList: tableData.map((item: any) => {
        return {
          ...item,
          signerClientId: item.userId,
        }
      }),
    })
    // form.resetFields()
  }

  const cancel = () => {
    handleCancel()
    form.resetFields()
  }

  // const previewModel = () => {
  //   window.open('/pdf/sgin1.pdf', '_blank')
  // }

  return (
    <Modal
      title={`${text}`}
      maskClosable={false}
      destroyOnClose
      width={900}
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
          initialValues={initialValues}
        >
          {/* <Form.Item label={<RequiredLabel label="模板文件" />}> */}
          <Form.Item
            name="templateInfo"
            label="模板文件"
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
              labelInValue
              allowClear
            />
          </Form.Item>
          {/* <Row gutter={8}>
              <Col span={18}>
              </Col>
              <Col span={6}>
                <Button type="primary" onClick={previewModel}>
                  预览模板文件
                </Button>
              </Col>
            </Row> */}
          {/* </Form.Item> */}
          {/* <Form.Item
            label="签约人"
            name="signerName"
            rules={[
              {
                required: true,
                message: `请输入签约人`,
              },
            ]}
          >
            <Input placeholder="" maxLength={50} />
          </Form.Item>
          <Form.Item
            label="签约人邮箱"
            name="signerEmail"
            rules={[
              emailReg,
              {
                required: true,
                message: `请输入签约人邮箱`,
              },
            ]}
          >
            <Input maxLength={50} />
          </Form.Item>
          <Form.Item
            label="签约人地区编码"
            name="countryCode"
            rules={[
              {
                required: true,
                message: `请输入签约人地区编码`,
              },
            ]}
          >
            <Input maxLength={50} />
          </Form.Item>
          <Form.Item
            label="签约人电话"
            name="phoneNumber"
            rules={[
              phoneReg,
              {
                required: true,
                message: `请输入签约人电话`,
              },
            ]}
          >
            <Input maxLength={50} />
          </Form.Item> */}
          <div style={{ paddingLeft: 22 }}>
            <RequiredLabel label="签约人信息" />
          </div>
          <ComEditTable
            rowKey="userId"
            columns={columns}
            value={tableData}
            loading={roleLoading}
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
