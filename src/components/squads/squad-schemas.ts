import z from 'zod'

export const squadSchema = z.object({
  name: z
    .string({ required_error: 'What is the name of your squad?' })
    .min(3, 'You can do better!'),
})

export type SquadData = z.infer<typeof squadSchema>
