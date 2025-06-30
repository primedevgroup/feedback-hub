'use client'
import { DialogTitle } from '@radix-ui/react-dialog'
import { Send } from 'lucide-react'
import { ComponentProps, ReactNode } from 'react'
import { useForm } from 'react-hook-form'

import { Combobox } from './form/combobox'
import { Input } from './form/input'
import { Textarea } from './form/textarea'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from './ui/dialog'
import { Form } from './ui/form'

interface WriteFeedbackDialogProps extends ComponentProps<typeof Dialog> {
  children: ReactNode
}

export function WriteFeedbackDialog({
  children,
  ...props
}: WriteFeedbackDialogProps) {
  const form = useForm()
  return (
    <Dialog {...props}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle>Write feedback</DialogTitle>
        <DialogDescription>
          The integrity of this feedback will be verified using AI, so as not to
          violate our code of ethics! Feedback is 100% anonymous
        </DialogDescription>

        <Form {...form}>
          <form className="flex w-full flex-col gap-4">
            <Input name="title" label="Title:" />

            <Combobox
              label="Collaborator:"
              name="collaborator"
              options={[{ label: 'test', value: 'oi' }]}
              placeholder="Select a collaborator"
            />

            <Textarea label="Feedback:" name="feedback" />

            <Button>
              <Send />
              Send feedback
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
