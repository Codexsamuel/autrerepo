"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Upload } from "lucide-react"
import { uploadFile } from "@/lib/blob"
import { useToast } from "@/hooks/use-toast"

interface FileUploadProps {
  onUpload: (url: string, filename: string) => void
  accept?: string
  maxSize?: number
  multiple?: boolean
  className?: string
}

export function FileUpload({
  onUpload,
  accept = "*/*",
  maxSize = 10 * 1024 * 1024, // 10MB
  multiple = false,
  className = "",
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleFiles = async (files: FileList) => {
    if (!files.length) return

    const file = files[0]

    if (file.size > maxSize) {
      toast({
        title: "Fichier trop volumineux",
        description: `Le fichier ne doit pas dépasser ${maxSize / 1024 / 1024}MB`,
        variant: "destructive",
      })
      return
    }

    setUploading(true)
    setProgress(0)

    try {
      const timestamp = Date.now()
      const filename = `${timestamp}-${file.name}`
      const pathname = `uploads/${filename}`

      // Simuler le progrès
      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 10, 90))
      }, 100)

      const blob = await uploadFile(file, pathname)

      clearInterval(progressInterval)
      setProgress(100)

      onUpload(blob.url, file.name)

      toast({
        title: "Fichier uploadé",
        description: `${file.name} a été uploadé avec succès`,
      })
    } catch (error) {
      toast({
        title: "Erreur d'upload",
        description: "Une erreur est survenue lors de l'upload",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
      setProgress(0)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files)
    }
  }

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className={`w-full ${className}`}>
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
          dragActive ? "border-primary bg-primary/5" : "border-gray-300 hover:border-gray-400"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          className="hidden"
        />

        {uploading ? (
          <div className="text-center">
            <div className="mb-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            </div>
            <p className="text-sm text-gray-600 mb-2">Upload en cours...</p>
            <Progress value={progress} className="w-full" />
          </div>
        ) : (
          <div className="text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-lg font-medium text-gray-900 mb-2">Glissez-déposez votre fichier ici</p>
            <p className="text-sm text-gray-600 mb-4">ou cliquez pour sélectionner</p>
            <Button onClick={openFileDialog} variant="outline">
              Sélectionner un fichier
            </Button>
            <p className="text-xs text-gray-500 mt-2">Taille max: {maxSize / 1024 / 1024}MB</p>
          </div>
        )}
      </div>
    </div>
  )
}
