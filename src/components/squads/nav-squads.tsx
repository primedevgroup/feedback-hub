"use client"

import { useAuth } from "@/contexts/auth-context"
import {
  ChevronsUpDown,
  LogOut,
  Plus,
  UserCircle,
  Users
} from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { toast } from "sonner"

import {
  Avatar,
  AvatarFallback
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { api } from "@/lib/api"
import { Button } from "../ui/button"
import { Skeleton } from "../ui/skeleton"
import { CreateSquadDialog } from "./create-squad-dialog"
import { SquadData } from "./squad-schemas"
import { useSquads } from "./use-squads"

export function NavSquads() {
  const { isMobile } = useSidebar()
  const { squads, isLoading, refetchSquads } = useSquads()
  const router = useRouter()
  const params = useParams()
  const { logout } = useAuth()

  const squadId = params.squadId
  
  const selectedSquad = squads?.find(squad => squad.id === squadId)

  async function createSquad(data: SquadData) {
    try {
      const response = await api.post('/squad', data)
      toast.success('Squad created successfully!')
      refetchSquads()
      return response
    } catch (error) {
      console.error(error)
      toast.error('Error creating squad. Try again.')
    }
  }

  function handleLogout() {
    logout()
    router.push('/login')
    toast.success('Logout successful!')
  }

  if (isLoading) {
    return <Skeleton className="h-10 w-full rounded-lg" />
  }

  if (!squads || squads.length === 0) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
        <CreateSquadDialog onSubmit={createSquad}>
          <Button variant="outline" className="w-full">
            <Plus />
            Create Squad
          </Button>
        </CreateSquadDialog>
        </SidebarMenuItem>
      </SidebarMenu>
    )
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarFallback className="rounded-lg">
                  {selectedSquad ? selectedSquad.name.substring(0, 2).toUpperCase() : 'SQ'}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {selectedSquad ? selectedSquad.name : 'Select Squad'}
                </span>
                <span className="truncate text-xs">
                  {selectedSquad ? `${selectedSquad.membersCount} members` : 'No squad selected'}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuGroup>
              {squads.map(squad => (
                <DropdownMenuItem 
                  key={squad.id}
                  onClick={() => router.push(`/squad/${squad.id}/dashboard`)}
                >
                  <Users />
                  {squad.name}
                </DropdownMenuItem>
              ))}
              <CreateSquadDialog onSubmit={createSquad}>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <Plus />
                  Create New Squad
                </DropdownMenuItem>
              </CreateSquadDialog>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <UserCircle />
                My Account
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut />
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
