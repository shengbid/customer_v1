import type { pageLimitProps } from './base'

// 菜单查询参数
export interface menuParamProps extends pageLimitProps {
  menuName?: string
  status?: string
}
// 用户管理列表查询参数
export interface userParamProps extends pageLimitProps {
  name?: string
  dept?: string
  phone?: string
  status?: string
  beginTime?: string
  endTime?: string
}
// 数据字典查询参数
export interface dictParamProps extends pageLimitProps {
  dictName?: string
  dictType?: string
  status?: string
  createTime?: string
}
// 角色查询参数
export interface roleParamProps extends pageLimitProps {
  roleName?: string
  roleKey?: string
  status?: string
  beginTime?: string
  endTime?: string
}
// 部门查询参数
export interface deptParamProps extends pageLimitProps {
  deptName?: string
  status?: string
}
// 岗位查询参数
export interface postParamProps extends pageLimitProps {
  postName?: string
  postCode?: string
  status?: string
}
// 数据字典子集查询参数
export interface dictkeyParamProps extends pageLimitProps {
  dictType?: string
  dictLabel?: string
  status?: string
}
// 参数设置查询参数
export interface paramsParamProps extends pageLimitProps {
  configName?: string
  configKey?: string
  configType?: string
  createTime?: string
}
// 操作日志查询参数
export interface operateInfoParamProps extends pageLimitProps {
  title?: string
  businessType?: string
  operName?: string
  operatorType?: number
  operTime?: string
}
// 登录信息查询参数
export interface loginInfoParamProps extends pageLimitProps {
  userName?: string
  ipaddr: string
  status?: string
  loginTime?: string
  accessTime?: string
}
// 在线用户查询参数
export interface onlineUserParamProps extends pageLimitProps {
  userName?: string
  ipaddr?: string
}
