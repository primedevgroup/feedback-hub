'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import {
  Bell,
  Eye,
  Save,
  Settings,
  Shield,
  Trash2
} from 'lucide-react'

interface SquadSettingsPageProps {
  params: {
    squadId: string
  }
}

export default function SquadSettingsPage({ params }: SquadSettingsPageProps) {
  const { squadId } = params

  const handleSaveSettings = () => {
    // Implementar lógica de salvamento
    console.log('Salvar configurações da squad:', squadId)
  }

  const handleDeleteSquad = () => {
    // Implementar lógica de exclusão
    console.log('Excluir squad:', squadId)
  }

  return (
    <div className="flex h-full w-full flex-col gap-6">
      {/* Squad Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Informações da Squad
          </CardTitle>
          <CardDescription>
            Configure as informações básicas da sua squad
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="squad-name">Nome da Squad</Label>
            <Input 
              id="squad-name" 
              placeholder="Development Team PrimeDev"
              defaultValue="Development Team PrimeDev"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="squad-description">Descrição</Label>
            <Textarea 
              id="squad-description" 
              placeholder="Descreva o propósito e responsabilidades da squad"
              defaultValue="Equipe responsável pelo desenvolvimento das principais funcionalidades do produto"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Configurações de Privacidade
          </CardTitle>
          <CardDescription>
            Controle quem pode ver e acessar sua squad
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Squad Pública</Label>
              <p className="text-sm text-muted-foreground">
                Permitir que outros usuários vejam e solicitem entrada na squad
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Feedback Anônimo</Label>
              <p className="text-sm text-muted-foreground">
                Permitir que membros enviem feedback anônimo
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Auto-aprovação de Membros</Label>
              <p className="text-sm text-muted-foreground">
                Aprovar automaticamente novos membros que solicitam entrada
              </p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Configurações de Notificação
          </CardTitle>
          <CardDescription>
            Configure como você quer ser notificado sobre atividades da squad
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Novos Feedbacks</Label>
              <p className="text-sm text-muted-foreground">
                Receber notificação quando receber um novo feedback
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Novos Membros</Label>
              <p className="text-sm text-muted-foreground">
                Receber notificação quando um novo membro entrar na squad
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Lembretes de Feedback</Label>
              <p className="text-sm text-muted-foreground">
                Receber lembretes semanais para enviar feedback
              </p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Permissions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Permissões
          </CardTitle>
          <CardDescription>
            Configure as permissões dos membros da squad
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Membros podem convidar outros</Label>
              <p className="text-sm text-muted-foreground">
                Permitir que membros comuns convidem novos membros
              </p>
            </div>
            <Switch />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Membros podem ver estatísticas</Label>
              <p className="text-sm text-muted-foreground">
                Permitir que membros vejam estatísticas da squad
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Membros podem editar squad</Label>
              <p className="text-sm text-muted-foreground">
                Permitir que membros editem informações da squad
              </p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <Trash2 className="h-5 w-5" />
            Zona de Perigo
          </CardTitle>
          <CardDescription>
            Ações irreversíveis que afetam permanentemente a squad
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border border-destructive rounded-lg">
              <h4 className="font-medium text-destructive mb-2">Excluir Squad</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Esta ação é irreversível. Todos os dados da squad, incluindo feedbacks e membros, serão permanentemente removidos.
              </p>
              <Button variant="destructive" onClick={handleDeleteSquad}>
                <Trash2 className="h-4 w-4 mr-2" />
                Excluir Squad
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSaveSettings} className="min-w-[120px]">
          <Save className="h-4 w-4 mr-2" />
          Salvar Alterações
        </Button>
      </div>
    </div>
  )
}
