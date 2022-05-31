import React, { useState } from 'react'
import { Modal, Radio, Upload, message, Button, notification } from 'antd'
import type { RadioChangeEvent } from 'antd'
import { UploadOutlined, VerticalAlignTopOutlined } from '@ant-design/icons'
import Cookies from 'js-cookie'
import { loginOut } from '@/utils/base'
import ExportFile from './exportFile'
import PermissionButton from '@/components/Permission'

export interface importFileProps {
  url: string // 请求地址
  title: string // 下载模板名称
  authorWord: string // 权限字符
  handleSuccess: () => void
}
// 导入文件
const ImportFile: React.FC<importFileProps> = ({ url, title, authorWord, handleSuccess }) => {
  const [fileVisible, setFileVisible] = useState<boolean>(false)
  const [action, setAction] = useState<string>(
    `${URL_PREFIX}/system/${url}/importData?updateSupport=false`,
  )

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
      handleSuccess()
      setFileVisible(false)
      message.success('导入成功')
    }
  }

  const changeSelect = (e: RadioChangeEvent) => {
    const f = e.target.value === 1
    setAction(`${URL_PREFIX}/system/${url}/importData?updateSupport=${f}`)
  }
  const cancel = () => {
    setFileVisible(false)
  }

  const checkFileSize = (file: any) => {
    const size = file.size / 1024 / 1024
    if (size > 20) {
      message.warn('上传文件大小不能超过20M。')
      return Upload.LIST_IGNORE
    }
    return true
  }

  return (
    <>
      <PermissionButton
        authorWord={authorWord}
        key="import"
        type="primary"
        icon={<VerticalAlignTopOutlined />}
        onClick={() => {
          setFileVisible(true)
        }}
      >
        导入
      </PermissionButton>
      <Modal
        title={`导入模板`}
        maskClosable={false}
        destroyOnClose
        width={500}
        visible={fileVisible}
        footer={false}
        onCancel={cancel}
      >
        <div>
          仅允许导入xls、xlsx格式文件。
          <ExportFile authorWord="" title={title} url={url} icon={false} />
        </div>
        <div style={{ margin: '16px 0' }}>
          <span style={{ marginRight: 10 }}>是否更新已经存在的用户数据:</span>
          <Radio.Group onChange={changeSelect} defaultValue={2}>
            <Radio value={1}>是</Radio>
            <Radio value={2}>否</Radio>
          </Radio.Group>
        </div>
        <div style={{ marginBottom: 20 }}>
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
              点击上传
            </Button>
          </Upload>
        </div>
      </Modal>
    </>
  )
}

export default ImportFile
