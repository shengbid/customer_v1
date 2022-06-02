import { Descriptions } from 'antd'
import type { DescriptionsProps } from 'antd'

ComDescriptions.DescriptionsItem = Descriptions.Item
export default function ComDescriptions(props: DescriptionsProps) {
  return (
    <Descriptions {...props} labelStyle={{ fontWeight: 'bold' }}>
      {props.children}
    </Descriptions>
  )
}
