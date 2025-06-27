"use client";

import Link from 'next/link';
import Image from 'next/image';
import { cn } from "@/lib/utils";

interface HeaderProps {
  title?: string;
  showNavigation?: boolean;
  navigationItems?: Array<{
    label: string;
    href: string;
  }>;
}

export function Header({ 
  title = "DL Solutions", 
  showNavigation = false,
  navigationItems = []
}: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">DL</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {title}
                </span>
                <span className="text-xs text-gray-500">Solutions Intelligentes</span>
              </div>
            </Link>
          </div>
          
          {showNavigation && navigationItems.length > 0 && (
            <nav className="hidden md:flex space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          )}

          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Retour au site
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
} 