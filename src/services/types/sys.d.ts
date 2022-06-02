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
// 操作日志
export interface operateInfoProps {
  operId: number
  title?: string
  businessType: string
  requestMethod?: string
  operName?: string
  operIp?: string
  operLocation?: string
  operatorType: number
  operTime?: string
  method?: string
  operParam?: string
  jsonResult?: string
  operUrl?: string
}
// 登录信息
export interface loginInfoProps {
  infoId: number
  userName?: string
  ipaddr: string
  loginLocation?: string
  browser?: string
  os?: string
  status?: string
  msg: number
  loginTime?: string
}
