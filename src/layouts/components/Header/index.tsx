import React from 'react'
import styles from './index.less'
import logo from '@/assets/home/logoname.png'
import RightContent from '@/components/RightContent'

const MyHeader: React.FC = () => {
  return (
    <div className={styles.headercontent}>
      <div className={styles.logo}>
        <a href="">
          <img className={styles.logoimg} src={logo} alt="" />
        </a>
      </div>
      <div>
        <RightContent />
      </div>
    </div>
  )
}

export default MyHeader
