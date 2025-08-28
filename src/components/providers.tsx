'use client'

import { GoogleOAuthProvider } from '@react-oauth/google'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ReactNode } from 'react'

import { ThemeProvider } from './theme-provider'
import { Toaster } from './ui/sonner'

import { AuthProvider } from '@/contexts/auth-context'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      retry: 1,
    },
  },
})

// Verificar se a variável de ambiente está configurada
const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {googleClientId ? (
        <GoogleOAuthProvider clientId={googleClientId}>
          <AuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <ReactQueryDevtools initialIsOpen={false} />
              <Toaster />
            </ThemeProvider>
          </AuthProvider>
        </GoogleOAuthProvider>
      ) : (
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      )}
    </QueryClientProvider>
  )
}
