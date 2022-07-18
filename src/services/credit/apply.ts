import { request } from 'umi'

const Url = '/cus/credit'

/** 新增第一步 */
export async function addCreditOne(data: any) {
  return request<{ data: any[] }>(`${Url}/add`, {
    method: 'post',
    data,
  })
}
/** 新增第二步 */
export async function addCreditTwo(data: any) {
  return request<{ data: any[] }>(`${Url}/add/operate`, {
    method: 'post',
    data,
  })
}
/** 新增第三步 */
export async function addCreditThree(data: any) {
  return request<{ data: any[] }>(`${Url}/add/personInfo`, {
    method: 'post',
    data,
  })
}
// 获取详情
export async function getCreditDetail() {
  return request<{ data: any }>(`${Url}/get/details`)
}
