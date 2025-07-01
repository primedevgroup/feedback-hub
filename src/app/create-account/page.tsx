'use client'
import { Input } from "@/components/form/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { FormProvider, useForm } from "react-hook-form"

export default function CreateAccountPage() {
  const form = useForm()
  const router = useRouter()

  function onSubmit(data: any) {
    console.log('Form Data:', data)
  }

  return (
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
              name="confirm-password" 
              label="Confirm password" 
              placeholder="Enter your password" 
              type="password"
            /> 
            <Button type="submit" className="w-full cursor-pointer">
              Create account
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}
