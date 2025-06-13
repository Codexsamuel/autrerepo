"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  status: "active" | "maintenance" | "beta";
  users: string;
  features: string[];
  link: string;
}

export function ServiceCard({
  title,
  description,
  status,
  users,
  features,
  link,
}: ServiceCardProps) {
  const statusColors = {
    active: "success",
    maintenance: "warning",
    beta: "info",
  } as const;

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{title}</CardTitle>
          <Badge variant={statusColors[status]}>
            {status === "active" && "Actif"}
            {status === "maintenance" && "Maintenance"}
            {status === "beta" && "Bêta"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <div className="space-y-2">
          <p className="text-sm font-medium">Utilisateurs : {users}</p>
          <div className="space-y-1">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center text-sm">
                <span className="mr-2">•</span>
                {feature}
              </div>
            ))}
          </div>
        </div>
        <Button className="w-full mt-4" asChild>
          <a href={link}>
            Accéder au service
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
} 