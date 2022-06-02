import React, { useEffect } from 'react'
import { EllipsisOutlined } from '@ant-design/icons'
import ComCard from '@/components/ComPage'
import * as echarts from 'echarts'

const Middle1: React.FC = () => {
  // const [myChart, setMyChart] = useState(null)
  const option = {
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      right: '10%',
      data: ['新增用户', '流失用户'],
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
        name: '户',
        nameTextStyle: {
          align: 'right',
          padding: [0, 4, 0, 0],
        },
      },
    ],
    series: [
      {
        name: '新增用户',
        type: 'bar',
        data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
      },
      {
        name: '流失用户',
        type: 'bar',
        data: [1.0, 1.2, 1.3, 1.5, 3.3, 5.2, 10.3, 20.4, 20.0, 18.5, 16.0, 16.2],
      },
      // {
      //   name: '借呗',
      //   type: 'line',
      //   yAxisIndex: 1,
      //   data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2],
      // },
      // {
      //   name: '花呗',
      //   type: 'line',
      //   yAxisIndex: 1,
      //   data: [1.0, 1.2, 1.3, 1.5, 3.3, 5.2, 10.3, 20.4, 20.0, 18.5, 16.0, 16.2],
      // },
    ],
  }

  const getData = (chart: any) => {
    chart.setOption(option)
  }

  useEffect(() => {
    const dom = document.getElementById('myChart4')
    if (dom) {
      const graph: any = echarts.init(dom)
      // setMyChart(graph)
      getData(graph)
    }
  }, [])

  return (
    <ComCard title="新增用户与流失用户趋势" extra={<EllipsisOutlined />}>
      <div style={{ height: 340 }} id="myChart4" />
    </ComCard>
  )
}

export default Middle1
