"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/header";
import { Navigation } from "@/components/layout/navigation";

interface MainLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  navigationItems: {
    href: string;
    label: string;
  }[];
  className?: string;
}

export function MainLayout({
  children,
  title,
  description,
  navigationItems,
  className,
}: MainLayoutProps) {
  return (
    <main className={cn("min-h-screen bg-background", className)}>
      <div className="container mx-auto px-4 py-8">
        <Header title={title} description={description} />
        <Navigation items={navigationItems} />
        {children}
      </div>
    </main>
  );
} 