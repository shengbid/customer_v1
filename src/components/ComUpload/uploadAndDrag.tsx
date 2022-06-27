import React, { useState } from 'react'
import { InboxOutlined } from '@ant-design/icons'
import { Upload } from 'antd'
const { Dragger } = Upload

interface dropProps {
  onChange: (value: any) => void
}

const UploadAndDrop: React.FC<dropProps> = ({ onChange }) => {
  const [upFile, setFile] = useState<any>([])
  const props = {
    name: 'file',
    multiple: false,
    maxCount: 1,
    beforeUpload: (file: any) => {
      setFile([file])
      onChange([file])
      return false
    },
    fileList: upFile,
  }

  return (
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">点击上传或拖拽文件上传</p>
      <p className="ant-upload-hint">请选择流程文件，仅支持bpmn20.xml、bpmn格式文件</p>
    </Dragger>
  )
}

export default UploadAndDrop
