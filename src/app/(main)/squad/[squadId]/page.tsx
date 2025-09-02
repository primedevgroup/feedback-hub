import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  Calendar,
  Crown,
  Edit,
  Mail,
  Shield,
  Trash2,
  UserPlus,
  Users
} from 'lucide-react'

interface SquadDetailsPageProps {
  params: {
    squadId: string
  }
}

// Mock data - substitua por dados reais da API
const squadData = {
  id: '1',
  name: 'Development Team PrimeDev',
  description: 'Equipe responsável pelo desenvolvimento das principais funcionalidades do produto',
  createdAt: '2024-01-15',
  totalMembers: 8,
  members: [
    {
      id: '1',
      name: 'João Silva',
      email: 'joao.silva@company.com',
      role: 'Tech Lead',
      avatar: '/avatars/joao.jpg',
      joinedAt: '2024-01-15',
      isAdmin: true,
      isOwner: true
    },
    {
      id: '2',
      name: 'Maria Santos',
      email: 'maria.santos@company.com',
      role: 'Senior Developer',
      avatar: '/avatars/maria.jpg',
      joinedAt: '2024-01-20',
      isAdmin: true,
      isOwner: false
    },
    {
      id: '3',
      name: 'Pedro Costa',
      email: 'pedro.costa@company.com',
      role: 'Frontend Developer',
      avatar: '/avatars/pedro.jpg',
      joinedAt: '2024-02-01',
      isAdmin: false,
      isOwner: false
    },
    {
      id: '4',
      name: 'Ana Oliveira',
      email: 'ana.oliveira@company.com',
      role: 'Backend Developer',
      avatar: '/avatars/ana.jpg',
      joinedAt: '2024-02-05',
      isAdmin: false,
      isOwner: false
    },
    {
      id: '5',
      name: 'Carlos Lima',
      email: 'carlos.lima@company.com',
      role: 'DevOps Engineer',
      avatar: '/avatars/carlos.jpg',
      joinedAt: '2024-02-10',
      isAdmin: false,
      isOwner: false
    },
    {
      id: '6',
      name: 'Lucia Ferreira',
      email: 'lucia.ferreira@company.com',
      role: 'QA Engineer',
      avatar: '/avatars/lucia.jpg',
      joinedAt: '2024-02-15',
      isAdmin: false,
      isOwner: false
    },
    {
      id: '7',
      name: 'Rafael Souza',
      email: 'rafael.souza@company.com',
      role: 'Junior Developer',
      avatar: '/avatars/rafael.jpg',
      joinedAt: '2024-03-01',
      isAdmin: false,
      isOwner: false
    },
    {
      id: '8',
      name: 'Fernanda Alves',
      email: 'fernanda.alves@company.com',
      role: 'UI/UX Designer',
      avatar: '/avatars/fernanda.jpg',
      joinedAt: '2024-03-05',
      isAdmin: false,
      isOwner: false
    }
  ]
}

export default function SquadDetailsPage({ params }: SquadDetailsPageProps) {
  const { squadId } = params

  const handleInviteMember = () => {
    // Implementar lógica de convite
    console.log('Convidar membro para squad:', squadId)
  }

  const handleEditSquad = () => {
    // Implementar lógica de edição
    console.log('Editar squad:', squadId)
  }

  const handleDeleteSquad = () => {
    // Implementar lógica de exclusão
    console.log('Excluir squad:', squadId)
  }

  const handleRemoveMember = (memberId: string) => {
    // Implementar lógica de remoção de membro
    console.log('Remover membro:', memberId, 'da squad:', squadId)
  }

  const handlePromoteToAdmin = (memberId: string) => {
    // Implementar lógica de promoção
    console.log('Promover membro:', memberId, 'a admin da squad:', squadId)
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
                {squadData.name}
              </CardTitle>
              <CardDescription className="text-base">
                {squadData.description}
              </CardDescription>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Criado em {new Date(squadData.createdAt).toLocaleDateString('pt-BR')}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {squadData.totalMembers} membros
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleEditSquad}>
                <Edit className="h-4 w-4 mr-2" />
                Editar Squad
              </Button>
              <Button variant="outline" onClick={handleInviteMember}>
                <UserPlus className="h-4 w-4 mr-2" />
                Convidar Membro
              </Button>
              <Button variant="destructive" onClick={handleDeleteSquad}>
                <Trash2 className="h-4 w-4 mr-2" />
                Excluir Squad
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Squad Members */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Membros da Squad
          </CardTitle>
          <CardDescription>
            Gerencie os membros da sua squad
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {squadData.members.map((member, index) => (
              <div key={member.id}>
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{member.name}</h4>
                        {member.isOwner && (
                          <Badge variant="default" className="bg-yellow-500">
                            <Crown className="h-3 w-3 mr-1" />
                            Owner
                          </Badge>
                        )}
                        {member.isAdmin && !member.isOwner && (
                          <Badge variant="secondary">
                            <Shield className="h-3 w-3 mr-1" />
                            Admin
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {member.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Entrou em {new Date(member.joinedAt).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                      <Badge variant="outline">{member.role}</Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {!member.isOwner && (
                      <>
                        {!member.isAdmin && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handlePromoteToAdmin(member.id)}
                          >
                            <Shield className="h-4 w-4 mr-1" />
                            Promover a Admin
                          </Button>
                        )}
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleRemoveMember(member.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remover
                        </Button>
                      </>
                    )}
                  </div>
                </div>
                {index < squadData.members.length - 1 && (
                  <Separator className="my-2" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
