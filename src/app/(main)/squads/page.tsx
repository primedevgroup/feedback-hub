'use client'

import { ArrowRight, Plus, User, Users } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { CreateSquadDialog } from '@/components/squads/create-squad-dialog'
import { SquadData } from '@/components/squads/squad-schemas'
import { useSquads } from '@/components/squads/use-squads'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { api } from '@/lib/api'

export default function SquadsPage() {
  const router = useRouter()
  const { squads, isLoading, refetchSquads } = useSquads()

  async function createSquad(data: SquadData) {
    try {
      const response = await api.post('/squad', data)
      toast.success('Squad created successfully!')
      refetchSquads()
      return response
    } catch (error) {
      toast.error('Error creating squad. Try again.')
    }
  }

  const handleSquadClick = (squadId: string) => {
    router.push(`/squad/${squadId}/dashboard`)
  }

  const getRoleBadgeVariant = (role: string, isOwner: boolean) => {
    if (isOwner) return 'default'
    if (role === 'Admin') return 'secondary'
    return 'outline'
  }

  const getRoleLabel = (role: string, isOwner: boolean) => {
    if (isOwner) return 'Owner'
    return role
  }

  if (isLoading) {
    return (
      <div className="flex w-full flex-col gap-6">
        {[1, 2, 3].map(i => (
          <Skeleton className="h-20 w-full" />
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">My Squads</h1>
          <p className="text-muted-foreground mt-2">
            Manage your squads and access the feedback of each team
          </p>
        </div>
      
      {/* Squads Grid */}
      <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(380px,1fr))] items-stretch gap-6">
        {squads?.map((squad) => (
          <Card 
            key={squad.id} 
            className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02] group"
            onClick={() => handleSquadClick(squad.id)}
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="text-lg font-semibold">
                      {squad.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {squad.name}
                    </CardTitle>
                    {/* <Badge 
                      variant={getRoleBadgeVariant(squad.role, squad.isOwner)}
                      className="text-xs"
                    >
                      {getRoleLabel(squad.role, squad.isOwner)}
                    </Badge> */}
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <User className="h-3 w-3" />
                  <span>Created at: {new Date(squad.createdAt).toLocaleDateString('pt-BR')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {squad.membersCount} members
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Create New Squad Card */}
        <CreateSquadDialog onSubmit={createSquad}>
          <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02] group border-dashed border-2">
            <CardContent className="flex flex-col items-center justify-center h-full min-h-[280px] p-6">
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="p-4 rounded-full bg-muted group-hover:bg-primary/10 transition-colors">
                  <Plus className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                    Create New Squad
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-[200px]">
                    Create a new squad to organize your team and manage feedbacks
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </CreateSquadDialog>
      </div>

      {/* Empty State (caso não tenha squads) */}
      {squads?.length === 0 && (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <Users className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">No squad found</h3>
          <p className="text-muted-foreground mb-6 max-w-md">
            You are not part of any squad. Create a new squad or wait for an invitation.
          </p>
          <CreateSquadDialog onSubmit={createSquad}>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create First Squad
            </Button>
          </CreateSquadDialog>
        </div>
      )}
      </div>
    </div>
  )
}
