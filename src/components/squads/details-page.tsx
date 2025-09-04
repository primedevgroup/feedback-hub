'use client'
import { DeleteSquad } from '@/components/squads/delete-squad'
import { EditSquadDialog } from '@/components/squads/edit-squad-dialog'
import { useSquads } from '@/components/squads/use-squads'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useMembers } from '@/hooks/use-members'
import {
  Calendar,
  Copy,
  Edit,
  Mail,
  Trash2,
  User,
  Users
} from 'lucide-react'
import { useParams } from 'next/navigation'
import { toast } from 'sonner'

export function SquadDetails() {
  const { squadId } = useParams<{ squadId: string }>()
  const { squads, isLoading } = useSquads()
  const { data: members, isLoading: isLoadingMembers } = useMembers({ squadId })

  const currentSquad = squads?.find(squad => squad.id === squadId)

  const handleInviteMember = async () => {
    try {
      // Construir o link de convite
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || window.location.origin
      const inviteLink = `${baseUrl}/invite-link?squadId=${squadId}`
      
      // Copiar para a área de transferência
      await navigator.clipboard.writeText(inviteLink)
      
      toast.success('Link de convite copiado para a área de transferência!')
    } catch (error) {
      console.error('Erro ao copiar link:', error)
      toast.error('Erro ao copiar link. Tente novamente.')
    }
  }

  // Tratamento de loading
  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading squad data...</p>
        </div>
      </div>
    )
  }

  // Tratamento de squad não encontrada
  if (!currentSquad) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="text-center">
          <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Squad not found</h2>
          <p className="text-muted-foreground">
            A squad with ID "{squadId}" was not found or you do not have access to it.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full w-full flex-col gap-6">
      {/* Squad Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <CardTitle className="text-2xl flex items-center gap-2">
                <Users className="h-6 w-6" />
                {currentSquad.name}
              </CardTitle>
              <CardDescription className="text-base">
                Squad created at {new Date(currentSquad.createdAt).toLocaleDateString('pt-BR')}
              </CardDescription>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Created at {new Date(currentSquad.createdAt).toLocaleDateString('pt-BR')}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {currentSquad.membersCount} members
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <EditSquadDialog squadId={squadId} trigger={<Button variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Edit Squad
              </Button>} />
              <Button variant="outline" onClick={handleInviteMember}>
                <Copy className="h-4 w-4 mr-2" />
                Copy Invite Link
              </Button>
              <DeleteSquad squadId={squadId} trigger={<Button variant="destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Squad
              </Button>} />
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Members of the Squad
          </CardTitle>
          <CardDescription>
            This squad has {currentSquad.membersCount} members
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoadingMembers ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto mb-2"></div>
                <p className="text-sm text-muted-foreground">Loading members...</p>
              </div>
            </div>
          ) : members && members.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary font-medium">
                      {member.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .toUpperCase()
                        .slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium truncate">{member.name}</p>
                      <Badge variant="secondary" className="text-xs">
                        Member
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Mail className="h-3 w-3" />
                      <span className="truncate">{member.email}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      <Calendar className="h-3 w-3" />
                      <span>Joined {new Date(member.createdAt).toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No members found</h3>
              <p className="text-muted-foreground mb-4">
                This squad doesn't have any members yet.
              </p>
              <Button onClick={handleInviteMember} variant="outline">
                <Copy className="h-4 w-4 mr-2" />
                Invite Members
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
