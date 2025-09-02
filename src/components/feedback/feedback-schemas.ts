import z from 'zod'

export const feedbackSchema = z.object({
  title: z
    .string({ required_error: 'Write a title' })
    .min(2, 'You can do better!'),
  collaborator: z.string({ required_error: "Don't forget about me!" }),
  feedback: z
    .string({ required_error: 'Write a feedback' })
    .trim()
    .min(2, 'You can do better!'),
})

export type FeedbackData = z.infer<typeof feedbackSchema>
