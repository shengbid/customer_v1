import { useIntl } from 'umi'
import styles from './index.less'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()
  const intl = useIntl()

  return (
    <div className={styles.footer}>
      <div className={styles.main}>
        <div className={styles.copyright}>
          copyright@{currentYear}
          {intl.formatMessage({
            id: 'component.footer.copyright',
          })}
        </div>
      </div>
    </div>
  )
}

export default Footer
