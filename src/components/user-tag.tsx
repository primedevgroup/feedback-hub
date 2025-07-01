import { User } from 'lucide-react'
import { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

export function UserTag({
  children,
  className,
  ...props
}: ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'bg-primary-foreground/50 border-primary-foreground flex items-center gap-2 rounded-sm border px-2 py-0.5 text-sm',
        className,
      )}
      {...props}
    >
      {children}
      <User className="w-3.5" />
    </div>
  )
}
