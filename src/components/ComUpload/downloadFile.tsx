import React, { useState } from 'react'
import { Button, notification } from 'antd'
import { downloadTemplate } from '@/services'
import { loginOut } from '@/utils/base'
import FileSaver from 'file-saver'
import { useIntl } from 'umi'

export interface exportProps {
  templateId: string
  title?: string
}

// 下载模板
const DownloadFile: React.FC<exportProps> = ({ title = '', templateId }) => {
  const intl = useIntl()
  const [loading, setLoading] = useState<boolean>(false)

  // 下载模板
  const download = async () => {
    setLoading(true)
    const res = await downloadTemplate(templateId)
    setLoading(false)
    // if (data) {
    //   const fileUrl = `${data.pictureDomain}${data.fileUrl}`
    //   FileSaver.saveAs(fileUrl, `${title}${intl.formatMessage({ id: 'pages.table.model' })}`)
    // }
    if (res && res.size) {
      if (res.type === 'application/json') {
        // 如果接口报错,抛出错误
        const reader: any = new FileReader()
        reader.readAsText(res, 'utf-8')
        reader.onload = function () {
          const response = JSON.parse(reader.result)
          if (response && response.code === 401) {
            loginOut()
            notification.warning({
              key: 'error',
              message: response.responseMsg,
            })
            return
          }
          if (response && response.code !== 200) {
            notification.warning({
              key: 'error',
              message: response.responseMsg,
            })
            return
          }
        }
      } else {
        FileSaver.saveAs(res, `${title}${intl.formatMessage({ id: 'pages.table.model' })}`)
      }
      // FileSaver.saveAs(res, title)
    }
  }

  return (
    <Button type="link" loading={loading} onClick={download}>
      {intl.formatMessage({ id: 'pages.btn.down' })}
    </Button>
  )
}

export default DownloadFile
