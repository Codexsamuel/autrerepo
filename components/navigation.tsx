"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface navigationProps {
  children?: React.ReactNode
  className?: string
}

export function navigation({ 
  children, 
  className,
  ...props 
}: navigationProps) {
  return (
    <div className={cn("", className)} {...props}>
      {children}
    </div>
  )
}