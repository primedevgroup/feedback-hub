'use client'
import { FormProvider, useForm } from 'react-hook-form'
import { Input } from "@/components/form/input";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { toast } from "sonner";
import { GoogleLoginButton } from "@/components/google-login-button";

export default function LoginPage() {
  const form = useForm()
  const router = useRouter()

  async function onSubmit(data: any) {
  const loadingToast = toast.loading('Fazendo login...')
  
  try {
    const response = await api.post('/auth/signin', data)
    const token = response.data.access_token

    await fetch('/api/auth/set-cookie', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token })
    })

    toast.dismiss(loadingToast)
    toast.success('Login realizado com sucesso!')

    router.push('/dashboard')
  } catch (error: any) {
    console.error('Erro ao fazer login:', error)
    
    toast.dismiss(loadingToast)
    
    if (error.response?.status === 401) {
      toast.error('Email ou senha incorretos')
    } else if (error.response?.status === 400) {
      toast.error('Dados inválidos. Verifique as informações fornecidas')
    } else {
      toast.error('Erro ao fazer login. Tente novamente')
    }
  }
}

  return (
    <div className="flex justify-center gap-8 flex-col items-center min-h-screen">
      <h1 className="text-4xl font-extrabold">Feedback Hub</h1>
      <div className="w-[448px] flex flex-col gap-4 p-6 rounded-lg shadow-lg bg-gradient-to-br from-[#18181B] to-[#18181B00] border border-gray-700">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold">Login to your account</h3>
          <Button className="cursor-pointer" variant={'ghost'} onClick={() => router.push('/create-account')}>Sign up</Button>
        </div>
        <span>Enter your email below to login to your account</span>

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <Input 
              name="email" 
              label="Email" 
              placeholder="Enter your email" 
              type="email"
            />

            <Input 
              name="password" 
              label="Password" 
              placeholder="Enter your password" 
              type="password"
            />

              <Button variant={'link'} type="button" onClick={() => router.push('/forgot-password')} className="w-full cursor-pointer">
              Forgot password? Click here
            </Button>
              <Button type="submit" className="w-full cursor-pointer">
              Login
            </Button>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-px bg-border"></div>
                <span className="text-sm text-muted-foreground">ou</span>
                <div className="flex-1 h-px bg-border"></div>
              </div>
              <GoogleLoginButton  className="w-full flex justify-center" />
          </form>
        </FormProvider>
      </div>
    </div>
  )
}
