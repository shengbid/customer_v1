import React, { useEffect } from 'react'
import ComCard from '@/components/ComCard'
import * as echarts from 'echarts'

const Middle2: React.FC = () => {
  const option = {
    legend: {
      top: 'bottom',
    },
    tooltip: {},
    series: [
      {
        name: 'Nightingale Chart',
        type: 'pie',
        radius: [0, 90],
        center: ['50%', '50%'],
        roseType: 'radius',
        label: {
          formatter: '{b}:  {d}%',
        },
        labelLine: {
          length: 2,
        },
        itemStyle: {
          borderRadius: 0,
        },
        data: [
          { value: 40, name: 'rose 1' },
          { value: 38, name: 'rose 2' },
          { value: 32, name: 'rose 3' },
          { value: 30, name: 'rose 4' },
          { value: 28, name: 'rose 5' },
          { value: 26, name: 'rose 6' },
          { value: 22, name: 'rose 7' },
        ],
      },
    ],
  }

  const getData = (chart: any) => {
    chart.setOption(option)
  }

  useEffect(() => {
    const dom = document.getElementById('myChart2')
    if (dom) {
      const graph: any = echarts.init(dom)
      // setMyChart(graph)
      getData(graph)
    }
  }, [])
  return (
    <ComCard title="放款笔数业务类型分布（单位:笔）">
      <div style={{ height: 340 }} id="myChart2" />
    </ComCard>
  )
}

export default Middle2
