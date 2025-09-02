'use client'

import { ListSentFeedbacks } from './list-sent-feedbacks'

interface FeedbackSendedPageProps {
  params: {
    squadId: string
  }
}

export default function FeedbackSendedPage({ params }: FeedbackSendedPageProps) {
  const { squadId } = params
  return (
    <div className="flex w-full flex-col gap-6">
      <ListSentFeedbacks />
    </div>
  )
}
