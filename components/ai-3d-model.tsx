"use client";

import { useState, useEffect } from "react";
export function AI3DModel() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const rect = document.getElementById("ai-animation")?.getBoundingClientRect()
      if (rect) {
        const x = ((event.clientX - rect.left) / rect.width) * 2 - 1
        const y = ((event.clientY - rect.top) / rect.height) * 2 - 1
        setMousePosition({ x, y })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div id="ai-animation" className="w-full h-full relative flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-blue-500/20 via-purple-500/10 to-transparent animate-pulse" />

      {/* Main AI Core */}
      <div className="relative">
        {/* Central core */}
        <div
          className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-2xl animate-spin-slow relative"
          style={{
            transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
            transition: "transform 0.3s ease-out",
          }}
        >
          {/* Inner glow */}
          <div className="absolute inset-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 animate-pulse" />
          <div className="absolute inset-4 rounded-full bg-gradient-to-r from-white to-blue-200 animate-ping" />

          {/* Center dot */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full animate-pulse" />
        </div>

        {/* Orbiting rings */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {/* Ring 1 */}
          <div className="w-48 h-48 border-2 border-blue-400/30 rounded-full animate-spin-reverse absolute -top-24 -left-24">
            <div className="w-3 h-3 bg-blue-400 rounded-full absolute top-0 left-1/2 transform -translate-x-1/2 animate-pulse" />
            <div className="w-2 h-2 bg-cyan-400 rounded-full absolute bottom-0 right-1/4 animate-pulse" />
          </div>

          {/* Ring 2 */}
          <div className="w-64 h-64 border border-purple-400/20 rounded-full animate-spin-slow absolute -top-32 -left-32">
            <div className="w-2 h-2 bg-purple-400 rounded-full absolute top-1/4 right-0 animate-pulse" />
            <div className="w-3 h-3 bg-pink-400 rounded-full absolute bottom-1/4 left-0 animate-pulse" />
            <div className="w-2 h-2 bg-indigo-400 rounded-full absolute top-0 left-1/3 animate-pulse" />
          </div>
        </div>

        {/* Floating particles */}
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-300 rounded-full animate-float"
            style={{
              top: `${Math.sin((i / 12) * Math.PI * 2) * 100 + 150}px`,
              left: `${Math.cos((i / 12) * Math.PI * 2) * 100 + 150}px`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${3 + (i % 3)}s`,
            }}
          />
        ))}

        {/* Data streams */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={i}
              className="absolute w-px h-20 bg-gradient-to-t from-transparent via-blue-400 to-transparent animate-data-stream"
              style={{
                transform: `rotate(${i * 60}deg) translateY(-60px)`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
        </div>

        {/* Neural network connections */}
        <svg className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 pointer-events-none">
          {Array.from({ length: 8 }, (_, i) => {
            const angle1 = (i / 8) * Math.PI * 2
            const angle2 = ((i + 2) / 8) * Math.PI * 2
            const x1 = Math.cos(angle1) * 80 + 160
            const y1 = Math.sin(angle1) * 80 + 160
            const x2 = Math.cos(angle2) * 80 + 160
            const y2 = Math.sin(angle2) * 80 + 160

            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="url(#gradient)"
                strokeWidth="1"
                className="animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            )
          })}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Ambient effects */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="absolute w-px h-px bg-blue-300 rounded-full animate-twinkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
