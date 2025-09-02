'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosResponse } from 'axios'
import { Plus } from 'lucide-react'
import { ComponentProps, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { Input } from '../form/input'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '../ui/dialog'
import { SquadData, squadSchema } from './squad-schemas'

interface CreateSquadDialogProps extends ComponentProps<typeof Dialog> {
  onSubmit: (data: SquadData) => Promise<AxiosResponse | undefined>
  defaultValues?: SquadData
}

export function CreateSquadDialog({
  children,
  onSubmit,
  defaultValues,
  ...props
}: CreateSquadDialogProps) {
  const [open, setOpen] = useState(false)
  const form = useForm<SquadData>({
    resolver: zodResolver(squadSchema),
    defaultValues,
  })

  async function handleSubmit(data: SquadData) {
    const response = await onSubmit(data)
    if (response?.status === 200 || response?.status === 201) {
      form.reset()
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen} {...props}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle>Create a squad</DialogTitle>
        <FormProvider {...form}>
          <form
            className="flex w-full flex-col gap-4"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <Input name="name" label="Squad name:" />

            <Button type="submit" disabled={form.formState.isSubmitting} loading={form.formState.isSubmitting}>
              <Plus />
              Create squad
            </Button>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  )
}
