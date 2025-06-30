import { DialogTitle } from '@radix-ui/react-dialog'
import { ComponentProps, ReactNode } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from './ui/dialog'

interface WriteFeedbackDialogProps extends ComponentProps<typeof Dialog> {
  children: ReactNode
}

export function WriteFeedbackDialog({
  children,
  ...props
}: WriteFeedbackDialogProps) {
  return (
    <Dialog {...props}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle>Write feedback</DialogTitle>
        <DialogDescription>
          The integrity of this feedback will be verified using AI, so as not to
          violate our code of ethics! Feedback is 100% anonymous
        </DialogDescription>

        <form className="flex w-full flex-col gap-4"></form>
      </DialogContent>
    </Dialog>
  )
}
