"use client";

import { cn } from "@/lib/utils";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const tabsVariants = cva(
  "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
  {
    variants: {
      variant: {
        default: "bg-muted",
        outline: "border border-input bg-transparent",
        glass: "bg-white/10 backdrop-blur-md border border-white/20",
        gradient: "bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200",
        dark: "bg-gray-900 border border-gray-700",
        premium: "bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200",
        ai: "bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200",
        blockchain: "bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200",
        cybersecurity: "bg-gradient-to-r from-red-50 to-purple-50 border border-red-200",
      },
      size: {
        default: "h-10",
        sm: "h-8",
        lg: "h-12",
        xl: "h-14",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & VariantProps<typeof tabsVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(tabsVariants({ variant, size, className }))}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
    variant?: "default" | "outline" | "glass" | "gradient" | "dark" | "premium" | "ai" | "blockchain" | "cybersecurity"
    size?: "default" | "sm" | "lg" | "xl"
    icon?: React.ReactNode
    badge?: React.ReactNode
  }
>(({ className, variant = "default", size = "default", icon, badge, children, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      variant === "default" && "data-[state=active]:bg-background data-[state=active]:text-foreground",
      variant === "outline" && "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:border-border",
      variant === "glass" && "data-[state=active]:bg-white/20 data-[state=active]:text-white data-[state=active]:shadow-lg",
      variant === "gradient" && "data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-100 data-[state=active]:to-purple-100 data-[state=active]:text-blue-900",
      variant === "dark" && "data-[state=active]:bg-gray-800 data-[state=active]:text-white",
      variant === "premium" && "data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-100 data-[state=active]:to-pink-100 data-[state=active]:text-purple-900",
      variant === "ai" && "data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-100 data-[state=active]:to-cyan-100 data-[state=active]:text-blue-900",
      variant === "blockchain" && "data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-100 data-[state=active]:to-red-100 data-[state=active]:text-orange-900",
      variant === "cybersecurity" && "data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-100 data-[state=active]:to-purple-100 data-[state=active]:text-red-900",
      size === "sm" && "px-2 py-1 text-xs",
      size === "lg" && "px-4 py-2 text-base",
      size === "xl" && "px-6 py-3 text-lg",
      className
    )}
    {...props}
  >
    {icon && <span className="mr-2">{icon}</span>}
    {children}
    {badge && <span className="ml-2">{badge}</span>}
  </TabsPrimitive.Trigger>
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> & {
    variant?: "default" | "fade" | "slide" | "scale"
    animation?: "none" | "fade" | "slide" | "scale" | "bounce"
  }
>(({ className, variant = "default", animation = "none", ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      variant === "fade" && "animate-in fade-in-0",
      variant === "slide" && "animate-in slide-in-from-top-2",
      variant === "scale" && "animate-in zoom-in-95",
      animation === "fade" && "animate-in fade-in-0 duration-200",
      animation === "slide" && "animate-in slide-in-from-top-2 duration-200",
      animation === "scale" && "animate-in zoom-in-95 duration-200",
      animation === "bounce" && "animate-in bounce-in duration-500",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsContent, TabsList, TabsTrigger, tabsVariants };

