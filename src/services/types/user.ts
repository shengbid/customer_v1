export interface userProps {
  username: string
  nickName?: string
  dept: any[]
  deptId: number
  userId: number
}

export interface userRoleProps {
  roles: string[]
  user: userProps
}
