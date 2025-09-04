import { useParams } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'
import { Send } from 'lucide-react'
import { FormProvider, useForm } from 'react-hook-form'

import { Combobox } from '../form/combobox'
import { Input } from '../form/input'
import { Textarea } from '../form/textarea'
import { Button } from '../ui/button'
import { FeedbackData, feedbackSchema } from './feedback-schemas'

import { useMembers } from '@/hooks/use-members'

interface FeedbackFormProps {
  onSubmit: (data: FeedbackData) => Promise<void>
  defaultValues?: FeedbackData
  onSuccess?: () => void
}

export function FeedbackForm({
  onSubmit,
  defaultValues,
  onSuccess,
}: FeedbackFormProps) {
  const params = useParams()
  const squadId = params?.squadId as string
  const { data: members, isLoading } = useMembers({ squadId })

  const form = useForm<FeedbackData>({
    resolver: zodResolver(feedbackSchema),
    defaultValues,
  })

  const memberOptions =
    members?.map(member => ({
      label: member.name || member.email,
      value: member.id,
    })) || []

  async function handleSubmit(data: FeedbackData) {
    await onSubmit(data)
    form.reset()
    onSuccess?.()
  }

  return (
    <FormProvider {...form}>
      <form
        className="flex w-full flex-col gap-4"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <Input name="title" label="Title:" />

        <Combobox
          label="Member:"
          name="collaborator"
          options={memberOptions}
          placeholder="Select a collaborator"
          disabled={isLoading}
        />

        <Textarea label="Feedback:" name="feedback" />

        <Button>
          <Send />
          Send feedback
        </Button>
      </form>
    </FormProvider>
  )
}
