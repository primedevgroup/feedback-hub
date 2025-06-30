'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import * as React from 'react'

import { PageData } from '@/@types/defaults'
import { NavUser } from '@/components/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  data: {
    user: {
      name: string
      email: string
      avatar: string
    }
    pages: Array<PageData>
  }
}

export function AppSidebar({ data, ...props }: AppSidebarProps) {
  const pathname = usePathname()
  console.log(pathname)

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <h1 className="font-bold">Feedback Hub</h1>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="mt-8">
        <SidebarMenu>
          {data.pages.map(({ title, url, icon }) => {
            return (
              <SidebarMenuItem key={url}>
                <SidebarMenuButton isActive={pathname === url} asChild>
                  <Link href={url}>
                    {icon}
                    {title}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
