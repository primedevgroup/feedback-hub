'use client'

import { AuthLoading } from '@/components/auth-loading'
import { useClient } from '@/hooks/use-mobile'
import { api } from '@/lib/api'
import React, { createContext, useContext, useEffect, useState } from 'react'

interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  login: (user: User) => void
  logout: () => Promise<void>
  isAuthenticated: boolean
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const isClient = useClient()

  useEffect(() => {
    if (!isClient) return
    
    // Não verificar autenticação automaticamente
    // A API retornará erro 401 quando necessário
    setIsLoading(false)
  }, [isClient])

  const login = (userData: User) => {
    setUser(userData)
  }

  const logout = async () => {
    try {
      await api.post('/auth/logout')
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
    } finally {
      setUser(null)
    }
  }

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isLoading
  }

  // Não renderizar nada até confirmar que estamos no cliente
  if (!isClient) {
    return <AuthLoading />
  }

  if (isLoading) {
    return <AuthLoading />
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
} 