import { useImperativeHandle, forwardRef, useState, useEffect } from 'react'

const StepOne = ({}, ref: any) => {
  const [dataSource, setDataSource] = useState<any[]>([])

  useEffect(() => {
    setDataSource([])
  }, [])

  useImperativeHandle(ref, () => ({
    // 暴露给父组件的方法
    getBusinessData: async () => {
      try {
        const businessData = dataSource.map((item) => {
          return item.id
        })
        return {
          businessData: {
            cusAssoEnterpriseReqList: businessData,
          },
        }
      } catch (error) {
        return ''
      }
    },
  }))

  return <></>
}

export default forwardRef(StepOne)
