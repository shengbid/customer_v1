import React, { useEffect } from 'react'
import ComCard from '@/components/ComPage'
import * as echarts from 'echarts'

const Middle3: React.FC = () => {
  const option = {
    legend: {
      data: ['Allocated', 'Spending', 'Actual'],
      bottom: 20,
    },
    tooltip: {},
    radar: {
      startAngle: 60,
      center: ['50%', '40%'],
      radius: '70%',
      nameGap: 1,
      indicator: [
        { name: 'Sales', max: 6500 },
        { name: 'Administration', max: 16000 },
        { name: 'Information Technology', max: 30000 },
        { name: 'Customer Support', max: 38000 },
        { name: 'Development', max: 52000 },
        { name: 'Marketing', max: 25000 },
      ],
    },
    series: [
      {
        name: 'Budget vs spending',
        type: 'radar',
        data: [
          {
            value: [4200, 3000, 20000, 35000, 50000, 18000],
            name: 'Allocated',
          },
          {
            value: [5000, 14000, 28000, 26000, 42000, 21000],
            name: 'Spending',
          },
          {
            value: [2000, 14000, 28000, 16000, 12000, 11000],
            name: 'Actual',
          },
        ],
      },
    ],
  }

  const getData = (chart: any) => {
    chart.setOption(option)
  }

  useEffect(() => {
    const dom = document.getElementById('myChart3')
    if (dom) {
      const graph: any = echarts.init(dom)
      // setMyChart(graph)
      getData(graph)
    }
  }, [])

  return (
    <ComCard title="业务平均处理时间（单位:天）">
      <div style={{ height: 340 }} id="myChart3" />
    </ComCard>
  )
}

export default Middle3
