import React, { useEffect } from 'react'
import ComCard from '@/components/ComCard'
import * as echarts from 'echarts'

const Right1: React.FC = () => {
  const option = {
    xAxis: {
      type: 'value',
      // boundaryGap: [0, 0.01],
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      left: '2%',
      right: '3%',
      bottom: '3%',
      top: '3%',
      containLabel: true,
    },
    yAxis: {
      type: 'category',
      data: ['客户经理尽调', '合同签订', '分行审批', '分行复核', '总行审批', '放款'],
    },
    series: [
      {
        name: '2011',
        type: 'bar',
        barWidth: 20,
        data: [3, 4, 9, 14, 17, 23],
      },
    ],
  }

  const getData = (chart: any) => {
    chart.setOption(option)
  }

  useEffect(() => {
    const dom = document.getElementById('myChart5')
    if (dom) {
      const graph: any = echarts.init(dom)
      // setMyChart(graph)
      getData(graph)
    }
  }, [])

  return (
    <ComCard title="业务平均处理时间排名（单位:天）">
      <div style={{ height: 340 }} id="myChart5" />
    </ComCard>
  )
}

export default Right1
