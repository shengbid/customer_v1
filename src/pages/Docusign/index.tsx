import React, { useState, useEffect } from 'react'
import { Button, Card } from 'antd'
import {
  getUserInfo,
  getSignUrl,
  getPhoneSignUrl,
  createEnvelopeByTemplate,
  getViewByEnvelope,
} from '@/services'
import InfoModal from './components/detailModal'
import FileModal from './components/fileModal'

const Docusign: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [fileVisible, setFileVisible] = useState<boolean>(false)
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [confirmLoading2, setConfirmLoading2] = useState<boolean>(false)
  const [signType, setSignType] = useState<number>(1)
  const [templateList, setTemplateList] = useState<any>([
    {
      envelopeId: '9ac97ea6-c0c1-4457-9512-0f19bbe9fb22',
      signerEmail: 'lsm2022@163.com',
      signerName: 'ShouMei Lai',
      roleName: 'partyA',
      countryCode: '+86',
      phoneNumber: '18033098150',
      recipientId: '21990853',
      signerClientId: '1a95540f-4f60-4e7e-a399-af0d91360846',
    },
    {
      envelopeId: '9ac97ea6-c0c1-4457-9512-0f19bbe9fb22',
      signerEmail: '441974767@qq.com',
      signerName: 'jixiang',
      roleName: 'partyB',
      countryCode: '+86',
      phoneNumber: '18649851492',
      recipientId: '56569690',
      signerClientId: 'ba12c6a2-156c-4951-90a9-40ce39c4b021',
    },
  ])
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
  const sendSign = async (values: any) => {
    console.log(values)
    setFileVisible(false)

    const { data } = await createEnvelopeByTemplate({
      templateId: values.value,
      signers: values.signerList,
    })
    setTemplateList(
      values.signerList.map((item: any) => {
        return {
          ...item,
          name: values.label,
          templateId: values.value,
          envelopeId: data,
        }
      }),
    )
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
      console.log(response)
      // if (response.status === 200) {
      //   window.location = response.data
      // }
      setConfirmLoading2(false)
    } else if (signType === 3) {
      setConfirmLoading(true)
      // const response = await getTemplateSignUrl(values)
      const response = await getViewByEnvelope(values)
      // console.log(response)
      if (response.status === 200) {
        window.location = response.data
      }
      setTimeout(() => {
        setConfirmLoading(false)
      }, 500)
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
      <Card title="待办列表" bordered={false} style={{ width: 550, marginTop: 30 }}>
        <p>客户待签约列表</p>
        {templateList.map((item: any) => (
          <p key={item.userId}>
            <a>
              {item.roleName}有一份待签署的{item.name}文件
            </a>
            <Button
              loading={confirmLoading}
              style={{ marginLeft: 10 }}
              type="primary"
              onClick={() => {
                setTemplateInfo(item)
                setSignType(3)
                setModalVisible(true)
              }}
            >
              立即签署
            </Button>
          </p>
        ))}
      </Card>
      {/* <Card title="确定签约" bordered={false} style={{ width: 400, marginTop: 30 }}>
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
      </Card> */}
      <Card title="测试确定签约(短信验证)" bordered={false} style={{ width: 350, marginTop: 30 }}>
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
