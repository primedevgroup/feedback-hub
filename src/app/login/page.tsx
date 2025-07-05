'use client'
import { FormProvider, useForm } from 'react-hook-form'
import { Input } from "@/components/form/input";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

export default function LoginPage() {
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

              <Button variant={'link'} type="submit" onClick={() => router.push('/forgot-password')} className="w-full cursor-pointer">
              Forgot password? Click here
            </Button>
              <Button type="submit" className="w-full cursor-pointer">
              Login
            </Button>
              <Button variant={'outline'} className="w-full cursor-pointer">
              Login with Google
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}
