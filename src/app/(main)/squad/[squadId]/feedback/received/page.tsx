import { ListFeedbacks } from './list-feedbacks'

export default async function FeedbackReceivedPage() {
  return (
    <div className="flex w-full flex-col gap-6">
      <ListFeedbacks />
    </div>
  )
}
