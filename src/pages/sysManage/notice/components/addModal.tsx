import React, { useState, useEffect } from 'react'
import { Modal, Button, Form, Input, message, Spin } from 'antd'
import type { addModalProps } from '@/services/types'
import { addNotice, noticeDetail } from '@/services'
import DictSelect from '@/components/ComSelect'
import { useIntl } from 'umi'
// 引入编辑器组件
import BraftEditor from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css'

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
    const { data } = await noticeDetail(info)
    setSpinning(false)
    if (data) {
      form.setFieldsValue({ ...data })
    }
  }

  useEffect(() => {
    if (modalVisible && info) {
      getDetail()
    }
  }, [modalVisible])

  const handleOk = async (values: any) => {
    setConfirmLoading(true)
    try {
      await addNotice(values)
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
        id: 'sys.notice.name',
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
          <Form.Item label="id" name="noticeId" style={{ display: 'none' }}>
            <Input />
          </Form.Item>
          <Form.Item
            label={intl.formatMessage({
              id: 'sys.notice.noticeTitle',
            })}
            name="postName"
            rules={[
              {
                required: true,
                message: `${intl.formatMessage({
                  id: 'pages.form.input',
                })}${intl.formatMessage({
                  id: 'sys.notice.noticeTitle',
                })}`,
              },
            ]}
          >
            <Input maxLength={100} />
          </Form.Item>

          <Form.Item
            label={intl.formatMessage({
              id: 'sys.notice.noticeType',
            })}
            name="status"
            rules={[
              {
                required: true,
                message: `${intl.formatMessage({
                  id: 'pages.form.select',
                })}${intl.formatMessage({
                  id: 'sys.notice.noticeType',
                })}`,
              },
            ]}
          >
            <DictSelect authorword="sys_notice_type" type="radio" />
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
              id: 'sys.notice.noticeContent',
            })}
            name="remark"
            rules={[
              {
                required: false,
                message: `${intl.formatMessage({
                  id: 'pages.form.input',
                })}${intl.formatMessage({
                  id: 'pages.form.noticeContent',
                })}`,
              },
            ]}
          >
            <BraftEditor />
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
