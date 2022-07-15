import React, { useState, useEffect } from 'react'
import { Button, Upload, message, notification } from 'antd'
import {
  UploadOutlined,
  FileTextOutlined,
  FilePdfOutlined,
  FileExcelOutlined,
  FileImageOutlined,
  FileUnknownOutlined,
  FileGifOutlined,
  FileWordOutlined,
} from '@ant-design/icons'
import { useIntl } from 'umi'
import Cookies from 'js-cookie'
import { loginOut } from '@/utils/base'

export type comuploadProps = {
  value?: any
  onChange?: (arr?: any) => void
  limit?: number
  isDetail?: boolean
  multiple?: boolean
}

const ComUpload: React.FC<comuploadProps> = ({
  value = [],
  limit = 10,
  onChange,
  isDetail = false,
  multiple = true,
}) => {
  const [files, setFiles] = useState<any[]>([])
  // console.log(3, value)
  const intl = useIntl()

  useEffect(() => {
    // 展示传入的文件数据
    if (value && (value.length || value.fileName)) {
      // 文件数值
      const newValues: any[] = []
      if (value && value.length) {
        value.forEach((item: any) => {
          const newItem = item
          if (!item.url) {
            newItem.url = `${item.pictureDomain}${item.fileUrl}`
            newItem.name = item.fileName
            newItem.uid = item.fileId ? item.fileId : Math.floor(Math.random() * 1000)
          }
          newValues.push(newItem)
        })
      } else if (value?.fileName) {
        // 文件对象
        newValues.push({
          ...value,
          url: `${value.pictureDomain}${value.fileUrl}`,
          name: value.fileName,
          uid: value.fileId ? value.fileId : Math.floor(Math.random() * 1000),
        })
      }
      console.log(newValues)
      setFiles(newValues)
    }
  }, [value])

  const action = `${URL_PREFIX}/file/upload`

  // 文件上传
  const changeFile = ({ file, fileList }: any) => {
    console.log(6, file, fileList)
    if (file.status !== 'uploading') {
      if (file.response && file.response.code === 401) {
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
      // 多文件上传,所有文件上传完成后改变值
      let isFinish = true
      fileList.some((item: any) => {
        if (item.status && item.status !== 'done') {
          isFinish = false
        }
      })
      if (isFinish) {
        if (fileList.length >= files.length) {
          // 需要改变fileList的值,否则status的状态不会改变
          fileList = fileList.map((item: any) => {
            let newItem = { ...item }
            if (item.response) {
              newItem = {
                ...item.response.data,
                fileName: item.response.data.name,
                pictureDomain: item.response.data.prefix,
                url: `${item.response.data.prefix}${item.response.data.fileUrl}`,
              }
            }
            return newItem
          })
        }
        onChange?.(fileList)
      }
    }
    setFiles(fileList)
  }

  // 文件名icon
  const fileIcon = new Map([
    ['deflaut', <FileTextOutlined key="deflaut" />],
    ['txt', <FileTextOutlined key="txt" />],
    ['pdf', <FilePdfOutlined key="pdf" />],
    ['doc', <FileWordOutlined key="doc" />],
    ['docx', <FileWordOutlined key="docx" />],
    ['xls', <FileExcelOutlined key="xls" />],
    ['xlsx', <FileExcelOutlined key="xlsx" />],
    ['png', <FileImageOutlined key="png" />],
    ['jpg', <FileImageOutlined key="jpg" />],
    ['gif', <FileGifOutlined key="gif" />],
    ['unkown', <FileUnknownOutlined key="unkown" />],
  ])

  const iconRender = (file: any) => {
    const { name } = file
    return fileIcon.get(name ? name.split('.')[1] : 'deflaut') || <FileUnknownOutlined />
  }

  const checkFileSize = (file: any) => {
    const size = file.size / 1024 / 1024
    if (size > 20) {
      message.warn(intl.formatMessage({ id: 'pages.modal.updateRule' }))
      return Upload.LIST_IGNORE
    }
    return true
  }
  // 文件下载
  const onPreview = (file: any) => {
    // console.log(file)
    let { url } = file
    if (file.response) {
      url = `${file.response?.prefix}${file.response?.fileUrl}`
    }
    window.open(`${url}`)
  }

  return (
    <Upload
      action={action}
      disabled={isDetail}
      multiple={multiple}
      iconRender={iconRender}
      maxCount={limit}
      onPreview={onPreview}
      headers={{
        Authorization: Cookies.get('token'),
      }}
      onChange={changeFile}
      fileList={files}
      beforeUpload={checkFileSize}
    >
      {limit > files.length && !isDetail && limit > value.length ? (
        <Button icon={<UploadOutlined />} type="text" />
      ) : null}
    </Upload>
  )
}

export default ComUpload
