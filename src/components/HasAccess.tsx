import * as React from 'react';
import { useEffect, useState, useContext, PropsWithChildren } from 'react'

export interface UserPayload {
  id: string,
  roles: string[],
  permissions: string[]
}

const LOCAL_STORAGE_KEY_USER = "__permifyUser";

export interface HasAccessProps {
  roles?: string[],
  permissions?: string[]
  isLoading?: React.ReactElement,
  renderAuthFailed?: React.ReactElement
}

const HasAccess = ({
  roles,
  permissions,
  isLoading,
  renderAuthFailed,
  children
}: PropsWithChildren<HasAccessProps>) => {
  const [hasAccess, setHasAccess] = useState(false)
  const [checking, setChecking] = useState(false)

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_USER));

    if(!storedUser) {
      console.log('No user provided to Permify! You should set user to perfom access check') 
      return;
    } 

    setChecking(true)

    // role check
    if (roles && storedUser.roles && storedUser.roles.length > 0) {
      const intersection = storedUser.roles.filter((role: string) => roles.includes(role));
      if (intersection.length > 0) setHasAccess(true)
    }

    // permission check
    if (permissions && storedUser.permissions && storedUser.permissions.length > 0) {
      const intersection = storedUser.permissions.filter((permission: string) => permissions.includes(permission));
      if (intersection.length > 0) setHasAccess(true)
      else setHasAccess(false)
    }

    setChecking(false)

  }, [roles, permissions])

  if (!hasAccess && checking) {
    return isLoading
  }
  
  if (hasAccess) {
    return (
      // children is of type ReactNode which already includes ReactFragment
        {children}
    )
  }

  if (renderAuthFailed) {
    return renderAuthFailed
  }

  return null
}

export default HasAccess;
