'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Edit } from 'lucide-react'
import React, { ComponentProps, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { api } from '@/lib/api'
import { Input } from '../form/input'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '../ui/dialog'
import { SquadData, squadSchema } from './squad-schemas'
import { useSquads } from './use-squads'

interface EditSquadDialogProps extends ComponentProps<typeof Dialog> {
  squadId: string
  trigger?: React.ReactNode
}

export function EditSquadDialog({
  children,
  squadId,
  trigger,
  ...props
}: EditSquadDialogProps) {
  const [open, setOpen] = useState(false)
  const { squads, refetchSquads } = useSquads()

  // Encontrar a squad pelo ID
  const squad = squads?.find(s => s.id === squadId)

  const form = useForm<SquadData>({
    resolver: zodResolver(squadSchema),
    defaultValues: {
      name: squad?.name || '',
    },
  })

  // Atualizar valores do form quando a squad for carregada
  React.useEffect(() => {
    if (squad) {
      form.reset({
        name: squad.name,
      })
    }
  }, [squad, form])

  async function handleSubmit(data: SquadData) {
    try {
      const response = await api.put(`/squad/${squadId}`, data)
      if (response?.status === 200 || response?.status === 201) {
        toast.success('Squad updated successfully!')
        refetchSquads()
        form.reset()
        setOpen(false)
      }
      return response
    } catch (error) {
      console.error('Error updating squad:', error)
      toast.error('Error updating squad. Try again.')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen} {...props}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <Edit className="size-4" />
            Edit
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Edit Squad</DialogTitle>
        <FormProvider {...form}>
          <form
            className="flex w-full flex-col gap-4"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <Input name="name" label="Squad name:" />

            <Button 
              type="submit" 
              disabled={form.formState.isSubmitting} 
              loading={form.formState.isSubmitting}
            >
              <Edit />
              Update Squad
            </Button>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  )
}
