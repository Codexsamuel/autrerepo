import { LucideIcon } from 'lucide-react'
import { ReactNode } from 'react'

export interface IconProps {
  className?: string
  size?: number
  color?: string
}

export type IconComponent = LucideIcon

export interface Feature {
  title: string
  description: string
  icon: IconComponent
  color: string
}

export interface Stat {
  title: string
  value: string
  icon: IconComponent
  color: string
} 