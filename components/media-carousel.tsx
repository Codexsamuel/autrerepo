"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface mediacarouselProps {
  children?: React.ReactNode
  className?: string
}

export function mediacarousel({ 
  children, 
  className,
  ...props 
}: mediacarouselProps) {
  return (
    <div className={cn("", className)} {...props}>
      {children}
    </div>
  )
}