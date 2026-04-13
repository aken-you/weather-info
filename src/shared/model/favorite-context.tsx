import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { MAX_FAVORITE_LIMIT } from '../config/favorite'

export interface Favorite {
  id: string
  address: string
  alias: string | null
}

interface FavoriteStore {
  getAll: () => Favorite[]
  getById: (id: string) => Favorite | undefined
  add: (address: string, alias: string | null) => void
  update: (id: string, newAlias: string | null) => void
  delete: (id: string) => void
}

const FavoriteContext = createContext<FavoriteStore | null>(null)

const STORAGE_KEY = 'weather-favorites'

interface FavoriteContextProviderProps {
  children: ReactNode
}

export function FavoriteContextProvider({ children }: FavoriteContextProviderProps) {
  const [items, setItems] = useState<Favorite[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  })

  /**
   * items가 변경될 때마다 localStorage에 저장
   */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const getAll = (): Favorite[] => {
    return [...items]
  }

  const getById = (id: string): Favorite | undefined => {
    return items.find(item => item.id === id)
  }

  const add = (address: string, alias: string | null) => {
    if (items.length >= MAX_FAVORITE_LIMIT) {
      alert(`최대 ${MAX_FAVORITE_LIMIT}개까지만 즐겨찾기를 추가할 수 있습니다.`)
      return
    }

    const newItem: Favorite = {
      id: crypto.randomUUID(),
      address,
      alias,
    }

    setItems(prev => [...prev, newItem])
  }

  const update = (id: string, newAlias: string | null) => {
    const index = items.findIndex(item => item.id === id)

    setItems(prev => prev.map((item, i) => (i === index ? { ...item, alias: newAlias } : item)))
  }

  const deleteItem = (id: string) => {
    const index = items.findIndex(item => item.id === id)

    if (index === -1) {
      return false
    }

    setItems(prev => prev.filter((_, i) => i !== index))
  }

  const value: FavoriteStore = {
    getAll,
    getById,
    add,
    update,
    delete: deleteItem,
  }

  return <FavoriteContext.Provider value={value}>{children}</FavoriteContext.Provider>
}

export function useFavoriteContext(): FavoriteStore {
  const context = useContext(FavoriteContext)

  if (!context) {
    throw new Error('useFavoriteContext must be used within FavoriteStoreProvider')
  }

  return context
}
