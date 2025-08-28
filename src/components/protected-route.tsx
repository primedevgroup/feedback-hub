'use client'

import { useAuth } from '@/contexts/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { AuthLoading } from './auth-loading'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Só redirecionar se não estiver carregando e não estiver autenticado
    if (!isLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, isLoading, router])

  // Mostrar loading enquanto verifica autenticação
  if (isLoading) {
    return <AuthLoading />
  }

  // Não renderizar nada se não estiver autenticado (será redirecionado)
  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
} 