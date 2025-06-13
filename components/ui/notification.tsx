"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface NotificationProps {
  message: string;
  type: "success" | "error" | "info";
  show: boolean;
}

export function Notification({ message, type, show }: NotificationProps) {
  if (!show) return null;

  const bgColor = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  }[type];

  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 p-4 rounded-lg text-white shadow-lg transition-all duration-300",
        bgColor
      )}
    >
      {message}
    </div>
  );
} 