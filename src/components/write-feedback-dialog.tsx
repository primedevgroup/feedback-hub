'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogTitle } from '@radix-ui/react-dialog'
import { Send } from 'lucide-react'
import { ComponentProps, ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

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

const feedbackSchema = z.object({
  title: z
    .string({ required_error: 'Write a title' })
    .min(2, 'You can do better!'),
  collaborator: z.string({ required_error: "Don't forget about me!" }),
  feedback: z
    .string({ required_error: 'Write a feedback' })
    .min(2, 'You can do better!'),
})

type FeedbackData = z.infer<typeof feedbackSchema>

interface WriteFeedbackDialogProps extends ComponentProps<typeof Dialog> {
  children: ReactNode
}

export function WriteFeedbackDialog({
  children,
  ...props
}: WriteFeedbackDialogProps) {
  const form = useForm<FeedbackData>({
    resolver: zodResolver(feedbackSchema),
  })

  async function createFeedback(data: FeedbackData) {
    console.log(data)
  }

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
          <form
            className="flex w-full flex-col gap-4"
            onSubmit={form.handleSubmit(createFeedback)}
          >
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
