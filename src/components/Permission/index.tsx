import React, { useState } from 'react'
import { Button } from 'antd'
import { useModel } from 'umi'
import type { ButtonProps } from 'antd'
import { useEffect } from 'react'

interface permissionProps extends ButtonProps {
  authorword: string
}

const PermissionButton: React.FC<permissionProps> = (props) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false) // 是否是管理员
  const [isPermisson, setIsPermisson] = useState<boolean>(false) // 是否有按钮权限
  const { initialState } = useModel('@@initialState')

  const { currentUser }: any = initialState
  useEffect(() => {
    if (currentUser && currentUser.permissionRoles) {
      if (currentUser.permissionRoles.includes('admin')) {
        setIsAdmin(true)
      } else {
        setIsPermisson(currentUser.permissions.includes(props.authorword))
      }
    }
  }, [])
  // console.log(currentUser)
  if (props.type === 'link') {
    return isAdmin || isPermisson ? <a {...props} /> : <></>
  }

  return isAdmin || isPermisson ? <Button {...props} /> : <></>
}

export default PermissionButton
