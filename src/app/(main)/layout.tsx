import { ProtectedRoute } from '@/components/protected-route'
import { ReactNode } from 'react'

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        {children}
      </div>
    </ProtectedRoute>
  )
}
