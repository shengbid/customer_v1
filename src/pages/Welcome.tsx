import React from 'react'
import styles from './Welcome.less'

const Welcome: React.FC = () => {
  return (
    <div className={styles.welcome}>
      <div className={styles.item}>1</div>
      <div className={styles.item}>2</div>
      <div className={styles.item}>3</div>
      <div className={styles.item}>4</div>
      <div className={styles.item}>5</div>
    </div>
  )
}

export default Welcome
