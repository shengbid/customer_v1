import React, { useState, useEffect } from 'react'
import { Modal, Button, Form, Input, message, Spin, InputNumber } from 'antd'
import type { addModalProps } from '@/services/types'
import { addDictKey, dictKeyDetail } from '@/services'
import DictSelect from '@/components/ComSelect'
import { useIntl } from 'umi'

const { TextArea } = Input

const AddModal: React.FC<addModalProps> = ({ modalVisible, handleSubmit, handleCancel, info }) => {
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [spinning, setSpinning] = useState<boolean>(false)
  const [form] = Form.useForm()
  const intl = useIntl()
  const text = info
    ? intl.formatMessage({
        id: 'pages.btn.edit',
      })
    : intl.formatMessage({
        id: 'pages.btn.add',
      })

  const getDetail = async () => {
    setSpinning(true)
    const { data } = await dictKeyDetail(info.dictCode)
    setSpinning(false)
    if (data) {
      form.setFieldsValue({ ...data })
    }
  }

  useEffect(() => {
    if (modalVisible && info) {
      if (info.dictCode) {
        getDetail()
      }
      form.setFieldsValue({
        dictType: info.dictType,
      })
    }
  }, [modalVisible])

  const handleOk = async (values: any) => {
    setConfirmLoading(true)
    try {
      await addDictKey(values)
      setConfirmLoading(false)
    } catch (error) {
      setConfirmLoading(false)
      return
    }
    message.success(
      `${text}${intl.formatMessage({
        id: 'pages.form.success',
      })}`,
    )
    handleSubmit()
    form.resetFields()
  }

  const cancel = () => {
    handleCancel()
    form.resetFields()
  }

  return (
    <Modal
      title={`${text}${intl.formatMessage({
        id: 'sys.dict.dictType',
      })}`}
      maskClosable={false}
      destroyOnClose
      width={600}
      visible={modalVisible}
      footer={false}
      onCancel={cancel}
    >
      <Spin spinning={spinning}>
        <Form
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 18 }}
          initialValues={{ status: '0' }}
          onFinish={handleOk}
          form={form}
          autoComplete="off"
        >
          <Form.Item label="id" name="dictCode" style={{ display: 'none' }}>
            <Input />
          </Form.Item>

          <Form.Item
            label={intl.formatMessage({
              id: 'sys.dict.dictType',
            })}
            name="dictType"
            rules={[
              {
                required: true,
                message: `${intl.formatMessage({
                  id: 'pages.form.input',
                })}${intl.formatMessage({
                  id: 'sys.dict.dictType',
                })}`,
              },
            ]}
          >
            <Input maxLength={50} disabled />
          </Form.Item>

          <Form.Item
            label={intl.formatMessage({
              id: 'sys.dictKey.dictLabel',
            })}
            tooltip={intl.formatMessage({
              id: 'zhCN',
            })}
            name="dictLabel"
            rules={[
              {
                required: true,
                message: `${intl.formatMessage({
                  id: 'pages.form.input',
                })}${intl.formatMessage({
                  id: 'sys.dictKey.dictLabel',
                })}`,
              },
            ]}
          >
            <Input maxLength={50} />
          </Form.Item>
          <Form.Item
            label={intl.formatMessage({
              id: 'sys.dictKey.dictLabel',
            })}
            tooltip={intl.formatMessage({
              id: 'zhTW',
            })}
            name="dictLabelFt"
            rules={[
              {
                required: true,
                message: `${intl.formatMessage({
                  id: 'pages.form.input',
                })}${intl.formatMessage({
                  id: 'sys.dictKey.dictLabel',
                })}`,
              },
            ]}
          >
            <Input maxLength={50} />
          </Form.Item>
          <Form.Item
            label={intl.formatMessage({
              id: 'sys.dictKey.dictValue',
            })}
            name="dictValue"
            rules={[
              {
                required: true,
                message: `${intl.formatMessage({
                  id: 'pages.form.input',
                })}${intl.formatMessage({
                  id: 'sys.dictKey.dictValue',
                })}`,
              },
            ]}
          >
            <Input maxLength={3} />
          </Form.Item>

          <Form.Item
            label={intl.formatMessage({
              id: 'sys.dictKey.dictSort',
            })}
            name="dictSort"
            rules={[
              {
                required: true,
                message: `${intl.formatMessage({
                  id: 'pages.form.input',
                })}${intl.formatMessage({
                  id: 'sys.dictKey.dictSort',
                })}`,
              },
            ]}
          >
            <InputNumber style={{ width: '100%' }} min={1} max={30} />
          </Form.Item>

          <Form.Item
            label={intl.formatMessage({
              id: 'sys.base.status',
            })}
            name="status"
            rules={[
              {
                required: true,
                message: `${intl.formatMessage({
                  id: 'pages.form.select',
                })}${intl.formatMessage({
                  id: 'sys.base.status',
                })}`,
              },
            ]}
          >
            <DictSelect authorword="sys_normal_disable" type="radio" />
          </Form.Item>

          <Form.Item
            label={intl.formatMessage({
              id: 'sys.base.remark',
            })}
            name="remark"
            rules={[
              {
                required: false,
                message: `${intl.formatMessage({
                  id: 'pages.form.input',
                })}${intl.formatMessage({
                  id: 'sys.base.remark',
                })}`,
              },
            ]}
          >
            <TextArea autoSize={{ minRows: 3, maxRows: 5 }} maxLength={500} />
          </Form.Item>

          <div className="modal-btns">
            <Button type="primary" htmlType="submit" loading={confirmLoading}>
              {intl.formatMessage({
                id: 'pages.btn.confirm',
              })}
            </Button>
            <Button onClick={cancel} className="cancel-btn">
              {intl.formatMessage({
                id: 'pages.btn.cancel',
              })}
            </Button>
          </div>
        </Form>
      </Spin>
    </Modal>
  )
}

export default AddModal
