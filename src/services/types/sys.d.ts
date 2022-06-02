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

// 数据字典
export interface dictProps {
  dictId: number
  dictName?: string
  dictType?: string
  status?: string
  remark?: string
  createTime?: string
}

// 数据字典子集
export interface dictKeyProps {
  dictCode: number
  dictLabel?: string
  dictType?: string
  dictValue?: string
  dictSort?: number
  status?: string
  remark?: string
  createTime?: string
}

// 数据字典下拉
export interface dictListProps {
  dictLabel: string
  dictValue: string
}

// 部门列表
export interface deptProps {
  deptId: number
  deptName?: string
  orderNum?: number
  status?: string
  createTime?: string
}
export interface deptListProps extends deptProps {
  children?: deptProps[]
}
// 菜单列表
export interface menuListProps {
  menuId: number
  menuName?: string
  menuType: string
  orderNum?: number
  perms?: string
  path?: string
  icon?: string
  status?: string
  createTime?: string
}

// 角色列表
export interface roleListProps {
  roleId: number
  roleName?: string
  roleKey?: number
  roleSort?: string
  status?: string
  createTime?: string
  remark?: string
  menuIds?: number[]
}
// 角色tree列表
export interface roleTreeProps {
  label?: string
  id?: number
}

// 岗位列表
export interface postListProps {
  postId: number
  postName?: string
  postCode?: string
  postSort?: string
  status?: string
  createTime?: string
}
// 参数设置
export interface paramsProps {
  configId: number
  configName?: string
  configKey?: string
  configValue?: string
  configType?: string
  createTime?: string
  remark?: string
}
