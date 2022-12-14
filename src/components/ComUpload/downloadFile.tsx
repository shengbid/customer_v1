import React, { useState } from 'react'
import { Button, notification } from 'antd'
import { downFile } from '@/services'
import { loginOut } from '@/utils/base'
import FileSaver from 'file-saver'
import { useIntl } from 'umi'

export interface exportProps {
  params: any
  url?: string
  title?: string
  style?: any
  btnTitle?: any
}

// 下载模板
const DownloadFile: React.FC<exportProps> = ({
  params,
  style,
  url = '/file/download',
  btnTitle,
}) => {
  const intl = useIntl()
  const [loading, setLoading] = useState<boolean>(false)

  // 下载模板
  const download = async () => {
    setLoading(true)
    const res = await downFile(url, params)
    setLoading(false)
    // console.log(res)
    const file = res.response.headers.get('content-disposition')
    const fileName = decodeURI(file?.split('attachment;filename=')[1] || '')
    if (res.data && res.data.size) {
      if (res.data.type === 'application/json') {
        // 如果接口报错,抛出错误
        const reader: any = new FileReader()
        reader.readAsText(res.data, 'utf-8')
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
        FileSaver.saveAs(res.data, fileName)
      }
      // FileSaver.saveAs(res, title)
    }
  }

  return (
    <Button type="link" style={style} loading={loading} onClick={download}>
      {btnTitle ? btnTitle : intl.formatMessage({ id: 'pages.btn.down' })}
    </Button>
  )
}

export default DownloadFile
