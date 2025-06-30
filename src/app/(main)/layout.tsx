import { Separator } from '@radix-ui/react-separator'
import {
  ArrowDown,
  ArrowUp,
  ChartArea,
  EyeOff,
  NotebookPen,
  Users,
} from 'lucide-react'
import { ReactNode } from 'react'

import { AppSidebar } from '@/components/app-sidebar'
import { HeaderTitle } from '@/components/header-title'
import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { WriteFeedbackDialog } from '@/components/write-feedback-dialog'

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  pages: [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: <ChartArea />,
    },
    {
      title: 'Feedback received',
      url: '/feedback/received',
      icon: <ArrowDown />,
    },
    { title: 'Feedback sended', url: '/feedback/sended', icon: <ArrowUp /> },
    { title: 'My squads', url: '/squads', icon: <Users /> },
  ],
}

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar data={data} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <HeaderTitle data={data.pages} />
          </div>

          <div className="flex gap-2 px-4">
            <ModeToggle />
            <Button variant="ghost">
              <EyeOff />
            </Button>

            <WriteFeedbackDialog>
              <Button>
                <NotebookPen />
                Write feedback
              </Button>
            </WriteFeedbackDialog>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
