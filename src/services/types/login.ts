export interface loginProps {
  username: string
  password: string
  autoLogin?: boolean
}

export interface LoginResult {
  status?: string
  type?: string
}
