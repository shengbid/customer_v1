import React, { useState, useEffect, useRef } from 'react'
import { Spin, message } from 'antd'
import { processDetail } from '@/services'
import type { getdetailProps } from '@/services/types'
import BpmnViewer from 'bpmn-js/lib/Viewer'
import styles from './index.less'

const ViewBpmn: React.FC<{ info: getdetailProps }> = ({ info }) => {
  const [spinLoading, setSpinLoading] = useState<boolean>(true)
  const [bpmnModler, setBpmnModler] = useState<any>(null)
  const bpmnRef = useRef<any>()

  // 设置节点颜色
  // const setNodeColor = (ids: any, newBpmn: any, colorClass: string) => {
  //   const elementRegistry = newBpmn.get('elementRegistry')

  //   ids.forEach((item: any) => {
  //     const element = elementRegistry._elements[item].gfx
  //     element.classList.add(colorClass)
  //     // console.log(elementRegistry, element)
  //   })
  // }

  const createDiagram = (xmlstr: string) => {
    bpmnModler && bpmnModler.destroy && bpmnModler.destroy()
    const newBpmn = new BpmnViewer({
      container: bpmnRef.current,
      height: '65vh',
    })
    const canvas = newBpmn.get('canvas')
    newBpmn.importXML(xmlstr, (err: string) => {
      if (err) {
        message.error(err)
      } else {
        canvas.zoom('fit-viewport', 'auto')
        // const successIds = ['startevent1', 'Flow_1f9e7ri']
        // const procesingIds = ['usertask9']
        // const undoneIds = ['Flow_18lp7ad', 'Gateway_0gffbux']
        // // console.log(1, newBpmn, canvas)

        // setNodeColor(successIds, newBpmn, 'nodeSuccess')
        // setNodeColor(procesingIds, newBpmn, 'nodeProcing')
        // setNodeColor(undoneIds, newBpmn, 'nodeError')
      }
    })
    setBpmnModler(newBpmn)
  }

  const getProcessDetail = async () => {
    const diagramXML = await processDetail(info)
    createDiagram(diagramXML)
    setSpinLoading(false)
  }

  useEffect(() => {
    getProcessDetail()
  }, [])

  return (
    <Spin spinning={spinLoading} tip="正在加载...">
      <div id="canvas" ref={bpmnRef} className={styles.canvas} />
    </Spin>
  )
}

export default ViewBpmn
