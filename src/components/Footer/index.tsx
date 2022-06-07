import { DefaultFooter } from '@ant-design/pro-layout'
import { useIntl } from 'umi'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()
  const intl = useIntl()

  return (
    <DefaultFooter
      copyright={`copyright@${currentYear} ${intl.formatMessage({
        id: 'component.footer.copyright',
      })}`}
      links={[]}
    />
  )
}

export default Footer
