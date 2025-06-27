"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface themeproviderProps {
  children?: React.ReactNode
  className?: string
}

export function themeprovider({ 
  children, 
  className,
  ...props 
}: themeproviderProps) {
  return (
    <div className={cn("", className)} {...props}>
      {children}
    </div>
  )
}