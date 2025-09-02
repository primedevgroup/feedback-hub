'use client'

import { useAuth } from '@/contexts/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { AuthLoading } from './auth-loading'

interface AuthRedirectProps {
  children: React.ReactNode
}

export function AuthRedirect({ children }: AuthRedirectProps) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Só redirecionar se não estiver carregando e estiver autenticado
    if (!isLoading && isAuthenticated) {
      router.push('/squads')
    }
  }, [isAuthenticated, isLoading, router])

  // Mostrar loading enquanto verifica autenticação
  if (isLoading) {
    return <AuthLoading />
  }

  // Não renderizar nada se estiver autenticado (será redirecionado)
  if (isAuthenticated) {
    return null
  }

  return <>{children}</>
} 