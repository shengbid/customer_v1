import React, { useState, useEffect } from 'react'
import { Modal, Button, Form, Input, message, Spin } from 'antd'
import type { addModalProps } from '@/services/types'
import { addNotice, noticeDetail } from '@/services'
import DictSelect from '@/components/ComSelect'
import { useIntl, getLocale } from 'umi'
// 引入编辑器组件
import BraftEditor from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css'

const languageObj = {
  'zh-CN': 'zh',
  'en-US': 'en',
  'zh-TW': 'zh-hant',
  'ja-JP': 'jpn',
  'ko-KR': 'KR',
}

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
      form.setFieldsValue({
        ...data,
        noticeContent: BraftEditor.createEditorState(data.noticeContent),
      })
    }
  }
  // 不需要的编辑器属性
  const excludeControls = [
    'font-family',
    'letter-spacing',
    'emoji',
    'text-indent',
    'media',
    'separator',
    'superscript',
    'subscript',
  ]

  useEffect(() => {
    if (modalVisible && info) {
      getDetail()
    }
  }, [modalVisible])

  const handleOk = async (values: any) => {
    setConfirmLoading(true)
    try {
      await addNotice({
        ...values,
        noticeContent: values.noticeContent.toHTML(),
      })
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
      width={900}
      visible={modalVisible}
      footer={false}
      onCancel={cancel}
    >
      <Spin spinning={spinning}>
        <Form
          name="basic"
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 20 }}
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
            name="noticeTitle"
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
            name="noticeType"
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
            <DictSelect authorword="sys_notice_type" />
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
            name="noticeContent"
            rules={[
              {
                required: true,
                message: `${intl.formatMessage({
                  id: 'pages.form.input',
                })}${intl.formatMessage({
                  id: 'sys.notice.noticeContent',
                })}`,
              },
            ]}
          >
            <BraftEditor language={languageObj[getLocale()]} excludeControls={excludeControls} />
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
