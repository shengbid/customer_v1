import React, { useState, useEffect } from 'react'
import { Upload, Modal, message, notification } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useIntl } from 'umi'
import { loginOut } from '@/utils/base'
import Cookies from 'js-cookie'

export type comuploadProps = {
  value?: any
  onChange?: (arr?: any) => void
  limit?: number
  isDetail?: boolean
  multiple?: boolean
}

const ImageUpload: React.FC<comuploadProps> = ({
  value = [],
  limit = 10,
  onChange,
  isDetail = false,
  multiple = true,
}) => {
  const [files, setFiles] = useState<any[]>([])
  const [previewVisible, setPreviewVisible] = useState<boolean>(false)
  const [previewTitle, setPreviewTitle] = useState<string>('')
  const [previewImage, setPreviewImage] = useState<string>('')
  // const [originFiles, setOriginFiles] = useState<any>([])

  const intl = useIntl()

  // 获取上传图片的base64地址
  // const getBase64 = (file: any, uid: string) => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader()
  //     reader.readAsDataURL(file)
  //     reader.onload = () => resolve({ uid, url: reader.result })
  //     reader.onerror = (error) => reject(error)
  //   })
  // }
  const action = `${URL_PREFIX}/file/upload`

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
      // console.log(newValues)
      setFiles(newValues)
    }
  }, [value])

  // 文件上传
  const changeFile = async ({ file, fileList }: any) => {
    if (file.status !== 'uploading') {
      console.log(6, file, fileList)
      // 上传错误处理
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

      // 多文件上传,等待最后一个文件上传后再改变值
      let isFinish = true
      fileList.some((item: any) => {
        if (item.status && item.status !== 'done') {
          isFinish = false
        }
      })
      // if (file.response) {
      //   const arr = originFiles
      //   arr.push(getBase64(file.originFileObj, file.uid))
      //   setOriginFiles(arr)
      // }

      // 新增才处理,删除不处理
      if (isFinish) {
        if (fileList.length >= files.length) {
          // const datas = await Promise.all(originFiles)
          // console.log(2, datas)
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

  const checkFileSize = (file: any) => {
    if (file.type.indexOf('image') < 0) {
      message.warn(intl.formatMessage({ id: 'pages.modal.updateImageRule' }))
      return Upload.LIST_IGNORE
    }
    const size = file.size / 1024 / 1024
    if (size > 20) {
      message.warn(intl.formatMessage({ id: 'pages.modal.updateRule' }))
      return Upload.LIST_IGNORE
    }
    return true
  }

  // 预览图片
  const handlePreview = async (file: any) => {
    let { url } = file
    if (file.response) {
      url = `${file.response?.prefix}${file.response?.fileUrl}`
    }
    setPreviewTitle(file.name)
    setPreviewImage(`${url}`)
    setPreviewVisible(true)
  }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>{intl.formatMessage({ id: 'pages.btn.upload' })}</div>
    </div>
  )

  return (
    <>
      <Upload
        action={action}
        listType="picture-card"
        disabled={isDetail}
        maxCount={limit}
        multiple={multiple}
        onChange={changeFile}
        fileList={files}
        accept="image/pjpeg,image/bmp,image/jpeg,image/jpg,image/png"
        headers={{
          Authorization: Cookies.get('token'),
        }}
        onPreview={handlePreview}
        beforeUpload={checkFileSize}
      >
        {limit > files.length && !isDetail && limit > value.length ? uploadButton : null}
      </Upload>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        width={'60%'}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  )
}

export default ImageUpload
