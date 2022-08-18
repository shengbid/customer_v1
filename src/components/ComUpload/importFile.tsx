import React, { useState, useEffect } from 'react'
import { Modal, Upload, message, Button, notification } from 'antd'
// import type { RadioChangeEvent } from 'antd'
import { UploadOutlined, VerticalAlignTopOutlined } from '@ant-design/icons'
import Cookies from 'js-cookie'
import { loginOut } from '@/utils/base'
import ExportFile from './exportFile'
import PermissionButton from '@/components/Permission'
import { useIntl } from 'umi'
export interface importFileProps {
  downUrl: string // 下载请求地址
  title: string // 下载模板名称
  authorword: string // 权限字符
  handleSuccess: (data?: any) => void
  actionUrl?: string // 上传地址
}
// 导入文件
const ImportFile: React.FC<importFileProps> = ({
  downUrl,
  title,
  authorword,
  actionUrl,
  handleSuccess,
}) => {
  const [fileVisible, setFileVisible] = useState<boolean>(false)
  const [action, setAction] = useState<string>('')

  useEffect(() => {
    if (actionUrl) {
      setAction(`${URL_PREFIX}${actionUrl}`)
    }
  }, [actionUrl])

  const intl = useIntl()

  const changeFile = ({ file }: any) => {
    // console.log(6, file, fileList)
    if (file.status !== 'uploading') {
      if (file.response && file.response.code === '401') {
        loginOut()
        notification.warning({
          key: 'error',
          message: file.response.msg,
        })
        return
      }
      if (file.response && file.response.code !== 200) {
        notification.warning({
          key: 'error',
          message: file.response.msg,
        })
        return
      }
      handleSuccess(file.response.data)
      setFileVisible(false)
    }
  }

  // const changeSelect = (e: RadioChangeEvent) => {
  //   const f = e.target.value === 1
  //   setAction(`${URL_PREFIX}/system/${url}/importData?updateSupport=${f}`)
  // }
  const cancel = () => {
    setFileVisible(false)
  }

  const checkFileSize = (file: any) => {
    const size = file.size / 1024 / 1024
    // console.log(file)
    if (file.name.indexOf('.xls') < 1) {
      message.warn(intl.formatMessage({ id: 'pages.modal.importTit' }))
      return Upload.LIST_IGNORE
    }
    if (size > 20) {
      message.warn(intl.formatMessage({ id: 'pages.modal.updateRule' }))
      return Upload.LIST_IGNORE
    }
    return true
  }

  return (
    <>
      <PermissionButton
        authorword={authorword}
        key="import"
        type="primary"
        icon={<VerticalAlignTopOutlined />}
        onClick={() => {
          setFileVisible(true)
        }}
      >
        {intl.formatMessage({ id: 'pages.btn.import' })}
      </PermissionButton>
      <Modal
        title={intl.formatMessage({ id: 'pages.modal.importTitle' })}
        maskClosable={false}
        destroyOnClose
        width={500}
        visible={fileVisible}
        footer={false}
        onCancel={cancel}
      >
        <div>
          {intl.formatMessage({ id: 'pages.modal.importTit' })}
          <ExportFile authorword="" title={title} url={downUrl} icon={false} />
        </div>
        {/* <div style={{ margin: '16px 0' }}>
          <span style={{ marginRight: 10 }}>
            {intl.formatMessage({ id: 'pages.modal.isUpdateData' })}
          </span>
          <Radio.Group onChange={changeSelect} defaultValue={2}>
            <Radio value={1}>{intl.formatMessage({ id: 'pages.form.yes' })}</Radio>
            <Radio value={2}>{intl.formatMessage({ id: 'pages.form.no' })}</Radio>
          </Radio.Group>
        </div> */}
        <div style={{ margin: '20px 0 ' }}>
          <Upload
            action={action}
            accept=".xlsx, .xls"
            maxCount={1}
            headers={{
              Authorization: Cookies.get('token'),
            }}
            onChange={changeFile}
            beforeUpload={checkFileSize}
          >
            <Button type="primary" icon={<UploadOutlined />}>
              {intl.formatMessage({ id: 'pages.btn.upload' })}
            </Button>
          </Upload>
        </div>
      </Modal>
    </>
  )
}

export default ImportFile
