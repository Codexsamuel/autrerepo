"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface NotificationProps {
  id: string;
  title: string;
  description?: string;
  type?: "success" | "error" | "warning" | "info";
  onClose: (id: string) => void;
}

export function Notification({ id, title, description, type = "info", onClose }: NotificationProps) {
  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return "border-green-500 bg-green-50 text-green-800";
      case "error":
        return "border-red-500 bg-red-50 text-red-800";
      case "warning":
        return "border-yellow-500 bg-yellow-50 text-yellow-800";
      default:
        return "border-blue-500 bg-blue-50 text-blue-800";
    }
  };

  return (
    <div className={cn(
      "fixed top-4 right-4 z-50 w-80 rounded-lg border p-4 shadow-lg",
      getTypeStyles()
    )}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h4 className="font-medium">{title}</h4>
          {description && (
            <p className="mt-1 text-sm opacity-90">{description}</p>
          )}
        </div>
        <button
          onClick={() => onClose(id)}
          className="ml-4 rounded p-1 opacity-70 hover:opacity-100"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
} 