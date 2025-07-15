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
  pages: Array<PageData>
}

export function AppSidebar({ pages, ...props }: AppSidebarProps) {
  const pathname = usePathname()

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <h1 className="font-bold">Feedback Hub</h1>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="mt-8">
        <SidebarMenu>
          {pages.map(({ title, url, icon }) => {
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
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
