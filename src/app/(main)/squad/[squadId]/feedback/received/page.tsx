import { ListFeedbacks } from './list-feedbacks'

interface FeedbackReceivedPageProps {
  params: {
    squadId: string
  }
}

export default function FeedbackReceivedPage({ params }: FeedbackReceivedPageProps) {
  const { squadId } = params
  return (
    <div className="flex w-full flex-col gap-6">
      <ListFeedbacks />
    </div>
  )
}
