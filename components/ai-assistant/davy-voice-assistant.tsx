"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Mic, MicOff, Volume2, VolumeX, Bot, X, Send, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
  action?: string
  data?: any
}

interface DavyAction {
  type: 'create_document' | 'send_email' | 'crm_update' | 'hr_task' | 'search' | 'help'
  title: string
  description: string
  icon: string
  handler: () => void
}

export function DavyVoiceAssistant() {
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [recognition, setRecognition] = useState<any>(null)
  const [synthesis, setSynthesis] = useState<SpeechSynthesis | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Actions disponibles pour DAVY
  const availableActions: DavyAction[] = [
    {
      type: 'create_document',
      title: 'Créer un document',
      description: 'Générer un contrat, rapport ou fiche',
      icon: '📄',
      handler: () => handleAction('create_document')
    },
    {
      type: 'send_email',
      title: 'Envoyer un email',
      description: 'Rédiger et envoyer un email',
      icon: '📧',
      handler: () => handleAction('send_email')
    },
    {
      type: 'crm_update',
      title: 'Mettre à jour CRM',
      description: 'Modifier les données clients',
      icon: '👥',
      handler: () => handleAction('crm_update')
    },
    {
      type: 'hr_task',
      title: 'Tâche RH',
      description: 'Gérer les ressources humaines',
      icon: '👤',
      handler: () => handleAction('hr_task')
    },
    {
      type: 'search',
      title: 'Rechercher',
      description: 'Chercher dans la base de données',
      icon: '🔍',
      handler: () => handleAction('search')
    },
    {
      type: 'help',
      title: 'Aide',
      description: 'Voir les commandes disponibles',
      icon: '❓',
      handler: () => handleAction('help')
    }
  ]

  // Initialisation de la reconnaissance vocale
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // @ts-ignore
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      if (SpeechRecognition) {
        const recognitionInstance = new SpeechRecognition()
        recognitionInstance.continuous = false
        recognitionInstance.interimResults = false
        recognitionInstance.lang = 'fr-FR'
        
        recognitionInstance.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript
          setInputText(transcript)
          handleUserInput(transcript)
        }
        
        recognitionInstance.onerror = (event: any) => {
          console.error('Erreur de reconnaissance vocale:', event.error)
          setIsListening(false)
        }
        
        recognitionInstance.onend = () => {
          setIsListening(false)
        }
        
        setRecognition(recognitionInstance)
      }
      
      setSynthesis(window.speechSynthesis)
    }
  }, [])

  // Auto-scroll vers le bas
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Gestion de l'entrée utilisateur
  const handleUserInput = useCallback(async (input: string) => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputText("")
    setIsProcessing(true)

    try {
      // Simulation de traitement IA (remplacer par vraie API)
      const response = await processUserInput(input)
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response.message,
        timestamp: new Date(),
        action: response.action,
        data: response.data
      }

      setMessages(prev => [...prev, assistantMessage])
      
      // Synthèse vocale de la réponse
      if (synthesis && response.speak) {
        speakText(response.message)
      }
    } catch (error) {
      console.error('Erreur de traitement:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: "Désolé, j'ai rencontré une erreur. Pouvez-vous reformuler ?",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsProcessing(false)
    }
  }, [synthesis])

  // Traitement de l'entrée utilisateur avec IA
  const processUserInput = async (input: string): Promise<any> => {
    // Simulation de traitement IA - remplacer par vraie API OpenAI/Gemini
    const lowerInput = input.toLowerCase()
    
    if (lowerInput.includes('créer') || lowerInput.includes('générer') || lowerInput.includes('document')) {
      return {
        message: "Je vais vous aider à créer un document. Quel type de document souhaitez-vous ? (Contrat, Rapport, Fiche RH, etc.)",
        action: 'create_document',
        speak: true,
        data: { type: 'document_creation' }
      }
    }
    
    if (lowerInput.includes('email') || lowerInput.includes('mail')) {
      return {
        message: "Je vais vous aider à rédiger un email. À qui voulez-vous l'envoyer et quel est le sujet ?",
        action: 'send_email',
        speak: true,
        data: { type: 'email_composition' }
      }
    }
    
    if (lowerInput.includes('client') || lowerInput.includes('crm')) {
      return {
        message: "Je vais mettre à jour le CRM. Quel client voulez-vous modifier et quelles informations ?",
        action: 'crm_update',
        speak: true,
        data: { type: 'crm_update' }
      }
    }
    
    if (lowerInput.includes('rh') || lowerInput.includes('employé') || lowerInput.includes('collaborateur')) {
      return {
        message: "Je vais vous aider avec les tâches RH. Que souhaitez-vous faire ? (Contrat, Fiche de paie, Évaluation, etc.)",
        action: 'hr_task',
        speak: true,
        data: { type: 'hr_task' }
      }
    }
    
    if (lowerInput.includes('rechercher') || lowerInput.includes('chercher')) {
      return {
        message: "Je vais effectuer une recherche. Que cherchez-vous exactement ?",
        action: 'search',
        speak: true,
        data: { type: 'search' }
      }
    }
    
    if (lowerInput.includes('aide') || lowerInput.includes('help') || lowerInput.includes('commandes')) {
      return {
        message: "Voici ce que je peux faire : créer des documents, envoyer des emails, mettre à jour le CRM, gérer les tâches RH, effectuer des recherches. Que souhaitez-vous faire ?",
        action: 'help',
        speak: true,
        data: { type: 'help' }
      }
    }
    
    // Réponse par défaut
    return {
      message: "Je n'ai pas bien compris. Pouvez-vous reformuler ou dire 'aide' pour voir mes capacités ?",
      speak: true,
      data: { type: 'general' }
    }
  }

  // Synthèse vocale
  const speakText = (text: string) => {
    if (!synthesis) return
    
    setIsSpeaking(true)
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'fr-FR'
    utterance.rate = 0.9
    utterance.pitch = 1.1
    
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)
    
    synthesis.speak(utterance)
  }

  // Gestion des actions
  const handleAction = (actionType: string) => {
    const action = availableActions.find(a => a.type === actionType)
    if (action) {
      action.handler()
    }
  }

  // Démarrage/arrêt de l'écoute
  const toggleListening = () => {
    if (!recognition) {
      alert('La reconnaissance vocale n\'est pas supportée par votre navigateur')
      return
    }
    
    if (isListening) {
      recognition.stop()
    } else {
      recognition.start()
      setIsListening(true)
    }
  }

  // Envoi du message
  const handleSend = () => {
    if (inputText.trim()) {
      handleUserInput(inputText)
    }
  }

  // Gestion des touches
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* Bouton flottant DAVY */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg hover:shadow-xl transition-all duration-300"
          size="icon"
        >
          <Bot className="h-8 w-8 text-white" />
        </Button>
      </motion.div>

      {/* Interface DAVY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 w-96 h-[600px] z-40"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="h-full shadow-2xl border-0 bg-white/95 backdrop-blur-xl">
              <CardHeader className="pb-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-white/20 rounded-full flex items-center justify-center">
                      <Bot className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">DAVY</CardTitle>
                      <p className="text-sm text-blue-100">Assistant IA Vocal</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:bg-white/20"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="p-0 h-full flex flex-col">
                {/* Zone de messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.length === 0 ? (
                    <div className="text-center py-8">
                      <Bot className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="font-medium text-gray-900 mb-2">Bonjour ! Je suis DAVY</h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Votre assistant IA vocal. Dites-moi ce que je peux faire pour vous !
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {availableActions.slice(0, 4).map((action) => (
                          <Button
                            key={action.type}
                            variant="outline"
                            size="sm"
                            onClick={action.handler}
                            className="text-xs h-8"
                          >
                            <span className="mr-1">{action.icon}</span>
                            {action.title}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg ${
                            message.type === 'user'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          {message.action && (
                            <Badge variant="secondary" className="mt-2 text-xs">
                              {message.action}
                            </Badge>
                          )}
                        </div>
                      </motion.div>
                    ))
                  )}
                  
                  {isProcessing && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="bg-gray-100 p-3 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span className="text-sm text-gray-600">DAVY réfléchit...</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Zone de saisie */}
                <div className="p-4 border-t bg-gray-50">
                  <div className="flex items-center space-x-2">
                    <Button
                      onClick={toggleListening}
                      variant={isListening ? "destructive" : "outline"}
                      size="icon"
                      className="h-10 w-10"
                    >
                      {isListening ? (
                        <MicOff className="h-4 w-4" />
                      ) : (
                        <Mic className="h-4 w-4" />
                      )}
                    </Button>
                    
                    <div className="flex-1 relative">
                      <Input
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Tapez votre message ou parlez..."
                        className="pr-10"
                        disabled={isProcessing}
                      />
                      <Button
                        onClick={handleSend}
                        size="icon"
                        className="absolute right-1 top-1 h-8 w-8"
                        disabled={!inputText.trim() || isProcessing}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <Button
                      onClick={() => isSpeaking && synthesis?.cancel()}
                      variant="outline"
                      size="icon"
                      className="h-10 w-10"
                    >
                      {isSpeaking ? (
                        <VolumeX className="h-4 w-4" />
                      ) : (
                        <Volume2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  
                  {/* Indicateurs de statut */}
                  <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                    <div className="flex items-center space-x-4">
                      {isListening && (
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                          <span>Écoute...</span>
                        </div>
                      )}
                      {isSpeaking && (
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                          <span>Parle...</span>
                        </div>
                      )}
                    </div>
                    <span>DAVY v2.0</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
} 