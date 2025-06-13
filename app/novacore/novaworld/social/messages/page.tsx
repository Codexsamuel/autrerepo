"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Image as ImageIcon,
  Send,
  Check,
  CheckCheck,
} from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "me" | "other"
  timestamp: string
  status: "sent" | "delivered" | "read"
}

interface Conversation {
  id: string
  name: string
  avatar: string
  lastMessage: string
  timestamp: string
  unread: number
  online: boolean
  messages: Message[]
}

export default function MessagesPage() {
  const [conversations] = useState<Conversation[]>([
    {
      id: "1",
      name: "Marie Smith",
      avatar: "MS",
      lastMessage: "Bonjour, comment puis-je vous aider ?",
      timestamp: "10:30",
      unread: 2,
      online: true,
      messages: [
        {
          id: "1",
          content: "Bonjour, comment puis-je vous aider ?",
          sender: "other",
          timestamp: "10:30",
          status: "read"
        },
        {
          id: "2",
          content: "Je suis intéressé par votre projet",
          sender: "me",
          timestamp: "10:31",
          status: "delivered"
        }
      ]
    },
    {
      id: "2",
      name: "John Doe",
      avatar: "JD",
      lastMessage: "Merci pour votre retour",
      timestamp: "Hier",
      unread: 0,
      online: false,
      messages: [
        {
          id: "1",
          content: "Merci pour votre retour",
          sender: "other",
          timestamp: "Hier",
          status: "read"
        }
      ]
    }
  ])

  const [selectedConversation, setSelectedConversation] = useState<string>("1")
  const [newMessage, setNewMessage] = useState("")

  const currentConversation = conversations.find(c => c.id === selectedConversation)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Conversations List */}
          <div className="md:col-span-1 space-y-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher une conversation..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              {conversations.map((conversation) => (
                <Card
                  key={conversation.id}
                  className={`cursor-pointer hover:shadow-md transition-shadow ${
                    selectedConversation === conversation.id ? "border-blue-500" : ""
                  }`}
                  onClick={() => setSelectedConversation(conversation.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-blue-600 font-semibold">{conversation.avatar}</span>
                        </div>
                        {conversation.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold truncate">{conversation.name}</h3>
                          <span className="text-sm text-gray-500">{conversation.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                      </div>
                      {conversation.unread > 0 && (
                        <Badge variant="secondary">{conversation.unread}</Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="md:col-span-2">
            {currentConversation ? (
              <Card className="h-[600px] flex flex-col">
                {/* Chat Header */}
                <div className="p-4 border-b flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-semibold">{currentConversation.avatar}</span>
                      </div>
                      {currentConversation.online && (
                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold">{currentConversation.name}</h3>
                      <p className="text-sm text-gray-500">
                        {currentConversation.online ? "En ligne" : "Hors ligne"}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Phone className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Video className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4">
                  {currentConversation.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          message.sender === "me"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        <p>{message.content}</p>
                        <div className="flex items-center justify-end gap-1 mt-1">
                          <span className="text-xs opacity-70">{message.timestamp}</span>
                          {message.sender === "me" && (
                            <span className="text-xs">
                              {message.status === "read" ? (
                                <CheckCheck className="h-3 w-3" />
                              ) : message.status === "delivered" ? (
                                <Check className="h-3 w-3" />
                              ) : null}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Paperclip className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <ImageIcon className="h-5 w-5" />
                    </Button>
                    <input
                      type="text"
                      placeholder="Écrivez votre message..."
                      className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <Button>
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="h-[600px] flex items-center justify-center">
                <p className="text-gray-500">Sélectionnez une conversation pour commencer</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 