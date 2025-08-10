"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, Menu } from "lucide-react";
import Link from 'next/link';

export default function TestButtonsPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center mb-8">Test des Boutons et Menus</h1>
        
        {/* Test des boutons de navigation */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Test des Boutons de Navigation</h2>
          <div className="flex flex-wrap gap-4">
            <Link href="/nova-ia">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                NovaIA
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="outline">
                Nos Services
              </Button>
            </Link>
            <Link href="/contact">
              <Button className="bg-green-600 hover:bg-green-700">
                Contact
              </Button>
            </Link>
          </div>
        </section>

        {/* Test du menu déroulant */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Test du Menu Déroulant</h2>
          <div className="flex gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <Menu className="w-4 h-4" />
                  <span>Menu Principal</span>
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-2 z-[9999] bg-white border border-gray-200 shadow-xl rounded-lg">
                <DropdownMenuItem asChild>
                  <Link href="/nova-ia" className="flex items-center space-x-3 p-3 hover:bg-blue-50 rounded-md transition-colors duration-200">
                    <span>NovaIA</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/services" className="flex items-center space-x-3 p-3 hover:bg-blue-50 rounded-md transition-colors duration-200">
                    <span>Services</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/contact" className="flex items-center space-x-3 p-3 hover:bg-blue-50 rounded-md transition-colors duration-200">
                    <span>Contact</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </section>

        {/* Test des liens directs */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Test des Liens Directs</h2>
          <div className="space-y-2">
            <p><Link href="/nova-ia" className="text-blue-600 hover:underline">Lien vers NovaIA</Link></p>
            <p><Link href="/services" className="text-blue-600 hover:underline">Lien vers Services</Link></p>
            <p><Link href="/contact" className="text-blue-600 hover:underline">Lien vers Contact</Link></p>
          </div>
        </section>

        {/* Retour à l'accueil */}
        <div className="text-center">
          <Link href="/">
            <Button variant="outline">
              Retour à l'Accueil
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 