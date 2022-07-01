import React, { useState, useRef, useEffect } from 'react'
import { notification, Spin, Tabs, message, Modal, Form } from 'antd'
import FullModal from '../FullModal'
// Bpmn 相关文件
// 这里引入的是右侧属性栏这个框
import propertiesPanelModule from 'bpmn-js-properties-panel'
// 引入左侧factiviti的节点文件
import flowableModdle from '../static/flowModel/activiti.json'
// 而这个引入的是右侧属性栏里的内容
import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda'
import EditingTools from './BpmnEditor/EditingTools'
import BpmnModeler from './BpmnEditor/CustomModeler'
// import BpmnModeler from './BpmnEditor/Modeler'
import CustomTranslate from './BpmnEditor/CustomModeler/CustomTranslate/customTranslate'
import getDefaultXml from './BpmnEditor/sources/xml' // 初始文件
import styles from './index.less'
import lintModule from 'bpmn-js-bpmnlint'
// import fileDrop from 'file-drops'
import * as bpmnlintConfig from './packed-config' // 流程检查
// 引入右侧表单
import PropertyPanel from '../propertyPanel'
import SourceXml from './BpmnEditor/SourceXml'
import { addProcess, processDetail } from '@/services'
import DictSelect from '@/components/ComSelect'
import type { getdetailProps } from '@/services/types'

// 以下为bpmn工作流绘图工具的样式
import 'bpmn-js/dist/assets/diagram-js.css' // 左边工具栏以及编辑节点的样式
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'
import 'bpmn-js-bpmnlint/dist/assets/css/bpmn-js-bpmnlint.css'

const customTranslate = {
  translate: ['value', CustomTranslate],
}
const { TabPane } = Tabs

