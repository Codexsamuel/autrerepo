"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface solutionscarouselProps {
  children?: React.ReactNode
  className?: string
}

export function solutionscarousel({ 
  children, 
  className,
  ...props 
}: solutionscarouselProps) {
  return (
    <div className={cn("", className)} {...props}>
      {children}
    </div>
  )
}