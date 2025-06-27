"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface teamcarouselProps {
  children?: React.ReactNode
  className?: string
}

export function teamcarousel({ 
  children, 
  className,
  ...props 
}: teamcarouselProps) {
  return (
    <div className={cn("", className)} {...props}>
      {children}
    </div>
  )
}