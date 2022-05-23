import React, { useEffect } from 'react'
import { EllipsisOutlined } from '@ant-design/icons'
import ComCard from '@/components/ComCard'
import * as echarts from 'echarts'

const Middle1: React.FC = () => {
  // const [myChart, setMyChart] = useState(null)
  const option = {
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      right: '10%',
      data: ['花呗金额', '借呗金额', '花呗笔数', '借呗笔数'],
    },
    grid: {
      bottom: 30,
    },
    xAxis: [
      {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
        axisPointer: {
          type: 'shadow',
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        name: '金额',
        nameTextStyle: {
          align: 'right',
          padding: [0, 4, 0, 0],
        },
        min: 0,
        max: 250,
        interval: 50,
      },
      {
        type: 'value',
        name: '笔数',
        nameTextStyle: {
          align: 'left',
          padding: [0, 0, 0, 4],
        },
        min: 0,
        max: 25,
        interval: 5,
      },
    ],
    series: [
      {
        name: '借呗金额',
        type: 'bar',
        tooltip: {
          valueFormatter: (value: number) => {
            return value + ' 万元'
          },
        },
        data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
      },
      {
        name: '花呗金额',
        type: 'bar',
        tooltip: {
          valueFormatter: (value: number) => {
            return value + ' 万元'
          },
        },
        data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
      },
      {
        name: '借呗',
        type: 'line',
        yAxisIndex: 1,
        data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2],
      },
      {
        name: '花呗',
        type: 'line',
        yAxisIndex: 1,
        data: [1.0, 1.2, 1.3, 1.5, 3.3, 5.2, 10.3, 20.4, 20.0, 18.5, 16.0, 16.2],
      },
    ],
  }

  const getData = (chart: any) => {
    chart.setOption(option)
  }

  useEffect(() => {
    const dom = document.getElementById('myChart')
    if (dom) {
      const graph: any = echarts.init(dom)
      // setMyChart(graph)
      getData(graph)
    }
  }, [])

  return (
    <ComCard title="放款笔数与金额变化曲线" extra={<EllipsisOutlined />}>
      <div style={{ height: 340 }} id="myChart" />
    </ComCard>
  )
}

export default Middle1
