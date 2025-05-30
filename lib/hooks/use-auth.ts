"use client"

import { useUser, useAuth as useClerkAuth } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import type { User } from "@/lib/types"

export function useAuth() {
  const { user: clerkUser, isLoaded, isSignedIn } = useUser()
  const { getToken } = useClerkAuth()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isLoaded) {
      if (isSignedIn && clerkUser) {
        setUser({
          id: clerkUser.id,
          email: clerkUser.emailAddresses[0]?.emailAddress || "",
          full_name: clerkUser.fullName || "",
          avatar_url: clerkUser.imageUrl || "",
          clerk_id: clerkUser.id,
          role: "employee", // Default role, should be fetched from database
          department: null,
          position: null,
          created_at: clerkUser.createdAt?.toISOString() || new Date().toISOString(),
          updated_at: new Date().toISOString(),
          last_login: null,
          is_active: true,
          preferences: {},
        })
      } else {
        setUser(null)
      }
      setLoading(false)
    }
  }, [isLoaded, isSignedIn, clerkUser])

  return {
    user,
    loading,
    isSignedIn,
    getToken,
  }
}
