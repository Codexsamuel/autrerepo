"use client";

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const cardVariants = cva(
  "rounded-lg border bg-card text-card-foreground shadow-sm",
  {
    variants: {
      variant: {
        default: "border-border bg-card",
        elevated: "border-0 bg-card shadow-lg shadow-black/5",
        outline: "border-2 border-border bg-transparent",
        ghost: "border-0 bg-transparent shadow-none",
        glass: "border-white/20 bg-white/10 backdrop-blur-md",
        gradient: "border-0 bg-gradient-to-br from-blue-50 to-purple-50",
        dark: "border-gray-700 bg-gray-900 text-white",
        premium: "border-0 bg-gradient-to-br from-purple-50 via-pink-50 to-red-50",
        ai: "border-0 bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50",
        blockchain: "border-0 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50",
        cybersecurity: "border-0 bg-gradient-to-br from-red-50 via-purple-50 to-indigo-50",
      },
      size: {
        default: "p-6",
        sm: "p-4",
        lg: "p-8",
        xl: "p-10",
        compact: "p-3",
      },
      hover: {
        none: "",
        lift: "transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
        glow: "transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25",
        scale: "transition-all duration-300 hover:scale-105",
        border: "transition-all duration-300 hover:border-primary hover:border-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      hover: "none",
    },
  }
)

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof cardVariants>
>(({ className, variant, size, hover, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(cardVariants({ variant, size, hover, className }))}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center pt-6", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, cardVariants } 