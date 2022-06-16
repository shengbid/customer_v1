import React from 'react'
import style from './index.less'

interface labelProps {
  label: string
}

const RequiredLabel: React.FC<labelProps> = ({ label }) => {
  return <span className={style.label}>{label}</span>
}

export default RequiredLabel
