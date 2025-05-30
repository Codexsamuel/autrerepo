"use client"

import { useState, useEffect } from "react"
import { useUser } from "@clerk/nextjs"

export interface Permission {
  module: string
  action: string
  allowed: boolean
}

export interface UserPermissions {
  clients: {
    read: boolean
    write: boolean
    delete: boolean
  }
  invoices: {
    read: boolean
    write: boolean
    delete: boolean
  }
  users: {
    read: boolean
    write: boolean
    delete: boolean
  }
  reports: {
    read: boolean
    write: boolean
    delete: boolean
  }
  studio: {
    read: boolean
    write: boolean
    delete: boolean
  }
}

const DEFAULT_PERMISSIONS: UserPermissions = {
  clients: { read: false, write: false, delete: false },
  invoices: { read: false, write: false, delete: false },
  users: { read: false, write: false, delete: false },
  reports: { read: false, write: false, delete: false },
  studio: { read: false, write: false, delete: false },
}

const ROLE_PERMISSIONS: Record<string, UserPermissions> = {
  admin: {
    clients: { read: true, write: true, delete: true },
    invoices: { read: true, write: true, delete: true },
    users: { read: true, write: true, delete: true },
    reports: { read: true, write: true, delete: true },
    studio: { read: true, write: true, delete: true },
  },
  supervisor: {
    clients: { read: true, write: true, delete: false },
    invoices: { read: true, write: true, delete: false },
    users: { read: true, write: false, delete: false },
    reports: { read: true, write: true, delete: false },
    studio: { read: true, write: true, delete: false },
  },
  analyst: {
    clients: { read: true, write: false, delete: false },
    invoices: { read: true, write: false, delete: false },
    users: { read: false, write: false, delete: false },
    reports: { read: true, write: true, delete: false },
    studio: { read: true, write: false, delete: false },
  },
  employee: {
    clients: { read: true, write: true, delete: false },
    invoices: { read: true, write: true, delete: false },
    users: { read: false, write: false, delete: false },
    reports: { read: true, write: false, delete: false },
    studio: { read: true, write: true, delete: false },
  },
}

export function usePermissions() {
  const { user } = useUser()
  const [permissions, setPermissions] = useState<UserPermissions>(DEFAULT_PERMISSIONS)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      const userRole = (user.publicMetadata?.role as string) || "employee"
      const userPermissions = ROLE_PERMISSIONS[userRole] || DEFAULT_PERMISSIONS
      setPermissions(userPermissions)
    }
    setLoading(false)
  }, [user])

  const hasPermission = (
    module: keyof UserPermissions,
    action: keyof UserPermissions[keyof UserPermissions],
  ): boolean => {
    return permissions[module]?.[action] || false
  }

  const canRead = (module: keyof UserPermissions): boolean => {
    return hasPermission(module, "read")
  }

  const canWrite = (module: keyof UserPermissions): boolean => {
    return hasPermission(module, "write")
  }

  const canDelete = (module: keyof UserPermissions): boolean => {
    return hasPermission(module, "delete")
  }

  return {
    permissions,
    loading,
    hasPermission,
    canRead,
    canWrite,
    canDelete,
  }
}
