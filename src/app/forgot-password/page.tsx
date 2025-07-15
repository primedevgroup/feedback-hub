'use client'

import { Input } from "@/components/form/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { FormProvider, useForm } from "react-hook-form"
import { useState } from "react"
import { toast } from "sonner"
import { api } from "@/lib/api"
import { AuthRedirect } from '@/components/auth-redirect'

export default function ForgotPasswordPage() {
  const emailForm = useForm()
  const codeForm = useForm()
  const passwordForm = useForm()

  const [emailSent, setEmailSent] = useState(false)
  const [codeSent, setCodeSent] = useState(false)
  const [email, setEmail] = useState('')

  const router = useRouter()

  async function handleSendEmail(data: any) {
    const loadingToast = toast.loading('Enviando email de verificação...')
    
    try {
      await api.post('/email-verification/send', {
        email: data.email
      })

      setEmail(data.email)
      setEmailSent(true)
      
      toast.dismiss(loadingToast)
      toast.success('Email de verificação enviado!')
    } catch (error: any) {
      console.error('Erro ao enviar email:', error)
      
      toast.dismiss(loadingToast)
      
      if (error.response?.status === 404) {
        toast.error('Email não encontrado')
      } else if (error.response?.status === 400) {
        toast.error('Email inválido')
      } else {
        toast.error('Erro ao enviar email. Tente novamente')
      }
    }
  }

  async function handleResendCode() {
    if (email) {
      const loadingToast = toast.loading('Reenviando código...')
      
      try {
        await api.post('/email-verification/send', {
          email: email
        })
        
        toast.dismiss(loadingToast)
        toast.info('Código reenviado!')
      } catch (error: any) {
        console.error('Erro ao reenviar código:', error)
        
        toast.dismiss(loadingToast)
        toast.error('Erro ao reenviar código. Tente novamente')
      }
    }
  }

  async function handleVerifyCode(data: any) {
    const loadingToast = toast.loading('Verificando código...')
    
    try {
      await api.post('/email-verification/verify', {
        email: email,
        code: data.code
      })

      setCodeSent(true)
      
      toast.dismiss(loadingToast)
      toast.success('Código verificado com sucesso!')
    } catch (error: any) {
      console.error('Erro ao verificar código:', error)
      
      toast.dismiss(loadingToast)
      
      if (error.response?.status === 400) {
        toast.error('Código inválido')
      } else if (error.response?.status === 404) {
        toast.error('Código não encontrado')
      } else {
        toast.error('Erro ao verificar código. Tente novamente')
      }
    }
  }

  function handleResetPassword(data: any) {
    if (data['new-password'] && data['confirm-new-password']) {
      if (data['new-password'] !== data['confirm-new-password']) {
        toast.error('As senhas não coincidem')
        return
      }
      
      toast.success('Senha redefinida com sucesso!')
      router.push('/login')
    }
  }

  return (
    <AuthRedirect>
      <div className="flex justify-center gap-8 flex-col items-center min-h-screen">
        <h1 className="text-4xl font-extrabold">Feedback Hub</h1>
        
        {!emailSent ? (
          <div className="w-[448px] flex flex-col gap-4 p-6 rounded-lg shadow-lg bg-gradient-to-br from-[#18181B] to-[#18181B00] border border-gray-700">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">Esqueceu sua senha?</h3>
              <Button className="cursor-pointer" variant={'ghost'} onClick={() => router.push('/login')}>Voltar ao login</Button>
            </div>
            <span>Digite seu email para receber um código de verificação</span>

            <FormProvider {...emailForm}>
              <form onSubmit={emailForm.handleSubmit(handleSendEmail)} className="flex flex-col gap-4">
                <Input 
                  name="email" 
                  label="Email" 
                  placeholder="Digite seu email" 
                  type="email"
                />
                <Button type="submit" className="w-full cursor-pointer">
                  Enviar código
                </Button>
              </form>
            </FormProvider>
          </div>
        ) : !codeSent ? (
          <div className="w-[448px] flex flex-col gap-4 p-6 rounded-lg shadow-lg bg-gradient-to-br from-[#18181B] to-[#18181B00] border border-gray-700">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">Verificar código</h3>
              <Button className="cursor-pointer" variant={'ghost'} onClick={() => router.push('/login')}>Voltar ao login</Button>
            </div>
            <span>Digite o código enviado para {email}</span>

            <FormProvider {...codeForm}>
              <form onSubmit={codeForm.handleSubmit(handleVerifyCode)} className="flex flex-col gap-4">
                <Input 
                  name="code" 
                  label="Código" 
                  placeholder="Digite o código" 
                  type="text"
                />
                <Button type="submit" className="w-full cursor-pointer">
                  Verificar código
                </Button>
                <Button type="button" variant="outline" onClick={handleResendCode} className="w-full cursor-pointer">
                  Reenviar código
                </Button>
              </form>
            </FormProvider>
          </div>
        ) : (
          <div className="w-[448px] flex flex-col gap-4 p-6 rounded-lg shadow-lg bg-gradient-to-br from-[#18181B] to-[#18181B00] border border-gray-700">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">Nova senha</h3>
              <Button className="cursor-pointer" variant={'ghost'} onClick={() => router.push('/login')}>Voltar ao login</Button>
            </div>
            <span>Digite sua nova senha</span>

            <FormProvider {...passwordForm}>
              <form onSubmit={passwordForm.handleSubmit(handleResetPassword)} className="flex flex-col gap-4">
                <Input 
                  name="new-password" 
                  label="Nova senha" 
                  placeholder="Digite sua nova senha" 
                  type="password"
                />
                <Input 
                  name="confirm-new-password" 
                  label="Confirmar nova senha" 
                  placeholder="Confirme sua nova senha" 
                  type="password"
                />
                <Button type="submit" className="w-full cursor-pointer">
                  Redefinir senha
                </Button>
              </form>
            </FormProvider>
          </div>
        )}
      </div>
    </AuthRedirect>
  )
}
