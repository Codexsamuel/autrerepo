"use client";

import { useState, useEffect, useRef, ReactNode } from "react";
interface ScrollAnimationProps {
  children: ReactNode
  animation?: "fadeInUp" | "fadeInLeft" | "fadeInRight" | "scaleIn" | "rotateIn" | "slideInUp"
  delay?: number
  className?: string
}

export function ScrollAnimation({ children, animation = "fadeInUp", delay = 0, className = "" }: ScrollAnimationProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, delay)
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [delay])

  const getAnimationClass = () => {
    const baseClass = "transition-all duration-1000 ease-out"

    if (!isVisible) {
      switch (animation) {
        case "fadeInUp":
          return `${baseClass} opacity-0 translate-y-8`
        case "fadeInLeft":
          return `${baseClass} opacity-0 -translate-x-8`
        case "fadeInRight":
          return `${baseClass} opacity-0 translate-x-8`
        case "scaleIn":
          return `${baseClass} opacity-0 scale-95`
        case "rotateIn":
          return `${baseClass} opacity-0 rotate-3 scale-95`
        case "slideInUp":
          return `${baseClass} opacity-0 translate-y-12`
        default:
          return `${baseClass} opacity-0`
      }
    }

    return `${baseClass} opacity-100 translate-x-0 translate-y-0 scale-100 rotate-0`
  }

  return (
    <div ref={ref} className={`${getAnimationClass()} ${className}`}>
      {children}
    </div>
  )
}
