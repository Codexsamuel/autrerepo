"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface ServiceStatus {
  name: string;
  status: "active" | "maintenance" | "beta";
  lastCheck: string;
}

interface ServiceStatusListProps {
  services: ServiceStatus[];
}

export function ServiceStatusList({ services }: ServiceStatusListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Statut des Services</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {services.map((service) => (
            <div key={service.name} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{service.name}</p>
                <p className="text-sm text-muted-foreground">
                  Dernière vérification: {service.lastCheck}
                </p>
              </div>
              <Badge
                variant={
                  service.status === "active"
                    ? "success"
                    : service.status === "maintenance"
                    ? "warning"
                    : "secondary"
                }
              >service.status === "active"
                  ? "Actif"
                  : service.status === "maintenance"
                  ? "Maintenance"
                  : "Beta"</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 