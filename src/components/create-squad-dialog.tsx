'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import { ComponentProps } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'sonner'

import { Input } from './form/input'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './ui/dialog'
import { Form } from './ui/form'

const squadSchema = z.object({
  name: z
    .string({ required_error: 'What is the name of your squad?' })
    .min(3, 'You can do better!'),
})

type SquadData = z.infer<typeof squadSchema>

export function CreateSquadDialog({
  children,
  ...props
}: ComponentProps<typeof Dialog>) {
  const form = useForm<SquadData>({
    resolver: zodResolver(squadSchema),
  })

  async function createSquad(data: SquadData) {
    try {
      toast.success('Squad criado com sucesso!')
    } catch (error) {
      toast.error('Erro ao criar squad. Tente novamente.')
    }
  }

  return (
    <Dialog {...props}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle>Create a squad</DialogTitle>
        <Form {...form}>
          <form
            className="flex w-full flex-col gap-4"
            onSubmit={form.handleSubmit(createSquad)}
          >
            <Input name="name" label="Squad name:" />

            <Button>
              <Plus />
              Create squad
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