const ProcessDesign: React.FC<{ query: getdetailProps }> = ({ query }) => {
  const [scale, setScale] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(false)
  const [svgVisible, setSvgVisible] = useState<boolean>(false)
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [svgSrc, setSvgSrc] = useState<string>('')
  const [bpmnModeler, setBpmnModeler] = useState<any>(null)
  const [bpmXml, setXml] = useState<any>()
  const [modalForm] = Form.useForm()
  const modelerRef = useRef<any>()

  // 流程校验使用
  // const setUrlParam = (name: string, value: any) => {
  //   const url = new URL(window.location.href)

  //   if (value) {
  //     url.searchParams.set(name, '1')
  //   } else {
  //     url.searchParams.delete(name)
  //   }

  //   window.history.replaceState({}, '', url.href)
  // }
  // 流程校验使用
  // const getUrlParam = (name: string) => {
  //   const url = new URL(window.location.href)

  //   return url.searchParams.has(name)
  // }

  // 渲染 xml 格式
  const renderDiagram = (xml: any, bpmnModelers = bpmnModeler) => {
    bpmnModelers.importXML(xml, (err: string) => {
      if (err) {
        console.log(err)
        console.log(xml)
        notification.error({
          message: '提示',
          description: '导入失败',
        })
      }
    })
  }

  // 获取流程详情
  const getDetail = async (bpmnModelers: any) => {
    const diagramXML = await processDetail(query)
    // console.log(1, diagramXML)
    renderDiagram(diagramXML, bpmnModelers)
  }

  useEffect(() => {
    const bpmnModelers: any = new (BpmnModeler as any)({
      container: modelerRef.current,
      keyboard: { bindTo: document },
      // propertiesPanel: {
      //   parent: '#properties-panel',
      // },
      linting: {
        bpmnlint: bpmnlintConfig,
        // active: getUrlParam('linting'),
        active: true,
      },
      additionalModules: [
        propertiesPanelModule,
        propertiesProviderModule,
        lintModule,
        customTranslate,
      ],
      moddleExtensions: {
        activiti: flowableModdle,
      },
      height: '100%',
      width: '100%',
    })
    setBpmnModeler(bpmnModelers)
    if (query.deploymentId) {
      getDetail(bpmnModelers)
    } else {
      const diagramXML = getDefaultXml()
      renderDiagram(diagramXML, bpmnModelers)
    }

    // bpmnModelers.on('linting.toggle', function (event: any) {
    //   const active = event.active
    //   setUrlParam('linting', active)
    // })
    // const dndHandler = fileDrop('Drop BPMN Diagram here.', function (files) {
    //   this.bpmnModeler.importXML(files[0].contents)
    // })
    // document.querySelector('body').addEventListener('dragover', dndHandler)

    window.bpmnModeler = bpmnModelers

    // 删除 bpmn logo  bpmn.io官方要求不给删或者隐藏，否则侵权
    const bjsIoLogo = document.querySelector('.bjs-powered-by')
    while (bjsIoLogo?.firstChild) {
      bjsIoLogo.removeChild(bjsIoLogo.firstChild)
    }
  }, [])

  // 导入 xml 文件
  const handleOpenFile = (e: any) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0]
      const reader = new FileReader()
      let data: any = ''
      reader.readAsText(file)
      reader.onload = function (event: any) {
        data = event.target.result
        renderDiagram(data)
      }
    }
  }

  // 保存
  const handleSave = async () => {
    // bpmnModeler.saveSVG({ format: true }, (err: any, data: any) => {
    //   console.log(data)
    //   svgXml = data
    // })
    const issues = bpmnModeler.get('linting')._issues
    let errorNum: number = 0
    let warningNum: number = 0

    console.log(issues, Object.getOwnPropertyNames(issues))
    let issuesArr: any[] = []
    if (Object.getOwnPropertyNames(issues).length > 0) {
      issuesArr = Object.getOwnPropertyNames(issues).filter((item) => item !== '_')
    }
    if (issuesArr.length > 0) {
      issuesArr.forEach((key) => {
        issues[key].forEach((issuesItem: any) => {
          if (issuesItem.category === 'error') {
            errorNum += 1
          } else if (issuesItem.category === 'warn') {
            warningNum += 1
          }
        })
      })
    }
    if (errorNum > 0) {
      message.error('该流程图存在错误节点，请检查流程图！')
      return
    }
    if (warningNum > 0) {
      message.error(`存在${warningNum}个警告`)
    }
    setIsModalVisible(true)
  }

  // 部署流程
  const deployBpmn = async () => {
    setLoading(true)
    let bpmnXml = ''
    // let svgXml = ''
    bpmnModeler.saveXML({ format: true }, (err: any, xml: any) => {
      bpmnXml = xml
    })
    const formData = new FormData()
    formData.append('stringBPMN', bpmnXml)
    console.log(bpmnXml)
    setLoading(false)
    await addProcess(formData)
    message.success('部署成功!')
    setIsModalVisible(false)
  }

  // 切换tab
  const handleTabClick = (key: string) => {
    if (key === '2') {
      bpmnModeler.saveXML({ format: true }, (err: any, xml: any) => {
        if (!err) {
          setXml(xml)
        }
      })
    }
  }

  // 前进
  const handleRedo = () => {
    bpmnModeler.get('commandStack').redo()
  }

  // 后退
  const handleUndo = () => {
    bpmnModeler.get('commandStack').undo()
  }

  /**
   * 下载xml/svg
   *  @param  type  类型  svg / xml
   *  @param  data  数据
   *  @param  name  文件名称
   */
  const download = (type: string, data: any, na?: string) => {
    let dataTrack = ''
    const a = document.createElement('a')

    switch (type) {
      case 'xml':
        dataTrack = 'bpmn'
        break
      case 'svg':
        dataTrack = 'svg'
        break
      default:
        break
    }

    const name = na || `diagram.${dataTrack}`

    a.setAttribute('href', `data:application/bpmn20-xmlcharset=UTF-8,${encodeURIComponent(data)}`)
    a.setAttribute('target', '_blank')
    a.setAttribute('dataTrack', `diagram:download-${dataTrack}`)
    a.setAttribute('download', name)

    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  // 下载 流程图片
  // const handleDownloadSvg = () => {
  //   bpmnModeler.saveSVG({ format: true }, (err: any, data: any) => {
  //     download('svg', data)
  //   })
  // }

  // 下载 XML 格式
  const handleDownloadXml = () => {
    bpmnModeler.saveXML({ format: true }, (err: any, data: any) => {
      download('xml', data, `${bpmnModeler.getDefinitions().rootElements[0].name}.bpmn`)
    })
  }

  // 流程图放大缩小
  const handleZoom = (radio?: any) => {
    const newScale = !radio
      ? 1.0 // 不输入radio则还原
      : scale + radio <= 0.2 // 最小缩小倍数
      ? 0.2
      : scale + radio

    bpmnModeler.get('canvas').zoom(newScale)
    setScale(newScale)
  }

  // 预览图片
  const handlePreview = () => {
    bpmnModeler.saveSVG({ format: true }, (err: any, data: any) => {
      setSvgSrc(data)
      setSvgVisible(true)
    })
  }

  // 预览XML
  // handlePreviewXml = () => {
  //   this.bpmnModeler.saveXML({ format: true }, (err, data) => {
  //     console.log(data)
  //   })
  // }

  // 关闭流程图弹窗
  const handleCancel = () => {
    setSvgSrc('')
    setSvgVisible(false)
  }

  return (
    <div>
      <Spin tip="正在部署..." spinning={loading}>
        <Tabs type="card" onChange={handleTabClick}>
          <TabPane tab="流程设计器" key="1">
            <div className={styles.container} id="js-drop-zone">
              <div className={styles.canvas} id="canvas" ref={modelerRef} />
              <div className={styles.panel}>
                <PropertyPanel bpmnModeler={bpmnModeler} />
              </div>
              <EditingTools
                onOpenFIle={handleOpenFile}
                onSave={handleSave}
                onUndo={handleUndo}
                onRedo={handleRedo}
                // onDownloadSvg={handleDownloadSvg}
                onDownloadXml={handleDownloadXml}
                onZoomIn={() => handleZoom(0.1)}
                onZoomOut={() => handleZoom(-0.1)}
                onZoomReset={() => handleZoom()}
                onPreview={handlePreview}
                // onPreviewXml={handlePreviewXml}
              />
            </div>
          </TabPane>
          <TabPane tab="Source Xml" key="2">
            <SourceXml data={bpmXml} />
          </TabPane>
        </Tabs>
      </Spin>

      {/* 查看流程图弹窗 */}
      {svgVisible && (
        <FullModal visible={svgVisible} onCancel={handleCancel}>
          <div
            dangerouslySetInnerHTML={{
              __html: svgSrc,
            }}
          />
        </FullModal>
      )}

      <Modal
        title={`选择流程类型`}
        visible={isModalVisible}
        okText="确定"
        cancelText="取消"
        onOk={() => {
          deployBpmn()
        }}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form layout="vertical" form={modalForm}>
          <Form.Item label="流程类型" name="category">
            <DictSelect authorword="process_type" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default ProcessDesign
