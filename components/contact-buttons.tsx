"use client";

import { Button } from "@/components/ui/button";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { useState } from "react";



export function ContactButtons() {
  const [isExpanded, setIsExpanded] = useState(false)

  const contactMethods = [{
      icon: Phone,
      label: "Téléphone",
      value: "+237 694 341 586",
      action: () => window.open("tel:+237694341586"),
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: Mail,
      label: "Email",
      value: "sobam@daveandlucesolutions.com",
      action: () => window.open("mailto:sobam@daveandlucesolutions.com"),
      color: "from-blue-500 to-indigo-600",
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "Chat direct",
      action: () => window.open("https://wa.me/00237694341586"),
      color: "from-green-400 to-green-600",
    },
    {
      icon: MapPin,
      label: "Adresse",
      value: "2 rue École de Police, Yaoundé",
      action: () => window.open("https://maps.google.com/?q=2+rue+École+de+Police,Yaoundé,Cameroun"),
      color: "from-red-500 to-pink-600",
    },]
  return (
    <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-40">
      <div className="flex flex-col gap-2">
        {/* Toggle Button */}
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
          size="icon"
        >
          <Phone className="h-6 w-6" />
        </Button>

        {/* Contact Methods */}
        <div
          className={`flex flex-col gap-2 transition-all duration-300 ${
            isExpanded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
        >
          {contactMethods.map((method, index) => (
            <div key={index} className="group relative" style={{ transitionDelay: `${index * 50}ms` }}>
              <Button
                onClick={method.action}
                className={`w-12 h-12 rounded-full bg-gradient-to-r ${method.color} hover:scale-110 shadow-lg hover:shadow-xl transition-all duration-300`}
                size="icon"
              >
                <method.icon className="h-5 w-5" />
              </Button>

              {/* Tooltip */}
              <div className="absolute left-16 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div className="font-semibold">{method.label}</div>
                <div className="text-gray-300 text-xs">{method.value}</div>
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Hours indicator */}
        <div
          className={`transition-all duration-300 ${
            isExpanded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          <div className="bg-white rounded-lg shadow-lg p-3 text-center">
            <Clock className="h-4 w-4 text-gray-600 mx-auto mb-1" />
            <div className="text-xs text-gray-600">
              <div className="font-semibold">Lun-Ven</div>
              <div>9h-18h</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
