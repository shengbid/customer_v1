import React from 'react'
import { StatisticCard } from '@ant-design/pro-card'
import type { StatisticProps } from '@ant-design/pro-card'

export interface proCardProps {
  title: string
  statistic?: StatisticProps
  chart?: React.ReactNode
}

const bodyStyle = { padding: 12 }
const ComCard: React.FC<proCardProps> = ({ title, statistic, chart }) => {
  return <StatisticCard title={title} bodyStyle={bodyStyle} statistic={statistic} chart={chart} />
}

export default ComCard
