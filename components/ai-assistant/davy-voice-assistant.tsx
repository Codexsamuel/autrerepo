"use client"

import React, { useState, useEffect, useRef } from "react"
import { Mic, MicOff, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AssistantState {
  isListening: boolean
  isProcessing: boolean
  isVisible: boolean
}

export function DavyVoiceAssistant() {
  const [state, setState] = React.useState<AssistantState>({
    isListening: false,
    isProcessing: false,
    isVisible: false
  })

  const toggleListening = React.useCallback(() => {
    setState(prev => ({
      ...prev,
      isListening: !prev.isListening,
      isProcessing: !prev.isListening
    }))

    // Simuler le traitement de la voix
    if (!state.isListening) {
      setTimeout(() => {
        setState(prev => ({
          ...prev,
          isProcessing: false
        }))
      }, 2000)
    }
  }, [state.isListening])

  const toggleVisibility = React.useCallback(() => {
    setState(prev => ({
      ...prev,
      isVisible: !prev.isVisible
    }))
  }, [])

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {state.isVisible && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mb-4 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <h3 className="font-semibold">Davy Assistant</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {state.isProcessing ? "Processing..." : 
                 state.isListening ? "Listening..." : 
                 "Click to start"}
              </p>
            </div>
            <Button
              variant={state.isListening ? "destructive" : "default"}
              size="icon"
              onClick={toggleListening}
              className="rounded-full"
              disabled={state.isProcessing}
            >
              {state.isProcessing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : state.isListening ? (
                <MicOff className="h-4 w-4" />
              ) : (
                <Mic className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      )}

      <div className="transition-transform duration-200 hover:scale-105 active:scale-95">
        <Button
          variant="default"
          size="icon"
          onClick={toggleVisibility}
          className="rounded-full h-12 w-12"
        >
          <Mic className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
} 