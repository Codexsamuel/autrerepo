"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

// Floating Particles Component
export function FloatingParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {Array.from({ length: 20 }, (_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }}
        />
      ))}
    </div>
  )
}

// Glowing Cursor Component
export function GlowingCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div
      className="fixed pointer-events-none z-50 w-8 h-8 rounded-full bg-gradient-radial from-blue-400/30 via-purple-400/20 to-transparent mix-blend-screen transition-transform duration-100"
      style={{
        left: mousePosition.x - 16,
        top: mousePosition.y - 16,
      }}
    />
  )
}

// Magic Button Component
interface MagicButtonProps extends React.ComponentProps<typeof Button> {
  children: React.ReactNode
}

export function MagicButton({ children, className = "", ...props }: MagicButtonProps) {
  return (
    <Button
      className={`relative overflow-hidden group transition-all duration-300 hover:scale-105 hover:shadow-2xl ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
    </Button>
  )
}

// Holographic Card Component
interface HolographicCardProps extends React.ComponentProps<typeof Card> {
  children: React.ReactNode
}

export function HolographicCard({ children, className = "", ...props }: HolographicCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <Card
      className={`relative overflow-hidden transition-all duration-300 hover:scale-[1.02] ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {isHovered && (
        <div
          className="absolute pointer-events-none opacity-30 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 100px at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent)`,
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
          }}
        />
      )}
      {children}
    </Card>
  )
}
