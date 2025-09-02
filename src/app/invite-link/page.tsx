'use client'
import { Input } from "@/components/form/input";
import { GoogleLoginButton } from "@/components/google-login-button";
import { InviteAuthRedirect } from '@/components/invite-auth-redirect';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/auth-context';
import { api } from '@/lib/api';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function InviteLinkPage() {
  const form = useForm()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { isAuthenticated, login } = useAuth()
  const squadId = searchParams.get('squadId')
  const hasJoinedSquad = useRef(false)

  const joinSquad = async (squadId: string) => {
    if (hasJoinedSquad.current) {
      return
    }
    
    hasJoinedSquad.current = true
    
    try {
      const response = await api.post(`/squad/${squadId}/join`)
      toast.success('You have been successfully added to the squad!')
      router.push(`/squad/${squadId}/dashboard`)
      return response.data
    } catch (error: any) {
      console.error('Error joining squad:', error)
      

      hasJoinedSquad.current = false
      
      if (error.response?.status === 404) {
        toast.error('Squad not found')
      } else if (error.response?.status === 400) {

        toast.success('You are already a member of this squad!')
        router.push(`/squad/${squadId}/dashboard`)
      } else {
        toast.error('Error joining squad. Please try again')
      }
    }
  }


  const handleLoginSuccess = () => {
    if (squadId) {
      joinSquad(squadId)
    } else {
      router.push('/squads')
    }
  }


  useEffect(() => {
    if (isAuthenticated && squadId && !hasJoinedSquad.current) {
      joinSquad(squadId)
    }
  }, [isAuthenticated, squadId])

  async function onSubmit(data: any) {
    const loadingToast = toast.loading('Logging in...')
    
    try {
      const response = await api.post('/auth/signin', data)
      const { access_token, user } = response.data


      login(access_token, user)

      toast.dismiss(loadingToast)
      toast.success('Login successful!')


      handleLoginSuccess()
    } catch (error: any) {
      console.error('Error logging in:', error)
      
      toast.dismiss(loadingToast)
      
      if (error.response?.status === 401) {
        toast.error('Incorrect email or password')
      } else if (error.response?.status === 400) {
        toast.error('Invalid data. Please check the information provided')
      } else {
        toast.error('Error logging in. Please try again')
      }
    }
  }


  

  return (
    <InviteAuthRedirect squadId={squadId}>
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex items-start gap-8">
          <div className='flex flex-col gap-4 text-left max-w-xl'>
            <h1 className='text-4xl font-extrabold'>
              {squadId ? 'You have been invited to a squad!' : 'Welcome to Feedback Hub!'}
            </h1>
            <p className='text-2xl'>
              {squadId 
                ? 'Login to accept the invitation and start exchanging feedback with your team 100% anonymously!'
                : 'In Feedback Hub you can exchange feedback with your team 100% anonymously, without fear of being fired the next day!'
              }
            </p>
          </div>

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
                  {squadId ? 'Accept Invitation' : 'Login'}
                </Button>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-px bg-border"></div>
                  <span className="text-sm text-muted-foreground">ou</span>
                  <div className="flex-1 h-px bg-border"></div>
                </div>
                <GoogleLoginButton 
                  className="w-full flex justify-center" 
                  onSuccess={handleLoginSuccess}
                />
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </InviteAuthRedirect>
  )
}
