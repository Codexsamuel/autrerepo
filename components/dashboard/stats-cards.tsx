"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface StatCardProps {
  title: string
  value: string
  change: string
  icon?: React.ReactNode
}

export function StatsCards() {
  const stats = [
    {
      title: "Utilisateurs Actifs",
      value: "4.8k+",
      change: "+12%",
    },
    {
      title: "Revenus Mensuel",
      value: "€45.2k",
      change: "+8%",
    },
    {
      title: "Services Actifs",
      value: "4",
      change: "100%",
    },
    {
      title: "Satisfaction",
      value: "98%",
      change: "+2%",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">{stat.change}</span>
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 