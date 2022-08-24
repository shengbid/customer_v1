import { useImperativeHandle, forwardRef, useState, useEffect } from 'react'
import { Form } from 'antd'
import LegalPerson from './legalPerson'
import RealPersonInfo from './realPersonInfo'
import MetalPersonInfo from './metaInfo'
import MainPrincipal from './principal'
import FinancePrincipal from './financePrincipal'
import { getCreditDetail } from '@/services'

const StepThree = ({}, ref: any) => {
  const [maritalStatus, setMaritalStatus] = useState<string>('ds') // 婚姻状态
  const [legalFlag, setLegalFlag] = useState<string>('yes') // 实控人是否为法人
  const [form] = Form.useForm()
  const [realform] = Form.useForm()
  const [marform] = Form.useForm()
  const [mainform] = Form.useForm()
  const [finaneform] = Form.useForm()
  const [id, setId] = useState<number>()
  const [infoData, setInfoData] = useState({
    qyfr: {},
    skr: {},
    skrpo: {},
    zyfzr: { phoneArea: '+86' },
    cwfzr: { phoneArea: '+86' },
  })

  // 获取详情
  const getDetail = async () => {
    const { data } = await getCreditDetail()
    if (data && data.id) {
      setId(data.id)
      if (data.ryList && data.ryList.skr) {
        const ryList = data.ryList
        setInfoData(ryList)
        if (ryList.qyfr) {
          setLegalFlag('no')
          // 如果有法人信息(实控人为法人,不展示法人信息)
          const qyfr = ryList.qyfr
          if (qyfr.backFileName) {
            qyfr.idReverse = [
              {
                fileName: qyfr.backFileName,
                fileUrl: qyfr.backFileUrl,
                pictureDomain: qyfr.pictureDomain,
              },
            ]
          }
          qyfr.idFront = [
            {
              fileName: qyfr.frontFileName,
              fileUrl: qyfr.frontFileUrl,
              pictureDomain: qyfr.pictureDomain,
            },
          ]
          form.setFieldsValue(qyfr)
        }
        // 实控人
        const skr = ryList.skr
        if (skr.backFileName) {
          skr.idReverse = [
            {
              fileName: skr.backFileName,
              fileUrl: skr.backFileUrl,
              pictureDomain: skr.pictureDomain,
            },
          ]
        }
        skr.idFront = [
          {
            fileName: skr.frontFileName,
            fileUrl: skr.frontFileUrl,
            pictureDomain: skr.pictureDomain,
          },
        ]
        skr.spouseCreditReport = JSON.parse(skr.spouseCreditReport)
        if (skr.houseLicense) {
          skr.houseLicense = JSON.parse(skr.houseLicense)
        }
        if (skr.driveLicense) {
          skr.driveLicense = JSON.parse(skr.driveLicense)
        }
        realform.setFieldsValue(skr)

        // 实控人配偶
        const skrpo = ryList.skrpo
        if (skrpo) {
          if (skrpo.backFileName) {
            skrpo.idReverse = [
              {
                fileName: skrpo.backFileName,
                fileUrl: skrpo.backFileUrl,
                pictureDomain: skrpo.pictureDomain,
              },
            ]
          }
          skrpo.idFront = [
            {
              fileName: skrpo.frontFileName,
              fileUrl: skrpo.frontFileUrl,
              pictureDomain: skrpo.pictureDomain,
            },
          ]
          skrpo.creditReport = JSON.parse(skrpo.creditReport)
          marform.setFieldsValue(skrpo)
        }
        mainform.setFieldsValue(ryList.zyfzr)
        finaneform.setFieldsValue(ryList.cwfzr)
      }
    }
  }

  useEffect(() => {
    getDetail()
  }, [])

  useImperativeHandle(ref, () => ({
    // getOneStepData 就是暴露给父组件的方法
    getStepData: () => {
      return { form, realform, marform, mainform, finaneform, id } // 将表格form实例导出
    },
  }))

  return (
    <>
      <Form
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ phoneArea: '+86', identity: 'skr' }}
        form={realform}
        autoComplete="off"
        scrollToFirstError
      >
        {/* 实控人信息 */}
        <RealPersonInfo
          info={infoData.skr}
          form={realform}
          changeLegalFlag={setLegalFlag}
          changeRealMarital={setMaritalStatus}
        />
      </Form>
      {legalFlag === 'no' ? (
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ phoneArea: '+86', identity: 'qyfr' }}
          form={form}
          autoComplete="off"
          scrollToFirstError
        >
          {/* 法人信息 */}
          <LegalPerson form={form} info={infoData.qyfr} />
        </Form>
      ) : null}
      <Form
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ phoneArea: '+86', identity: 'skrpo' }}
        form={marform}
        autoComplete="off"
        scrollToFirstError
      >
        {/* 实控人配偶信息 */}
        {maritalStatus === 'yh' && <MetalPersonInfo form={marform} info={infoData.skrpo} />}
      </Form>
      <Form
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ phoneArea: '+86', identity: 'zyfzr' }}
        form={mainform}
        autoComplete="off"
        scrollToFirstError
      >
        {/* 主要负责人信息 */}
        <MainPrincipal phoneType={infoData.zyfzr.phoneArea} />
      </Form>
      <Form
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ phoneArea: '+86', identity: 'cwfzr' }}
        form={finaneform}
        autoComplete="off"
        scrollToFirstError
      >
        {/* 财务负责人信息 */}
        <FinancePrincipal phoneType={infoData.zyfzr.phoneArea} />
      </Form>
    </>
  )
}

export default forwardRef(StepThree)
