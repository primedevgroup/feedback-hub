import { zodResolver } from "@hookform/resolvers/zod"
import { Send } from "lucide-react"
import { FormProvider, useForm } from "react-hook-form"
import { Combobox } from "../form/combobox"
import { Input } from "../form/input"
import { Textarea } from "../form/textarea"
import { Button } from "../ui/button"
import { FeedbackData, feedbackSchema } from "./feedback-schemas"

interface FeedbackFormProps {
  onSubmit: (data: FeedbackData) => Promise<void>
  defaultValues?: FeedbackData
}

export function FeedbackForm({ onSubmit, defaultValues }: FeedbackFormProps) {
  const form = useForm<FeedbackData>({
    resolver: zodResolver(feedbackSchema),
    defaultValues,
  })

  return (
    <FormProvider {...form}>
      <form
        className="flex w-full flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
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
    </FormProvider>
  )
}