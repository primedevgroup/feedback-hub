'use client'

import { useMutation } from '@tanstack/react-query'
import { Trash2 } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { api } from '@/lib/api'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useSquads } from './use-squads'

interface DeleteSquadProps {
  squadId: string
  trigger?: React.ReactNode
}

export function DeleteSquad({ squadId, trigger }: DeleteSquadProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [squadName, setSquadName] = useState('')
  const { squads, refetchSquads } = useSquads()
  const router = useRouter()

  // Encontrar a squad pelo ID
  const squad = squads?.find(s => s.id === squadId)

  // Mutation para deletar a squad
  const deleteSquadMutation = useMutation({
    mutationFn: async () => {
      const response = await api.delete(`/squad/${squadId}/delete`)
      return response.data
    },
    onSuccess: () => {
      toast.success('Squad deleted successfully!')
      refetchSquads()
      setIsOpen(false)
      setSquadName('')
      router.push('/squads')
    },
    onError: (error) => {
      console.error('Error deleting squad:', error)
    },
  })

  const handleDelete = () => {
    if (squadName === squad?.name) {
      deleteSquadMutation.mutate()
    }
  }

  const isNameValid = squadName === squad?.name
  const isDisabled = !isNameValid || deleteSquadMutation.isPending

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="destructive" size="sm">
            <Trash2 className="size-4" />
            Delete
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-destructive">
            Delete Squad
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the
            squad <strong>"{squad?.name}"</strong> and all associated data.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="squad-name" className="text-sm font-medium">
              To confirm, type the name of the squad:
            </label>
            <Input
              id="squad-name"
              placeholder={squad?.name}
              value={squadName}
              onChange={(e) => setSquadName(e.target.value)}
              className={!isNameValid && squadName ? 'border-destructive' : ''}
            />
            {!isNameValid && squadName && (
              <p className="text-sm text-destructive">
                The name entered does not match the name of the squad.
              </p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              setIsOpen(false)
              setSquadName('')
            }}
            disabled={deleteSquadMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDisabled}
            loading={deleteSquadMutation.isPending}
          >
            {deleteSquadMutation.isPending ? 'Deleting...' : 'Delete Squad'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
