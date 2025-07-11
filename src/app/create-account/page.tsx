'use client'
import { Input } from "@/components/form/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { FormProvider, useForm } from "react-hook-form"
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { api } from "@/lib/api"
import { toast } from "sonner"
import { GoogleLoginButton } from "@/components/google-login-button"
import { AuthRedirect } from '@/components/auth-redirect'

const createAccountSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password')
}).refine(data => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: 'Passwords do not match',
})

type CreateAccountData = z.infer<typeof createAccountSchema>

export default function CreateAccountPage() {
  const form = useForm<CreateAccountData>({
    resolver: zodResolver(createAccountSchema)
  })

  const router = useRouter()


async function onSubmit(data: CreateAccountData) {
  const loadingToast = toast.loading('Criando sua conta...')
  
  try {
    const response = await api.post('/auth/signup', {
      name: data.name,
      email: data.email,
      password: data.password
    })

    toast.dismiss(loadingToast)
    toast.success('Conta criada com sucesso!')

    router.push('/login')
  } catch (error: any) {
    console.error('Erro ao criar conta:', error.response?.data || error.message)

    toast.dismiss(loadingToast)
    
    if (error.response?.status === 409) {
      toast.error('Este email já está em uso')
    } else if (error.response?.status === 400) {
      toast.error('Dados inválidos. Verifique as informações fornecidas')
    } else {
      toast.error('Erro ao criar conta. Tente novamente')
    }
  }
}



  return (
    <AuthRedirect>
      <div className="flex justify-center gap-8 flex-col items-center min-h-screen">
        <h1 className="text-4xl font-extrabold">Feedback Hub</h1>
        <div className="w-[448px] flex flex-col gap-4 p-6 rounded-lg shadow-lg bg-gradient-to-br from-[#18181B] to-[#18181B00] border border-gray-700">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Create your account</h3>
            <Button className="cursor-pointer" variant={'ghost'} onClick={() => router.push('/login')}>Login</Button>
          </div>
          <span>Enter your email and password below to create your account</span>

          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <Input 
                name="name" 
                label="Name" 
                placeholder="Enter your name" 
                type="text"
              />

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

              <Input 
                name="confirmPassword" 
                label="Confirm password" 
                placeholder="Confirm your password" 
                type="password"
              /> 
              <Button type="submit" className="w-full cursor-pointer">
                Create account
              </Button>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-px bg-border"></div>
                <span className="text-sm text-muted-foreground">ou</span>
                <div className="flex-1 h-px bg-border"></div>
              </div>
              <GoogleLoginButton className="w-full flex justify-center" />
            </form>
          </FormProvider>
        </div>
      </div>
    </AuthRedirect>
  )
}
