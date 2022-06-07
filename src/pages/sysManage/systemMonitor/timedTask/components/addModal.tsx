import React, { useState, useEffect } from 'react'
import { Modal, Button, Form, Input, message, Spin } from 'antd'
import type { addModalProps } from '@/services/types'
import { addTimedTask, timedTaskDetail } from '@/services'
import DictSelect from '@/components/ComSelect'
import { useIntl } from 'umi'

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
    const { data } = await timedTaskDetail(info)
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
      await addTimedTask(values)
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
        id: 'sys.timedTask.name',
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
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 17 }}
          initialValues={{ status: '0' }}
          onFinish={handleOk}
          form={form}
          autoComplete="off"
        >
          <Form.Item label="id" name="jobId" style={{ display: 'none' }}>
            <Input />
          </Form.Item>
          <Form.Item
            label={intl.formatMessage({
              id: 'sys.timedTask.jobName',
            })}
            name="jobName"
            rules={[
              {
                required: true,
                message: `${intl.formatMessage({
                  id: 'pages.form.input',
                })}${intl.formatMessage({
                  id: 'sys.timedTask.jobName',
                })}`,
              },
            ]}
          >
            <Input maxLength={50} />
          </Form.Item>

          <Form.Item
            label={intl.formatMessage({
              id: 'sys.timedTask.jobGroup',
            })}
            name="jobGroup"
            rules={[
              {
                required: true,
                message: `${intl.formatMessage({
                  id: 'pages.form.select',
                })}${intl.formatMessage({
                  id: 'sys.timedTask.jobGroup',
                })}`,
              },
            ]}
          >
            <DictSelect authorword="sys_job_group" />
          </Form.Item>

          <Form.Item
            label={intl.formatMessage({
              id: 'sys.timedTask.invokeTarget',
            })}
            name="invokeTarget"
            rules={[
              {
                required: true,
                message: `${intl.formatMessage({
                  id: 'pages.form.input',
                })}${intl.formatMessage({
                  id: 'sys.timedTask.invokeTarget',
                })}`,
              },
            ]}
          >
            <Input maxLength={150} />
          </Form.Item>

          <Form.Item
            label={intl.formatMessage({
              id: 'sys.timedTask.cronExpression',
            })}
            name="cronExpression"
            rules={[
              {
                required: true,
                message: `${intl.formatMessage({
                  id: 'pages.form.input',
                })}${intl.formatMessage({
                  id: 'sys.timedTask.cronExpression',
                })}`,
              },
            ]}
          >
            <Input maxLength={350} />
          </Form.Item>

          <Form.Item
            label={intl.formatMessage({
              id: 'sys.timedTask.misfirePolicy',
            })}
            name="misfirePolicy"
            rules={[
              {
                required: true,
                message: `${intl.formatMessage({
                  id: 'pages.form.select',
                })}${intl.formatMessage({
                  id: 'sys.timedTask.misfirePolicy',
                })}`,
              },
            ]}
          >
            <DictSelect authorword="sys_job_celue" type="radio" />
          </Form.Item>

          <Form.Item
            label={intl.formatMessage({
              id: 'sys.timedTask.concurrent',
            })}
            name="concurrent"
            rules={[
              {
                required: true,
                message: `${intl.formatMessage({
                  id: 'pages.form.select',
                })}${intl.formatMessage({
                  id: 'sys.timedTask.concurrent',
                })}`,
              },
            ]}
          >
            <DictSelect authorword="sys_job_erupt" type="radio" />
          </Form.Item>

          <Form.Item
            label={intl.formatMessage({
              id: 'sys.timedTask.status',
            })}
            name="status"
            rules={[
              {
                required: true,
                message: `${intl.formatMessage({
                  id: 'pages.form.select',
                })}${intl.formatMessage({
                  id: 'sys.timedTask.status',
                })}`,
              },
            ]}
          >
            <DictSelect authorword="sys_common_status" type="radio" />
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
