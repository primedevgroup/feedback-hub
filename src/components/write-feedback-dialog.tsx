'use client'
import { useParams } from 'next/navigation'
import { ComponentProps, ReactNode } from 'react'
import { toast } from 'sonner'

import { api } from '@/lib/api'
import { FeedbackForm } from './feedback/feedback-form'
import { FeedbackData } from './feedback/feedback-schemas'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'

interface WriteFeedbackDialogProps extends ComponentProps<typeof Dialog> {
children: ReactNode
}

export function WriteFeedbackDialog({
  children,
  ...props
}: WriteFeedbackDialogProps) {
  const params = useParams()
  const squadId = params?.squadId as string

  async function createFeedback(data: FeedbackData) {
    try {
      const response = await api.post('/feedback', {
        title: data.title,
        content: data.feedback,
        targetId: data.collaborator,
        squadId: squadId
      })

      console.log(response);
      
      toast.success('Feedback enviado com sucesso!')
    } catch (error) {
      toast.error('Erro ao enviar feedback. Tente novamente.')
    }
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

        <FeedbackForm onSubmit={createFeedback} />
      </DialogContent>
    </Dialog>
  )
}
