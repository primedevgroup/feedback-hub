import { ComponentProps } from 'react'
import { useFormContext } from 'react-hook-form'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Textarea as TextareaUI } from '../ui/textarea'

interface TextareaProps extends ComponentProps<typeof TextareaUI> {
  label?: string
  name: string
}

export function Textarea({ name, label, ...props }: TextareaProps) {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <TextareaUI {...props} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
