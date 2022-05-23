import React, { useEffect } from 'react'
import ComCard from '@/components/ComCard'
import * as echarts from 'echarts'

const Right2: React.FC = () => {
  const option = {
    title: {
      text: '总人数',
      subtext: '1200',
      left: '28%',
      top: '38%',
      textStyle: {
        fontSize: 14,
        color: '#aaa',
      },
      subtextStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
      },
    },
    tooltip: {
      trigger: 'item',
      label: {
        // show: false
      },
    },
    legend: {
      top: 'center',
      right: '5%',
      orient: 'vertical',
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['60%', '85%'],
        center: ['35%', '50%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          // position: 'center'
        },
        emphasis: {
          label: {
            show: false,
            fontSize: '40',
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
        ],
      },
    ],
  }

  const getData = (chart: any) => {
    chart.setOption(option)
  }

  useEffect(() => {
    const dom = document.getElementById('myChart6')
    if (dom) {
      const graph: any = echarts.init(dom)
      // setMyChart(graph)
      getData(graph)
    }
  }, [])

  return (
    <ComCard title="存量用户行为分析">
      <div style={{ height: 180 }} id="myChart6" />
    </ComCard>
  )
}

export default Right2
