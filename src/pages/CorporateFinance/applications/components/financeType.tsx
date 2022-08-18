import React from 'react'
import { Modal, Button } from 'antd'
import styles from './finance.less'

interface infoProps {
  modalVisible: boolean
  handleCancel: (val?: number) => void
}

const FinanceType: React.FC<infoProps> = ({ modalVisible, handleCancel }) => {
  return (
    <Modal
      title="请选择用款方式"
      maskClosable={false}
      destroyOnClose
      width={800}
      visible={modalVisible}
      footer={null}
      onCancel={() => handleCancel()}
    >
      <div className={styles.box}>
        <div className={styles.item}>
          <div className={styles.title}>在途质押融资</div>
          <div className={styles.text}>
            货物已提货，在途货物质押融资，池融易所有在途质押物后面需在电商合作保税仓交货
          </div>
          <Button className={styles.btn} type="primary" onClick={() => handleCancel(2)}>
            去申请
          </Button>
        </div>
        <div className={styles.item}>
          <div className={styles.title}>在仓质押融资</div>
          <div className={styles.text}>
            货物已在仓，在仓货物质押融资，池融易所有质押物需为电商合作保税仓货物
          </div>
          <Button className={styles.btn} type="primary" onClick={() => handleCancel(3)}>
            去申请
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default FinanceType
