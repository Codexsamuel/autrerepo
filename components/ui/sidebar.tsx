"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function Sidebar({ className, children, ...props }: SidebarProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)} {...props}>
      {children}
    </div>
  )
}

export function SidebarHeader({ className, children, ...props }: SidebarProps) {
  return (
    <div className={cn("flex h-[60px] items-center px-2", className)} {...props}>
      {children}
    </div>
  )
}

export function SidebarContent({ className, children, ...props }: SidebarProps) {
  return (
    <div className={cn("flex flex-1 flex-col gap-2", className)} {...props}>
      {children}
    </div>
  )
}

export function SidebarFooter({ className, children, ...props }: SidebarProps) {
  return (
    <div className={cn("flex items-center gap-2 p-2", className)} {...props}>
      {children}
    </div>
  )
}
