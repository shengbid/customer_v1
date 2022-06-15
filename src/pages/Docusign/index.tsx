import React, { useState, useEffect } from 'react'
import { Button, Card } from 'antd'
import InfoModal from './components/detailModal'
import { getUserInfo, getSignUrl, getPhoneSignUrl } from '@/services'

const Docusign: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [confirmLoading2, setConfirmLoading2] = useState<boolean>(false)
  const [signType, setSignType] = useState<number>(1)

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

  const submit = async (values: any) => {
    console.log(values)
    setModalVisible(false)
    if (signType === 1) {
      setConfirmLoading(true)
      const response = await getSignUrl(values)
      console.log(response)
      if (response.status === 200) {
        window.location = response.data
      }
      setConfirmLoading(false)
    } else {
      setConfirmLoading2(true)
      const response = await getPhoneSignUrl(values)
      console.log(response)
      if (response.status === 200) {
        window.location = response.data
      }
      setConfirmLoading2(false)
    }
  }
  return (
    <div style={{ padding: '50px 100px', background: '#e9ebec' }}>
      <Card title="确定签约" bordered={false} style={{ width: 350 }}>
        <p>点击进行签约</p>
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
        signType={signType}
        handleCancel={() => setModalVisible(false)}
      />
    </div>
  )
}

export default Docusign
