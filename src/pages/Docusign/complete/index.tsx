import React, { useState, useEffect } from 'react'
import { Button, Result, Card, Space, Select } from 'antd'
import { history } from 'umi'
import { getEnvelopesByUser } from '@/services'
import moment from 'moment'
import { handleData } from '@/utils/base'
import FilePreview from '../components/filePreview'
import ExportFile from '@/components/ComUpload/exportFile'

const { Option } = Select
const CompletePage: React.FC = (props: any) => {
  const { event } = props.location.query

  const [envelopeList, setEnvelopeList] = useState<any>([])
  const [envelopeSignerList, setEnvelopeSignerList] = useState<any>([])
  const [fileVisible, setFileVisible] = useState<boolean>(false)
  const [envelopeInfo, setEnvelopeInfo] = useState<any>({})
  console.log(event)
  const signResult: any = {
    status: 'success',
    title: '签约成功!',
  }
  if (event && event.indexOf('complete') < 0) {
    signResult.status = 'warning'
    signResult.title = '签约未完成!'
  }

  const toBack = () => {
    history.push('/sign')
  }

  // 获取客户已签约列表
  const getList = async () => {
    const { data } = await getEnvelopesByUser({
      // userId: '1a95540f-4f60-4e7e-a399-af0d91360846',
      // userName: 'ShouMei Lai',
      // email: 'lsm2022@163.com',
      // folderIds: 'awaiting_my_signature,completed',
      folderIds: 'completed, waiting_for_others, awaiting_my_signature',
      fromDate: moment().subtract(30, 'days').format(),
    })
    console.log(data)
    setEnvelopeList(data)
    setEnvelopeSignerList(
      data.filter((item: any) => {
        let arr: any = []
        if (item.recipients && item.recipients.signers) {
          arr = item.recipients.signers.filter((ss: any) => {
            return ss.email === 'lsm2022@163.com' && ss.status === 'completed'
          })
        }
        if (arr.length) {
          item.completedDateTime = arr[0].signedDateTime
        }
        return arr.length
      }),
    )
  }

  // 筛选签约人
  const changeSigner = (value: string) => {
    // console.log(value, envelopeList)
    setEnvelopeSignerList(
      envelopeList.filter((item: any) => {
        let arr: any = []
        if (item.recipients && item.recipients.signers) {
          arr = item.recipients.signers.filter((ss: any) => {
            return ss.email === value && ss.status === 'completed'
          })
        }
        if (arr.length) {
          item.completedDateTime = arr[0].signedDateTime
        }

        return arr.length
      }),
    )
  }

  useEffect(() => {
    getList()
  }, [])

  return (
    <>
      <Result
        status={signResult.status}
        title={signResult.title}
        extra={[
          <Button type="primary" key="console" onClick={toBack}>
            回到签约页面
          </Button>,
        ]}
      />
      <Card title="已签约列表" bordered={false} style={{ width: 750, marginTop: 30 }}>
        <p>
          客户已签约列表
          <span style={{ marginLeft: 20 }}>筛选签约人</span>
          <Select defaultValue="lsm2022@163.com" onChange={changeSigner}>
            <Option value="lsm2022@163.com">ShouMei Lai</Option>
            <Option value="441974767@qq.com">jixang</Option>
          </Select>
        </p>
        {envelopeSignerList.map((item: any) => (
          <p key={item.envelopeId}>
            <Space>
              <a>
                主题: {item.emailSubject}
                <span style={{ marginLeft: 10 }}>
                  签约时间: {handleData(item.completedDateTime)}
                </span>
              </a>
              <ExportFile
                url="/template/getEnvelopePdfs"
                params={{ envelopeId: item.envelopeId }}
                title=""
                authorword="monitor:operlog:query"
                all
                exportText="下载文件"
              />
              <Button
                type="primary"
                onClick={() => {
                  setFileVisible(true)
                  setEnvelopeInfo(item)
                }}
              >
                查看详情
              </Button>
            </Space>
          </p>
        ))}
      </Card>
      <FilePreview
        modalVisible={fileVisible}
        envelopeInfo={envelopeInfo}
        handleCancel={() => setFileVisible(false)}
      />
    </>
  )
}

export default CompletePage
