'use client'

import { ListSentFeedbacks } from './list-sent-feedbacks'

export default function FeedbackSendedPage() {
  return (
    <div className="flex w-full flex-col gap-6">
      <ListSentFeedbacks />
    </div>
  )
}
