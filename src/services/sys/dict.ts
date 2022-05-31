import { request } from 'umi'
import type { dictParamProps, dictProps, dictKeyProps, dictkeyParamProps } from '@/services/types'
import { paramsToPageParams } from '@/utils/base'

const url = '/system/dict/type'
const keyUrl = '/system/dict/data'

/** 获取数据字典列表 */
export async function getDictList(params: dictParamProps) {
  return request<{ rows: dictProps[]; total: number }>(`${url}/list`, {
    params: paramsToPageParams(params),
  })
}
/** 获取数据字典下拉列表 */
export async function getDictSelect() {
  return request<{ data: dictProps[] }>(`${url}/optionselect`)
}

/** 新增编辑数据字典 */
export async function addDict(data: dictProps) {
  return request<{ data: any[] }>(`${url}`, {
    method: data.dictId ? 'put' : 'post',
    data,
  })
}
/** 删除数据字典 */
export async function deleteDict(id: number | string) {
  return request(`${url}/${id}`, {
    method: 'delete',
  })
}

/** 获取数据字典详情 */
export async function dictDetail(id: number) {
  return request<{ data: dictProps }>(`${url}/${id}`)
}

/** 获取数据字典键值列表 */
export async function getDictKeyList(params: dictkeyParamProps) {
  return request<{ rows: dictKeyProps[]; total: number }>(`${keyUrl}/list`, {
    params: paramsToPageParams(params),
  })
}

/** 新增编辑数据字典键值 */
export async function addDictKey(data: dictKeyProps) {
  return request<{ data: any[] }>(`${keyUrl}`, {
    method: data.dictCode ? 'put' : 'post',
    data,
  })
}
/** 删除数据字典键值 */
export async function deleteDictKey(id: number | string) {
  return request(`${keyUrl}/${id}`, {
    method: 'delete',
  })
}

/** 获取数据字典键值详情 */
export async function dictKeyDetail(id: number) {
  return request<{ data: dictKeyProps }>(`${keyUrl}/${id}`)
}
