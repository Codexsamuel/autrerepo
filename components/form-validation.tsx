"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, CheckCircle2 } from "lucide-react"



interface FormField {
  id: string
  label: string
  type: "text" | "email" | "tel" | "textarea" | "select"
  required?: boolean
  minLength?: number
  options?: { value: string; label: string }[]
  placeholder?: string
}

interface FormValidationProps {
  fields: FormField[]
  onSubmit: (data: Record<string, string>) => void
  submitLabel: string
  successMessage?: string
}

export function FormValidation({ fields, onSubmit, submitLabel, successMessage }: FormValidationProps) {
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isValid, setIsValid] = useState(false)

  // Initialiser les champs du formulaire
  useEffect(() => {
    const initialData: Record<string, string> = {}
    const initialTouched: Record<string, boolean> = {}

    fields.forEach((field) => {
      initialData[field.id] = ""
      initialTouched[field.id] = false
    })

    setFormData(initialData)
    setTouched(initialTouched)
  }, [fields])

  // Valider le formulaire à chaque changement
  useEffect(() => {
    validateForm()
  }, [formData, touched])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    let formIsValid = true

    fields.forEach((field) => {
      // Ne valider que si le champ a été touché
      if (!touched[field.id]) return

      if (field.required && !formData[field.id]) {
        newErrors[field.id] = "Ce champ est requis"
        formIsValid = false
      } else if (field.minLength && formData[field.id].length < field.minLength) {
        newErrors[field.id] = `Minimum ${field.minLength} caractères requis`
        formIsValid = false
      } else if (field.type === "email" && formData[field.id] && !isValidEmail(formData[field.id])) {
        newErrors[field.id] = "Email invalide"
        formIsValid = false
      } else if (field.type === "tel" && formData[field.id] && !isValidPhone(formData[field.id])) {
        newErrors[field.id] = "Numéro de téléphone invalide"
        formIsValid = false
      }
    })

    setErrors(newErrors)
    setIsValid(formIsValid)
    return formIsValid
  }

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const isValidPhone = (phone: string) => {
    return /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(phone.replace(/\s/g, ""))
  }

  const handleChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }))
    setTouched((prev) => ({ ...prev, [id]: true }))
  }

  const handleBlur = (id: string) => {
    setTouched((prev) => ({ ...prev, [id]: true }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Marquer tous les champs comme touchés pour validation
    const allTouched: Record<string, boolean> = {}
    fields.forEach((field) => {
      allTouched[field.id] = true
    })
    setTouched(allTouched)

    if (validateForm()) {
      setIsSubmitting(true)
      try {
        await onSubmit(formData)
        setIsSubmitted(true)
        // Réinitialiser le formulaire après soumission réussie
        const resetData: Record<string, string> = {}
        fields.forEach((field) => {
          resetData[field.id] = ""
        })
        setFormData(resetData)
        setTouched({})
      } catch (error) {
        console.error("Erreur lors de la soumission:", error)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const renderField = (field: FormField) => {
    const hasError = !!errors[field.id]
    switch (field.type) {
      case "textarea":
        return (
          <div className="space-y-2" key={field.id}>
            <Label htmlFor={field.id} className="flex items-center justify-between">
              {field.label}
              {field.required && <span className="text-red-500 text-xs">*Requis</span>}
            </Label>
            <Textarea
              id={field.id}
              value={formData[field.id] || ""}
              onChange={(e) => handleChange(field.id, e.target.value)}
              onBlur={() => handleBlur(field.id)}
              placeholder={field.placeholder}
              className={hasError ? "border-red-500" : ""}
            />
            {hasError && (
              <div className="text-red-500 text-xs flex items-center gap-1 mt-1">
                <AlertCircle className="h-3 w-3" />
                {errors[field.id]}
              </div>
            )}
          </div>
        )

      case "select":
        return (
          <div className="space-y-2" key={field.id}>
            <Label htmlFor={field.id} className="flex items-center justify-between">
              {field.label}
              {field.required && <span className="text-red-500 text-xs">*Requis</span>}
            </Label>
            <Select
              value={formData[field.id] || ""}
              onValueChange={(value) => handleChange(field.id, value)}
              onOpenChange={() => handleBlur(field.id)}
            >
              <SelectTrigger className={hasError ? "border-red-500" : ""}>
                <SelectValue placeholder={field.placeholder || "Sélectionner..."} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((option: any) => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {hasError && (
              <div className="text-red-500 text-xs flex items-center gap-1 mt-1">
                <AlertCircle className="h-3 w-3" />
                {errors[field.id]}
              </div>
            )}
          </div>
        )

      default:
        return (
          <div className="space-y-2" key={field.id}>
            <Label htmlFor={field.id} className="flex items-center justify-between">
              {field.label}
              {field.required && <span className="text-red-500 text-xs">*Requis</span>}
            </Label>
            <Input
              id={field.id}
              type={field.type}
              value={formData[field.id] || ""}
              onChange={(e) => handleChange(field.id, e.target.value)}
              onBlur={() => handleBlur(field.id)}
              placeholder={field.placeholder}
              className={hasError ? "border-red-500" : ""}
            />
            {hasError && (
              <div className="text-red-500 text-xs flex items-center gap-1 mt-1">
                <AlertCircle className="h-3 w-3" />
                {errors[field.id]}
              </div>
            )}
          </div>
        )
    }
  }

  return (
    <div className="w-full">
      {isSubmitted && successMessage ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
          <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
          <div>
            <h4 className="font-medium text-green-800">Envoi réussi!</h4>
            <p className="text-green-700 text-sm mt-1">{successMessage}</p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field: any) => renderField(field))}

          <Button type="submit" className="w-full mt-6" disabled={!isValid || isSubmitting}>isSubmitting ? "Envoi en cours..." : submitLabel</Button>

          {Object.keys(errors).length > 0 && Object.keys(touched).some((key) => touched[key]) && (
            <p className="text-red-500 text-xs text-center mt-2">
              Veuillez corriger les erreurs avant de soumettre le formulaire.
            </p>
          )}
        </form>
      )}
    </div>
  )
}
