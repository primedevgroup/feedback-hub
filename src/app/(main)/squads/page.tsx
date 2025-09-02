import { Plus } from 'lucide-react'
import { toast } from 'sonner'

import { CreateSquadDialog } from '@/components/squads/create-squad-dialog'
import { SquadData } from '@/components/squads/squad-schemas'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UserTag } from '@/components/user-tag'

export default function SquadPage() {
  async function createSquad(data: SquadData) {
    try {
      // Aqui você pode implementar a lógica para criar o squad
      // Por exemplo, chamar uma API
      toast.success('Squad criado com sucesso!')
    } catch (error) {
      toast.error('Erro ao criar squad. Tente novamente.')
    }
  }
  return (
    <div className="flex h-full w-full flex-col">
      <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(360px,1fr))] items-stretch gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Development Team PrimeDev</CardTitle>
          </CardHeader>
          <CardContent>
            <UserTag className="w-min">6</UserTag>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Development Team PrimeDev</CardTitle>
          </CardHeader>
          <CardContent>
            <UserTag className="w-min">6</UserTag>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Development Team PrimeDev</CardTitle>
          </CardHeader>
          <CardContent>
            <UserTag className="w-min">6</UserTag>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Development Team PrimeDev</CardTitle>
          </CardHeader>
          <CardContent>
            <UserTag className="w-min">6</UserTag>
          </CardContent>
        </Card>

        <CreateSquadDialog onSubmit={createSquad}>
          <Button
            variant="outline"
            className="h-full min-h-[126px] rounded-2xl"
          >
            <Plus />
          </Button>
        </CreateSquadDialog>
      </div>
    </div>
  )
}
