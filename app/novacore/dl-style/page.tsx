"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export default function DLStylePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="flex items-center gap-2">
              <Image
                src="https://res.cloudinary.com/dko5sommz/image/upload/v1748454498/Logo_DL_Style_2_usdvqk.svg"
                alt="DL Style Logo"
                width={200}
                height={50}
                className="h-12 w-auto"
              />
            </div>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Votre destination pour le style et l'élégance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-2">Mode</h3>
              <p className="text-gray-600">
                Découvrez les dernières tendances de la mode et créez votre style unique.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-2">Beauté</h3>
              <p className="text-gray-600">
                Conseils beauté, tutoriels et produits recommandés pour sublimer votre apparence.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-2">Lifestyle</h3>
              <p className="text-gray-600">
                Inspirations et conseils pour un style de vie élégant et authentique.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 