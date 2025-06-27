"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface reservationcalendarProps {
  children?: React.ReactNode
  className?: string
}

export function reservationcalendar({ 
  children, 
  className,
  ...props 
}: reservationcalendarProps) {
  return (
    <div className={cn("", className)} {...props}>
      {children}
    </div>
  )
}