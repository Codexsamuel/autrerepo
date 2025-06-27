"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"



interface SearchResult {
  id: string
  title: string
  description: string
  url: string
  type: 'service' | 'page' | 'formation' | 'product'
}

const searchData: SearchResult[] = [// Services
  { id: '1', title: 'NovaCore CRM', description: 'Système de gestion de la relation client avec IA', url: '/novacore', type: 'service' },
  { id: '2', title: 'NovaWorld', description: 'Réseau social B2B professionnel', url: '/novaworld', type: 'service' },
  { id: '3', title: 'DL Style', description: 'Boutique en ligne premium', url: '/dl-style', type: 'service' },
  { id: '4', title: 'DL Travel', description: 'Plateforme de vente de billets d\'avion', url: '/dl-travel', type: 'service' },
  { id: '5', title: 'DL Bookmaker', description: 'Paris sportifs assistés par IA', url: '/dl-bookmaker', type: 'service' },
  
  // Pages
  { id: '6', title: 'Services', description: 'Découvrez tous nos services', url: '/services', type: 'page' },
  { id: '7', title: 'Formations', description: 'Formations professionnelles en ligne', url: '/formations', type: 'page' },
  { id: '8', title: 'Portfolio', description: 'Nos réalisations et projets', url: '/portfolio', type: 'page' },
  { id: '9', title: 'À Propos', description: 'En savoir plus sur DL Solutions', url: '/a-propos', type: 'page' },
  { id: '10', title: 'Contact', description: 'Contactez notre équipe', url: '/contact', type: 'page' },
  
  // Formations
  { id: '11', title: 'Marketing Digital', description: 'Formation complète en marketing digital', url: '/formations/marketing-digital', type: 'formation' },
  { id: '12', title: 'IA pour Entreprises', description: 'Intégration de l\'IA dans votre business', url: '/formations/ia-entreprises', type: 'formation' },
  { id: '13', title: 'E-commerce & Vente', description: 'Maîtriser la vente en ligne', url: '/formations/ecommerce-vente', type: 'formation' },
  { id: '14', title: 'Télévente & Prospection', description: 'Techniques de vente et prospection', url: '/formations/televente-prospection', type: 'formation' },
  { id: '15', title: 'SAV Excellence', description: 'Service après-vente de qualité', url: '/formations/sav-excellence', type: 'formation' },]
const typeColors = {
  service: 'bg-blue-100 text-blue-700',
  page: 'bg-gray-100 text-gray-700',
  formation: 'bg-green-100 text-green-700',
  product: 'bg-purple-100 text-purple-700',
}

const typeLabels = {
  service: 'Service',
  page: 'Page',
  formation: 'Formation',
  product: 'Produit',
}

export function SearchBar() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSelectedIndex(-1)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (query.trim() === "") {
      setResults([])
      setIsOpen(false)
      return
    }

    const filtered = searchData.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
    )

    setResults(filtered.slice(0, 8))
    setIsOpen(filtered.length > 0)
    setSelectedIndex(-1)
  }, [query])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => prev < results.length - 1 ? prev + 1 : 0)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => prev > 0 ? prev - 1 : results.length - 1)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (selectedIndex >= 0 && results[selectedIndex]) {
        window.location.href = results[selectedIndex].url
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false)
      setSelectedIndex(-1)
    }
  }

  const handleResultClick = (result: SearchResult) => {
    window.location.href = result.url
  }

  const clearSearch = () => {
    setQuery("")
    setResults([])
    setIsOpen(false)
    setSelectedIndex(-1)
    inputRef.current?.focus()
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto" ref={searchRef}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <Input
          ref={inputRef}
          type="text"
          placeholder="Rechercher un service, une formation, une page..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.trim() !== "" && setIsOpen(results.length > 0)}
          className="pl-10 pr-10 h-12 text-base border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 rounded-xl"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <X className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
          </button>
        )}
      </div>

      {/* Résultats de recherche */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-96 overflow-y-auto">
          <div className="p-2">
            {results.map((result, index) => (
              <div
                key={result.id}
                onClick={() => handleResultClick(result)}
                className={`p-3 rounded-lg cursor-pointer transition-all duration-150 ${
                  index === selectedIndex
                    ? 'bg-blue-50 border border-blue-200'
                    : 'hover:bg-gray-50 border border-transparent'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-gray-900 truncate">
                        {result.title}
                      </h4>
                      <Badge className={`text-xs ${typeColors[result.type]}`}>typeLabels[result.type]</Badge>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {result.description}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400 ml-2 flex-shrink-0" />
                </div>
              </div>
            ))}
          </div>
          
          {/* Footer avec statistiques */}
          <div className="border-t border-gray-100 px-3 py-2 bg-gray-50 rounded-b-xl">
            <p className="text-xs text-gray-500">
              {results.length} résultat{results.length > 1 ? 's' : ''} trouvé{results.length > 1 ? 's' : ''}
            </p>
          </div>
        </div>
      )}

      {/* Aucun résultat */}
      {isOpen && results.length === 0 && query.trim() !== "" && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 p-4">
          <div className="text-center">
            <Search className="h-8 w-8 text-gray-300 mx-auto mb-2" />
            <p className="text-gray-500">Aucun résultat trouvé pour "{query}"</p>
            <p className="text-sm text-gray-400 mt-1">
              Essayez avec d'autres mots-clés
            </p>
          </div>
        </div>
      )}
    </div>
  )
} 