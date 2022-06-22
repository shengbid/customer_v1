import React, { useState, useEffect } from 'react'
import { Modal, Spin, Image } from 'antd'
import { getEnvelopeDocuments, getEnvelopeDocumentImages } from '@/services'

interface modalPrps {
  modalVisible: boolean
  handleCancel: () => void
  envelopeInfo: any
}
const FilePreview: React.FC<modalPrps> = ({ modalVisible, handleCancel, envelopeInfo }) => {
  const [documents, setDocuments] = useState<any[]>([])
  const [fileList, setFileList] = useState<any[]>([])
  const [spinning, setSpinning] = useState<boolean>(false)
  const [spinning2, setSpinning2] = useState<boolean>(false)
  const [fileModal, setFileModal] = useState<boolean>(false)
  const [iamgeTilte, setIamgeTilte] = useState<string>('')

  // 获取信封文档
  const getDocuments = async () => {
    setSpinning(true)
    const { data } = await getEnvelopeDocuments({ envelopeId: envelopeInfo.envelopeId })

    setSpinning(false)
    console.log(data)
    setDocuments(data.filter((item: any) => item.name !== 'Summary'))
  }

  useEffect(() => {
    if (envelopeInfo && envelopeInfo.envelopeId) {
      getDocuments()
    }
  }, [envelopeInfo.envelopeId])

  // 获取文件图片
  const getImage = async (documentId: string, pages: any[]) => {
    setSpinning2(true)
    const arr: string[] = []
    for (const item of pages) {
      const { data } = await getEnvelopeDocumentImages({
        envelopeId: envelopeInfo.envelopeId,
        documentId,
        pageNumber: item.sequence,
      })
      arr.push(`data:image/png;base64, ${data}`)
    }
    setFileList(arr)
    setSpinning2(false)
  }

  return (
    <Modal
      title={`${envelopeInfo.emailSubject}`}
      maskClosable={false}
      destroyOnClose
      width={800}
      visible={modalVisible}
      bodyStyle={{ minHeight: 280 }}
      footer={false}
      onCancel={handleCancel}
    >
      <Spin spinning={spinning}>
        {documents.map((item: any) => (
          <p key={item.documentId}>
            <a
              onClick={() => {
                getImage(item.documentId, item.pages)
                setIamgeTilte(item.name)
                setFileModal(true)
              }}
            >
              {item.name}
            </a>
          </p>
        ))}
        <Modal
          title={`${iamgeTilte}`}
          maskClosable={false}
          destroyOnClose
          width={800}
          visible={fileModal}
          footer={false}
          bodyStyle={{ minHeight: 280 }}
          onCancel={() => {
            setFileModal(false)
          }}
        >
          <Spin spinning={spinning2}>
            <Image.PreviewGroup>
              {fileList.map((ss: string) => (
                <Image key={Math.random() * 100} width={200} src={ss} />
              ))}
            </Image.PreviewGroup>
          </Spin>
        </Modal>
      </Spin>
    </Modal>
  )
}

export default FilePreview
