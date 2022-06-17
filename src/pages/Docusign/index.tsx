import React, { useState, useEffect } from 'react'
import { Button, Card, List } from 'antd'
import { getUserInfo, getSignUrl, getPhoneSignUrl, getTemplateSignUrl2 } from '@/services'
import InfoModal from './components/detailModal'
import FileModal from './components/fileModal'

const Docusign: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [fileVisible, setFileVisible] = useState<boolean>(false)
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [confirmLoading2, setConfirmLoading2] = useState<boolean>(false)
  const [signType, setSignType] = useState<number>(1)
  const [templateList, setTemplateList] = useState<any>([])
  const [templateInfo, setTemplateInfo] = useState<any>({})

  // 获取登录信息
  const getInfo = async () => {
    const response = await getUserInfo()
    if (response.status === 210) {
      console.log('Consent URL: ' + response.data)
      window.location = response.data
    }
  }

  useEffect(() => {
    getInfo()
  }, [])

  // 发送签约
  const sendSign = (values: any) => {
    console.log(values)
    setFileVisible(false)
    setTemplateList(values.templateInfo)
  }

  // 签约
  const submit = async (values: any) => {
    console.log(values)
    setModalVisible(false)
    if (signType === 1) {
      setConfirmLoading(true)
      const response = await getSignUrl(values)

      if (response.status === 200) {
        window.location = response.data
      }
      setConfirmLoading(false)
    } else if (signType === 2) {
      setConfirmLoading2(true)
      const response = await getPhoneSignUrl(values)

      if (response.status === 200) {
        window.location = response.data
      }
      setConfirmLoading2(false)
    } else {
      setConfirmLoading(true)
      // const response = await getTemplateSignUrl(values)
      const response = await getTemplateSignUrl2(values)
      // console.log(response)
      if (response.status === 200) {
        window.location = response.data
      }
      setConfirmLoading(false)
    }
  }
  return (
    <div style={{ padding: '50px 100px', background: '#e9ebec' }}>
      <Card title="发起签约" bordered={false} style={{ width: 350 }}>
        <p>点击发起签约</p>
        <Button
          type="primary"
          onClick={() => {
            setFileVisible(true)
          }}
        >
          确定
        </Button>
      </Card>
      <Card title="待办列表" bordered={false} style={{ width: 550 }}>
        <List
          header={<div>客户待签约列表</div>}
          bordered
          dataSource={templateList}
          renderItem={(item: any) => (
            <List.Item>
              <a>您有一份待签署的{item.name}文件</a>
              <Button
                loading={confirmLoading}
                onClick={() => {
                  setTemplateInfo(item)
                  setSignType(3)
                  setModalVisible(true)
                }}
              >
                立即签署
              </Button>
            </List.Item>
          )}
        />
      </Card>
      <Card title="确定签约" bordered={false} style={{ width: 400, marginTop: 30 }}>
        <p>点击进行签约</p>
        <Button
          type="primary"
          loading={confirmLoading}
          style={{ marginRight: 20 }}
          onClick={() => {
            setSignType(3)
            setModalVisible(true)
          }}
        >
          确定(根据选择模板签约)
        </Button>
        <Button
          type="primary"
          loading={confirmLoading}
          onClick={() => {
            setSignType(1)
            setModalVisible(true)
          }}
        >
          确定
        </Button>
      </Card>
      <Card title="确定签约(短信验证)" bordered={false} style={{ width: 350, marginTop: 30 }}>
        <p>点击进行签约</p>
        <Button
          type="primary"
          loading={confirmLoading2}
          onClick={() => {
            setSignType(2)
            setModalVisible(true)
          }}
        >
          确定
        </Button>
      </Card>
      <InfoModal
        modalVisible={modalVisible}
        handleSubmit={submit}
        templateInfo={templateInfo}
        signType={signType}
        handleCancel={() => setModalVisible(false)}
      />
      <FileModal
        modalVisible={fileVisible}
        handleSubmit={sendSign}
        handleCancel={() => setFileVisible(false)}
      />
    </div>
  )
}

export default Docusign
