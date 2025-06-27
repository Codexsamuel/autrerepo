import { useState, useEffect, useCallback, useMemo } from "react";
// Types pour les produits
export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  currency: string
  supplier: string
  category: string
  images: string[]
  url: string
  stock: number
  rating?: number
  reviews?: number
  tags: string[]
  createdAt: string
  updatedAt: string
  lastSync?: string
  status: 'active' | 'inactive' | 'out_of_stock'
}

// Types pour les filtres
export interface ProductFilters {
  search?: string
  supplier?: string
  category?: string
  minPrice?: number
  maxPrice?: number
  status?: string
  inStock?: boolean
  hasRating?: boolean
}

// Types pour le tri
export type SortOption = 'name' | 'price' | 'rating' | 'createdAt' | 'stock'
export type SortDirection = 'asc' | 'desc'

// Types pour la pagination
export interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

// Types pour la réponse API
export interface ProductsResponse {
  products: Product[]
  pagination: Pagination
}

// Hook principal pour gérer les produits
export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<ProductFilters>({})
  const [sortBy, setSortBy] = useState<SortOption>('createdAt')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false
  })

  // Fonction pour construire l'URL avec les paramètres
  const buildApiUrl = useCallback((page: number = 1) => {
    const params = new URLSearchParams()
    
    // Ajouter les filtres
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value.toString())
      }
    })
    
    // Ajouter la pagination
    params.append('page', page.toString())
    params.append('limit', pagination.limit.toString())
    
    return `/api/products?${params.toString()}`
  }, [filters, pagination.limit])

  // Fonction pour charger les produits
  const fetchProducts = useCallback(async (page: number = 1) => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(buildApiUrl(page))
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des produits')
      }
      
      const data: ProductsResponse = await response.json()
      setProducts(data.products)
      setPagination(data.pagination)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue')
    } finally {
      setLoading(false)
    }
  }, [buildApiUrl])

  // Fonction pour créer un produit
  const createProduct = useCallback(async (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      })
      
      if (!response.ok) {
        throw new Error('Erreur lors de la création du produit')
      }
      
      const newProduct = await response.json()
      setProducts(prev => [newProduct, ...prev])
      return newProduct
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // Fonction pour mettre à jour un produit
  const updateProduct = useCallback(async (id: string, updates: Partial<Product>) => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch('/api/products', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, ...updates }),
      })
      
      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour du produit')
      }
      
      const updatedProduct = await response.json()
      setProducts(prev => prev.map(p => p.id === id ? updatedProduct : p))
      return updatedProduct
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // Fonction pour supprimer un produit
  const deleteProduct = useCallback(async (id: string) => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`/api/products?id=${id}`, {
        method: 'DELETE',
      })
      
      if (!response.ok) {
        throw new Error('Erreur lors de la suppression du produit')
      }
      
      setProducts(prev => prev.filter(p => p.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // Fonction pour synchroniser les produits
  const syncProducts = useCallback(async (supplier?: string) => {
    setLoading(true)
    setError(null)
    
    try {
      const url = supplier 
        ? `/api/products/scrape?supplier=${supplier}`
        : '/api/products/scrape'
      
      const response = await fetch(url, {
        method: 'POST',
      })
      
      if (!response.ok) {
        throw new Error('Erreur lors de la synchronisation')
      }
      
      // Recharger les produits après synchronisation
      await fetchProducts(1)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue')
      throw err
    } finally {
      setLoading(false)
    }
  }, [fetchProducts])

  // Fonction pour mettre à jour les filtres
  const updateFilters = useCallback((newFilters: Partial<ProductFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
    setPagination(prev => ({ ...prev, page: 1 })) // Retour à la première page
  }, [])

  // Fonction pour changer de page
  const goToPage = useCallback((page: number) => {
    setPagination(prev => ({ ...prev, page }))
  }, [])

  // Fonction pour changer la limite par page
  const setLimit = useCallback((limit: number) => {
    setPagination(prev => ({ ...prev, limit, page: 1 }))
  }, [])

  // Fonction pour changer le tri
  const setSorting = useCallback((sortBy: SortOption, direction: SortDirection = 'desc') => {
    setSortBy(sortBy)
    setSortDirection(direction)
  }, [])

  // Produits triés et filtrés localement (pour les cas où on veut trier côté client)
  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => {
      let aValue: any = a[sortBy]
      let bValue: any = b[sortBy]
      // Gestion des valeurs undefined
      if (aValue === undefined) aValue = sortDirection === 'asc' ? -Infinity : Infinity
      if (bValue === undefined) bValue = sortDirection === 'asc' ? -Infinity : Infinity
      
      // Tri numérique
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue
      }
      
      // Tri textuel
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      }
      
      return 0
    })
  }, [products, sortBy, sortDirection])

  // Statistiques calculées
  const stats = useMemo(() => {
    const totalProducts = products.length
    const activeProducts = products.filter(p => p.status === 'active').length
    const outOfStockProducts = products.filter(p => p.stock === 0).length
    const totalValue = products.reduce((sum, p) => sum + p.price, 0)
    const averagePrice = totalProducts > 0 ? totalValue / totalProducts : 0
    
    const suppliers = [...new Set(products.map(p => p.supplier))]
    const categories = [...new Set(products.map(p => p.category))]
    return {
      totalProducts,
      activeProducts,
      outOfStockProducts,
      totalValue,
      averagePrice,
      suppliersCount: suppliers.length,
      categoriesCount: categories.length,
      suppliers,
      categories
    }
  }, [products])

  // Charger les produits au montage et quand les filtres changent
  useEffect(() => {
    fetchProducts(pagination.page)
  }, [fetchProducts, pagination.page])

  return {
    // État
    products: sortedProducts,
    loading,
    error,
    filters,
    sortBy,
    sortDirection,
    pagination,
    stats,
    
    // Actions
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    syncProducts,
    updateFilters,
    goToPage,
    setLimit,
    setSorting,
    
    // Utilitaires
    clearError: () => setError(null),
    clearFilters: () => setFilters({}),
  }
} 