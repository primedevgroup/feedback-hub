import { ComponentProps } from 'react'
import { useFormContext } from 'react-hook-form'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  Select as SelectUI,
  SelectValue,
} from '../ui/select'

interface SelectProps extends ComponentProps<typeof SelectUI> {
  label?: string
  name: string
  placeholder?: string
  options: Array<{ value: string; label: string }>
}

export function Select({
  name,
  label,
  placeholder,
  options,
  ...props
}: SelectProps) {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <SelectUI
            onValueChange={field.onChange}
            defaultValue={field.value}
            {...props}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map(({ label, value }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectUI>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
