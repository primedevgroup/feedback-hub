'use client'

import { Input } from "@/components/form/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { FormProvider, useForm } from "react-hook-form"
import { useState } from "react"

export default function ForgotPasswordPage() {
  const emailForm = useForm()
  const codeForm = useForm()
  const passwordForm = useForm()

  const [emailSent, setEmailSent] = useState(false)
  const [codeSent, setCodeSent] = useState(false)
  const [email, setEmail] = useState('')

  const router = useRouter()

  function handleSendEmail(data: any) {
    console.log('Email enviado:', data)

    if (data.email) {
      setEmail(data.email)
      setEmailSent(true)
    }
  }

  function handleResendCode() {
    if (email) {
      console.log('Reenviando email para:', email)
    }
  }

  function handleVerifyCode(data: any) {
    console.log('Código digitado:', data)

    if (data.code) {
      setCodeSent(true)
    }
  }

  function handleResetPassword(data: any) {
    console.log('Nova senha:', data)

    if (data['new-password'] && data['confirm-new-password']) {
      console.log('Senha redefinida com sucesso!')
      router.push('/login')
    }
  }

  return (
    <div className="flex justify-center gap-8 flex-col items-center min-h-screen">
      <h1 className="text-4xl font-extrabold">Feedback Hub</h1>
      <div className="w-[448px] flex flex-col gap-4 p-6 rounded-lg shadow-lg bg-gradient-to-br from-[#18181B] to-[#18181B00] border border-gray-700">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold">Forgot your password</h3>
          <Button className="cursor-pointer" variant={'ghost'} onClick={() => router.push('/login')}>Login</Button>
        </div>

        {!emailSent && (
          <FormProvider {...emailForm}>
            <form onSubmit={emailForm.handleSubmit(handleSendEmail)} className="flex flex-col gap-4">
              <Input 
                name="email" 
                label="Email" 
                placeholder="Enter your email" 
                type="email"
              />
              <Button type="submit" className="w-full cursor-pointer">
                Send email
              </Button>
            </form>
          </FormProvider>
        )}

        {emailSent && !codeSent && (
          <FormProvider {...codeForm}>
            <form onSubmit={codeForm.handleSubmit(handleVerifyCode)} className="flex flex-col gap-4">
              <Input 
                name="code" 
                label="Code" 
                placeholder="Enter the code" 
                type="number"
              />
              <Button 
                type="button" 
                variant={'link'} 
                className="w-full justify-start cursor-pointer"
                onClick={handleResendCode}
              >
                Resend code
              </Button>
              <Button type="submit" className="w-full cursor-pointer">
                Verify
              </Button>
            </form>
          </FormProvider>
        )}

        {codeSent && (
          <FormProvider {...passwordForm}>
            <form onSubmit={passwordForm.handleSubmit(handleResetPassword)} className="flex flex-col gap-4">
              <Input 
                name="new-password" 
                label="Password" 
                placeholder="Enter the password" 
                type="password"
              />
              <Input 
                name="confirm-new-password" 
                label="Confirm password" 
                placeholder="Enter the password" 
                type="password"
              />
              <Button type="submit" className="w-full cursor-pointer">
                Change password
              </Button>
            </form>
          </FormProvider>
        )}
      </div>
    </div>
  )
}
