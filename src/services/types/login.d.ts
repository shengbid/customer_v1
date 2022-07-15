import type { deptListProps } from './sys'

export interface loginProps {
  username: string
  password: string
  uuid: string
  loginType: string
  phone: string
  autoLogin?: boolean
}
export interface phoneCodeProps {
  uuid?: string
  loginType?: string
  phone: string
  code?: string
}

export interface LoginResult {
  status?: string
  type?: string
}

export interface userProps {
  userName: string
  fullName: string
  nickName?: string
  phonenumber?: string
  email?: string
  roleGroup?: string
  status?: string
  createTime?: string
  dept: deptListProps
  deptId: number
  userId: number
}

export interface userRoleProps {
  roles: string[]
  user: userProps
  permissions: string[]
}
