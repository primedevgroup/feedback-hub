'use client'
import { useParams } from 'next/navigation'

import { ComponentProps, ReactNode, useState } from 'react'
import { toast } from 'sonner'

import { FeedbackForm } from './feedback/feedback-form'
import { FeedbackData } from './feedback/feedback-schemas'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'

import { useFeedbackListInvalidator } from '@/hooks/use-feedbacks'
import { api } from '@/lib/api'

interface WriteFeedbackDialogProps extends ComponentProps<typeof Dialog> {
  children: ReactNode
}

export function WriteFeedbackDialog({
  children,
  ...props
}: WriteFeedbackDialogProps) {
  const [open, setOpen] = useState(false)
  const params = useParams()
  const squadId = params?.squadId as string
  const invalidateFeedbackLists = useFeedbackListInvalidator()

  async function createFeedback(data: FeedbackData) {
    try {
      const response = await api.post('/feedback', {
        title: data.title,
        content: data.feedback,
        targetId: data.collaborator,
        squadId: squadId,
      })

      console.log(response)

      await invalidateFeedbackLists()

      toast.success('Feedback enviado com sucesso!')
      setOpen(false)
    } catch (error) {
      toast.error('Erro ao enviar feedback. Tente novamente.')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen} {...props}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle>Write feedback</DialogTitle>
        <DialogDescription>
          The integrity of this feedback will be verified using AI, so as not to
          violate our code of ethics! Feedback is 100% anonymous
        </DialogDescription>

        <FeedbackForm
          onSubmit={createFeedback}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  )
}
