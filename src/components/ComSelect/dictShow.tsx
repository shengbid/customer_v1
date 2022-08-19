import React, { useEffect, useState } from 'react'
import type { dictListProps } from '@/services/types'
import { getDictSelectList } from '@/services'
import { isArray } from 'lodash'

interface dictprops {
  dictValue: string | number | string[]
  dictkey?: string
  dictData?: dictListProps[] // 如果多次用到同一个数据字典,传入数据,避免重复调用接口
}

// 数据字典详情回显
const DictShow: React.FC<dictprops> = ({ dictValue, dictkey, dictData }) => {
  const [word, setWord] = useState<string>('-')

  // 获取数据
  const getData = async () => {
    const { data } = await getDictSelectList(dictkey || '')
    if (data) {
      let arr: any = dictValue
      if (!isArray(dictValue)) {
        arr = [dictValue]
      }
      let text = ''
      data.some((item) => {
        if (arr.includes(item.dictValue)) {
          if (text) {
            text += ', '
          }
          text += item.dictLabel
        }
      })
      setWord(text)
    }
  }

  useEffect(() => {
    if (dictValue) {
      console.log(dictValue, dictData)
      if (dictData) {
        let arr: any = dictValue
        if (!isArray(dictValue)) {
          arr = [dictValue]
        }
        let text = ''
        dictData.some((item) => {
          if (arr.includes(item.dictValue)) {
            if (text) {
              text += ', '
            }
            text += item.dictLabel
          }
        })
        setWord(text)
      } else {
        getData()
      }
    }
  }, [dictData, dictValue])

  return <>{word}</>
}

export default DictShow
