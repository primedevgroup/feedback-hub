'use client'

import { useAuth } from '@/contexts/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { AuthLoading } from './auth-loading'

interface InviteAuthRedirectProps {
  children: React.ReactNode
  squadId?: string | null
}

export function InviteAuthRedirect({ children, squadId }: InviteAuthRedirectProps) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Só redirecionar se não estiver carregando, estiver autenticado E não houver squadId
    // Se houver squadId, a lógica de join squad será tratada na página
    if (!isLoading && isAuthenticated && !squadId) {
      router.push('/squads')
    }
  }, [isAuthenticated, isLoading, router, squadId])

  // Mostrar loading enquanto verifica autenticação
  if (isLoading) {
    return <AuthLoading />
  }

  // Não renderizar nada se estiver autenticado e não houver squadId (será redirecionado)
  if (isAuthenticated && !squadId) {
    return null
  }

  return <>{children}</>
}
