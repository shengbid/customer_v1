import React from 'react'
import styles from './index.less'

interface infoProps {
  title: any
}

const CardTilte: React.FC<infoProps> = ({ title }) => {
  return (
    <div className={styles.header}>
      <div className={styles.title}>{title}</div>
    </div>
  )
}

export default CardTilte
