'use client'

import { useAuth } from '@/contexts/auth-context'
import { api } from '@/lib/api'
import { GoogleLogin } from '@react-oauth/google'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface GoogleLoginButtonProps {
  onSuccess?: () => void
  className?: string
}

export function GoogleLoginButton({ onSuccess, className }: GoogleLoginButtonProps) {
  const router = useRouter()
  const { login } = useAuth()

  // Verificar se o Google OAuth está configurado
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID

  const handleSuccess = async (credentialResponse: any) => {
    const loadingToast = toast.loading('Fazendo login com Google...')
    
    try {
      const response = await api.post('/auth/signin/google', {
        provider: 'google',
        idToken: credentialResponse.credential
      })

      const { access_token, user } = response.data

      // Usar o contexto de autenticação para fazer login
      login(access_token, user)

      toast.dismiss(loadingToast)
      toast.success('Login realizado com sucesso!')

      if (onSuccess) {
        onSuccess()
      } else {
        router.push('/dashboard')
      }
    } catch (error: any) {
      console.error('Erro ao fazer login com Google:', error)
      
      toast.dismiss(loadingToast)
      
      if (error.response?.status === 401) {
        toast.error('Falha na autenticação com Google')
      } else if (error.response?.status === 400) {
        toast.error('Dados inválidos')
      } else {
        toast.error('Erro ao fazer login com Google. Tente novamente')
      }
    }
  }

  const handleError = () => {
    toast.error('Erro ao fazer login com Google')
  }

  // Se o Google OAuth não estiver configurado, mostrar mensagem de erro
  if (!googleClientId || googleClientId === 'seu_client_id_aqui') {
    return (
      <div className={`${className} flex items-center justify-center`}>
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">
            Google OAuth não configurado
          </p>
          <p className="text-xs text-muted-foreground">
            Configure NEXT_PUBLIC_GOOGLE_CLIENT_ID no arquivo .env.local
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={className}>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        useOneTap
        theme="filled_black"
        size="large"
        text="continue_with"
        shape="rectangular"
        locale="pt-BR"
      />
    </div>
  )
} 