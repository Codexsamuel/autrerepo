"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Download, ArrowRight } from "lucide-react"



interface ActionButtonsProps {
  slug: string
  title: string
  price: string
  duration: string
  level: string
  participants: string
  nextSession: string
  location: string
  modules: string[]
  objectives: string[]
  prerequisites: string[]
  instructor: {
    name: string
    role: string
    experience: string
  }
}

export function ActionButtons({
  slug,
  title,
  price,
  duration,
  level,
  participants,
  nextSession,
  location,
  modules,
  objectives,
  prerequisites,
  instructor,
}: ActionButtonsProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleDownload = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          price,
          duration,
          level,
          participants,
          nextSession,
          location,
          modules,
          objectives,
          prerequisites,
          instructor,
        }),
      })

      if (!response.ok) {
        throw new Error("Erreur lors de la génération du PDF")
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `programme-${title.toLowerCase().replace(/\s+/g, "-")}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error("Erreur lors du téléchargement:", error)
      alert("Une erreur est survenue lors du téléchargement du programme")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Button
        onClick={() => router.push(`/formations/${slug}/inscription`)}
        className="flex-1 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white"
      >
        S'inscrire maintenant
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
      <Button
        onClick={handleDownload}
        variant="outline"
        className="flex-1"
        disabled={isLoading}
      >
        <Download className="mr-2 h-4 w-4" />
        {isLoading ? "Téléchargement..." : "Télécharger le programme"}
      </Button>
    </div>
  )
} 