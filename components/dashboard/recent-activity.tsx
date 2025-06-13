"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Activity {
  user: string
  action: string
  time: string
}

export function RecentActivity() {
  const activities: Activity[] = [
    {
      user: "Marie Dubois",
      action: "Nouvelle inscription sur NovaWorld",
      time: "Il y a 5 min",
    },
    {
      user: "Jean Martin",
      action: "Commande validée sur DL Style",
      time: "Il y a 12 min",
    },
    {
      user: "Sophie Laurent",
      action: "Réservation vol sur DL Travel",
      time: "Il y a 18 min",
    },
    {
      user: "Thomas Durand",
      action: "Pari gagnant sur DL Bookmaker",
      time: "Il y a 25 min",
    },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">Activité Récente</CardTitle>
        <Button variant="ghost" size="sm">
          Voir tout
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.user} className="flex items-start space-x-4">
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">{activity.user}</p>
                <p className="text-sm text-muted-foreground">{activity.action}</p>
              </div>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 