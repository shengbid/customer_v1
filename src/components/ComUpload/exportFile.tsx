import React from 'react'
import { VerticalAlignBottomOutlined } from '@ant-design/icons'
import { Button, notification } from 'antd'
import { downloadFile, exportFile } from '@/services'
import { loginOut } from '@/utils/base'
import FileSaver from 'file-saver'
import PermissionButton from '@/components/Permission'
import { useIntl } from 'umi'
export interface exportProps {
  title: string
  url: string
  authorword: string // 权限字符
  icon?: boolean
  params?: any
}

// 导出模板
const ExportFile: React.FC<exportProps> = ({ title, url, authorword, icon = true, params }) => {
  const intl = useIntl()

  // 下载模板
  const download = async () => {
    const res = icon ? await exportFile(url, params) : await downloadFile(url)
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
        FileSaver.saveAs(
          res,
          `${title}${
            icon
              ? intl.formatMessage({ id: 'pages.table.list' })
              : intl.formatMessage({ id: 'pages.table.model' })
          }`,
        )
      }
      // FileSaver.saveAs(res, title)
    }
  }
  if (icon) {
    return (
      <PermissionButton
        type="primary"
        authorword={authorword}
        icon={<VerticalAlignBottomOutlined />}
        onClick={download}
      >
        {intl.formatMessage({ id: 'pages.btn.export' })}
      </PermissionButton>
    )
  }
  return (
    <Button type="link" onClick={download}>
      {intl.formatMessage({ id: 'pages.btn.down' })}
    </Button>
  )
}

export default ExportFile
