"use client"

import type React from "react"

import { ClerkProvider } from "@clerk/nextjs"
import { dark } from "@clerk/themes"
import { useTheme } from "next-themes"

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { theme } = useTheme()

  return (
    <ClerkProvider
      appearance={{
        baseTheme: theme === "dark" ? dark : undefined,
        variables: {
          colorPrimary: "#3b82f6",
          colorBackground: theme === "dark" ? "#0f172a" : "#ffffff",
          colorText: theme === "dark" ? "#f8fafc" : "#0f172a",
        },
        elements: {
          formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
          card: "shadow-lg border border-gray-200 dark:border-gray-800",
        },
      }}
    >
      {children}
    </ClerkProvider>
  )
}
