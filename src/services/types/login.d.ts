import type { deptListProps } from './sys'

export interface loginProps {
  username: string
  password: string
  uuid: string
  autoLogin?: boolean
}

export interface LoginResult {
  status?: string
  type?: string
}

export interface userProps {
  userName: string
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
